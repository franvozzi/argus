# System Design de Argus 
Este documento describe el diseño del sistema para la versión MVP (Minimum Viable Product) de Argus, una aplicación web que permite a los usuarios ejecutar código en varios lenguajes de programación, medir su rendimiento (tiempo de ejecución y uso de memoria), y obtener una estimación de su complejidad algorítmica. Se utilizará una arquitectura monolítica para el backend (con Node.js, Express.js y TypeScript), con la posibilidad de migrar a microservicios en el futuro. El frontend se desarrollará con Next.js.


## 1. Componentes Principales

El sistema se compone de los siguientes componentes principales:

*   **Frontend (Next.js):** La interfaz de usuario de la aplicación, construida con Next.js (un framework de React).
*   **Backend (Node.js/Express.js):** El servidor de la aplicación, que expone una API REST, gestiona la autenticación, valida las entradas, se comunica con SQS y la base de datos, y ejecuta el código (temporalmente).
*   **Cola de Mensajes (AWS SQS):** Una cola de mensajes utilizada para desacoplar el backend de la lógica de ejecución de código (preparando el camino para futuros microservicios).
*   **Base de Datos (PostgreSQL):** Una base de datos relacional para almacenar la información de los usuarios y el historial de ejecuciones.
*   **API Gateway (AWS API Gateway):** Un servicio de AWS que actúa como punto de entrada único para la API, gestionando la autenticación, el *rate limiting* y el enrutamiento de las solicitudes.

### 1.1 Frontend (Next.js)

*   **Responsabilidades:**
    *   Proporcionar una interfaz de usuario intuitiva y responsiva para que los usuarios puedan:
        *   Ingresar código (en un editor con resaltado de sintaxis).
        *   Seleccionar el lenguaje de programación.
        *   Ingresar datos de entrada (input) para el código (opcional).
        *   Ejecutar el código.
        *   Ver los resultados de la ejecución (tiempo, memoria, complejidad, salida estándar, errores).
        *   Registrarse e iniciar sesión.
        *   Ver su historial de ejecuciones.
    *   Comunicarse con la API REST del backend para enviar solicitudes y recibir respuestas.
    *   Gestionar el estado de la aplicación (datos del usuario, token JWT, historial, estado de carga, etc.).
    *   Mostrar mensajes de error al usuario cuando ocurran errores.
    *   Mostrar indicadores de carga mientras se realizan las peticiones a la API.
    *   Renderizar la aplicación del lado del servidor (SSR) y/o generar sitios estáticos (SSG) para mejorar el rendimiento.
*   **Tecnologías:**
    *   Next.js (framework de React)
    *   React
    *   TypeScript
    *   `react-ace` o `CodeMirror` (para el editor de código)
    *   `recharts` o `Chart.js` (para gráficos, opcional)
    *   `fetch` o `axios` (para realizar peticiones HTTP)
    *   Context API, Zustand o Redux (para el manejo del estado)

### 1.2 Backend (Node.js/Express.js) - Monolítico

*   **Responsabilidades:**
    *   Exponer una API RESTful para que el frontend (y otros clientes) puedan interactuar con la aplicación.
    *   Validar los datos de entrada recibidos del frontend (código, lenguaje, input).
    *   Autenticar y autorizar a los usuarios (usando JWT y bcrypt).
    *   Comunicarse con la cola de mensajes AWS SQS (encolar solicitudes de ejecución).
    *   Interactuar con la base de datos PostgreSQL (usando Sequelize u otro ORM).
    *   Gestionar errores y generar logs (usando Winston, Bunyan, o similar).
    *   Implementar *rate limiting* (usando `express-rate-limit`).
    *   *Temporalmente*, ejecutar el código de forma segura (usando `child_process`), medir su rendimiento y analizar su complejidad. Esta lógica está *encapsulada* y preparada para ser extraída a microservicios (workers) en el futuro.
*   **Tecnologías:**
    *   Node.js
    *   Express.js
    *   TypeScript
    *   JWT (jsonwebtoken)
    *   bcrypt
    *   Sequelize (u otro ORM como TypeORM)
    *   `pg` y `pg-hstore` (drivers de PostgreSQL)
    *   `express-rate-limit`
    *   Winston o Bunyan (para logging)
    *   `aws-sdk` (para interactuar con SQS)
    *   `child_process` (para ejecutar código)
    *   `esprima` (para el análisis estático de JavaScript)
    *   `ast` (para el análisis estático de Python)

### 1.3 Cola de Mensajes (AWS SQS)

*   **Responsabilidades:**
    *   Actuar como intermediario entre el backend y la lógica de ejecución de código (que *temporalmente* reside en el mismo backend).
    *   Permitir la ejecución asíncrona de código.  El backend encola la solicitud de ejecución y no tiene que esperar a que el código termine de ejecutarse para responder al cliente.
    *   Facilitar la escalabilidad horizontal (en el futuro, cuando se migre a microservicios).
    *   Aumentar la resiliencia del sistema (si la ejecución de código falla, el mensaje permanece en la cola y puede ser procesado más tarde).
*   **Tecnología:**
    *   AWS SQS (Simple Queue Service)

### 1.4 Base de Datos (PostgreSQL)

*   **Responsabilidades:**
    *   Almacenar la información de los usuarios (nombre de usuario, email, hash de la contraseña).
    *   Almacenar el historial de ejecuciones de código (ID de ejecución, ID de usuario, lenguaje, código fuente, input, tiempo de ejecución, uso de memoria, complejidad temporal estimada, complejidad espacial estimada, salida estándar del código, errores, fecha y hora de la ejecución).
*   **Tecnología:**
    *   PostgreSQL (gestionado por AWS RDS o desplegado en una instancia EC2)

### 1.5 API Gateway (AWS API Gateway)

*   **Responsabilidades:**
    *   Actuar como punto de entrada único para la API de Argus.  Todas las solicitudes del frontend pasan por API Gateway.
    *   Gestionar la autenticación y autorización (verificar el token JWT).  Puede delegar la validación del token al backend o usar un *authorizer* personalizado de API Gateway.
    *   Implementar *rate limiting* (limitar el número de solicitudes por usuario/IP para prevenir abusos).  Esto complementa el *rate limiting* que también se implementa en el backend.
    *   (Opcional) Transformar las solicitudes y respuestas (por ejemplo, convertir entre diferentes formatos de datos).
    *   Enrutar las solicitudes al backend.
*   **Tecnología:**
    *   AWS API Gateway

## 2. Ejecución de Código, Medición y Análisis (dentro del Backend)

En esta fase MVP, la lógica de ejecución de código, medición del rendimiento y análisis de complejidad se implementará *dentro del backend monolítico*. Sin embargo, se diseñará de forma modular y utilizando interfaces, para que sea fácil de extraer a microservicios (workers) en el futuro.

*   **Interfaces:**
    *   `CodeExecutor`: Define el contrato para la ejecución de código.  Tendrá un método `execute(code: string, language: string, input?: string): Promise<ExecutionResult>`.
    *   `ComplexityAnalyzer`: Define el contrato para el análisis de complejidad.  Tendrá métodos `analyzeStatic(code: string, language: string): ComplexityResult` y `analyzeDynamic(code: string, language: string, input: string, executionData: ExecutionData): ComplexityResult` (el análisis dinámico es opcional para el MVP).
    *   `ExecutionResult`: Define la estructura de los datos que devuelve el método `execute` (tiempo de ejecución, uso de memoria, complejidad temporal y espacial, salida estándar, errores).
    *  `ComplexityResult`: Define la estructura que devolverán los métodos de análisis.
    *  `ExecutionData`: (Opcional). Define datos adicionales para el análisis.

*   **Implementaciones Concretas:**
    *   `JavaScriptExecutor`:  Clase que implementa la interfaz `CodeExecutor` para JavaScript.  Utilizará `child_process.spawn` para ejecutar el código de forma segura, `performance.now()` para medir el tiempo, `process.memoryUsage().heapUsed` para medir la memoria, y `esprima` para el análisis estático de complejidad.
    *   `PythonExecutor`: Clase que implementa la interfaz `CodeExecutor` para Python. Utilizará `subprocess.run` para ejecutar el código, `time.perf_counter()` para medir el tiempo, `tracemalloc` o `memory_profiler` para medir la memoria, y el módulo `ast` para el análisis estático.
    *   Se crearán clases similares para cada lenguaje soportado (JavaExecutor, GoExecutor, etc.).
    *   Cada implementación de `CodeExecutor` también podría implementar (o componer) `ComplexityAnalyzer`

*   **Factory o Inyección de Dependencias:** El backend utilizará un patrón Factory o inyección de dependencias para seleccionar la implementación correcta de `CodeExecutor` en función del lenguaje de programación especificado en la solicitud del usuario.

*   **Flujo:** El backend recibe la solicitud, valida los datos, selecciona el `CodeExecutor` adecuado, llama a su método `execute`, recibe los resultados, los guarda en la base de datos, encola un mensaje en SQS (para notificar que la ejecución ha terminado - *aunque la ejecución ocurra dentro del backend, se mantiene SQS*), y responde al cliente.

## 3. Escalabilidad

*   **Horizontal (Preparada):** La arquitectura está preparada para escalar horizontalmente.  Aunque en el MVP la ejecución de código ocurre dentro del backend, el uso de SQS permite añadir más instancias del backend monolítico para manejar más solicitudes a la API.  En el futuro, se podrá migrar la lógica de ejecución a workers (microservicios) sin afectar al resto de la aplicación.
*   **Vertical:** Se puede escalar verticalmente aumentando los recursos (CPU, memoria) de la instancia donde se ejecuta el backend.
*   **Base de Datos:** PostgreSQL (con RDS) es escalable.  Se pueden usar réplicas de lectura y sharding/particionamiento.
*   **API Gateway:** AWS API Gateway escala automáticamente.

## 4. Seguridad

*   **Autenticación y Autorización:** JWT para autenticar usuarios y proteger endpoints.
*   **Aislamiento (Limitado):** `child_process` ofrece cierto aislamiento, pero es menos robusto que Docker.
*   **Limitación de Recursos:** Timeouts y límites de memoria para los subprocesos.
*   **Validación de Entrada:** Validación rigurosa de todos los datos de entrada.
*   **HTTPS:** Comunicaciones cifradas.
*   **Rate Limiting:** En API Gateway y en el backend.

## 5. Despliegue (CI/CD)

*   **Docker Compose:** Para desarrollo local.
*   **AWS ECS/Fargate:** Para despliegue en producción.
*   **AWS CodePipeline, CodeBuild, CodeDeploy:** Para CI/CD.

## 6. Monitoreo y Logging

*   **CloudWatch:** Monitorizar rendimiento y contenedores.
*   **Logs Centralizados:** Usar CloudWatch Logs o una solución como ELK stack.
*   **Alertas:** Configurar alertas en CloudWatch.
