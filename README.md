<div align="center" style="margin-bottom: 2rem;">
    <img src="https://drive.google.com/uc?export=view&id=1yYvj-7zVst7a_zDiPEOnbKphOoBZYjSY" alt="Logo Argus" style="max-width: 200px; height: auto;">
  </div>


# Argus

Argus es una aplicación web diseñada para medir el rendimiento de bloques de código en diversos lenguajes de programación, proporcionando un análisis detallado de su eficiencia y complejidad algorítmica. Inspirado en el gigante mitológico de cien ojos, Argus observa y analiza cada aspecto de la ejecución de tu código.

## Análisis y Diseño

### 1. Requisitos Funcionales

*   ✅ **Ejecución de Código en Múltiples Lenguajes:** Soporte inicial para JavaScript y Python, con la posibilidad de expandir a otros lenguajes (Java, C++, Go, etc.) en el futuro. La selección del lenguaje se realiza a través de una opción en la interfaz de usuario.
*   ✅ **Medición Precisa del Tiempo de Ejecución:** Registro del tiempo de ejecución del código en milisegundos, utilizando APIs de alta resolución (`performance.now()` en JavaScript, `time.perf_counter()` en Python).
*   ✅ **Medición del Uso de Memoria:** Seguimiento del consumo máximo de memoria del proceso durante la ejecución del código.
*   ✅ **Estimación de la Complejidad Algorítmica (Tiempo y Espacio):** Análisis estático (mediante el AST) y dinámico (instrumentación del código) para proporcionar una estimación de la complejidad en notación Big O. Se informará claramente al usuario que es una *estimación*.
*   ✅ **Entrada de Datos de Prueba (Inputs):** Permite al usuario proporcionar *inputs* para el código a ejecutar, de diferentes tamaños, para una medición significativa del rendimiento.
*   ✅ **Guardado de Mediciones Pasadas por Usuario:** Registro del historial de ejecuciones, incluyendo el código, los inputs, el lenguaje, las métricas de rendimiento y el análisis de complejidad. Se requiere autenticación del usuario.
*   ✅ **Visualización de Resultados:** Presentación clara de los resultados, incluyendo:
    *   Tiempo de ejecución.
    *   Uso máximo de memoria.
    *   Complejidad estimada (tiempo y espacio).
    *   Salida estándar (stdout) del código.
    *   Error estándar (stderr) del código (si los hay).
    *   Gráficas de rendimiento (opcional, para futuras versiones).
*   ✅ **Editor de código con resaltado de sintaxis.**

### 2. Requisitos No Funcionales

*   ⚡ **Alta Concurrencia:** Capacidad para manejar múltiples usuarios ejecutando código simultáneamente.
*   🔒 **Seguridad:** Ejecución aislada del código con recursos limitados (CPU, memoria, tiempo de ejecución) para prevenir ataques y efectos secundarios en el servidor.
*   📈 **Escalabilidad:** Arquitectura diseñada para escalar horizontalmente y verticalmente para soportar un mayor número de usuarios y lenguajes de programación.
*   💾 **Persistencia de Mediciones:** Almacenamiento de las mediciones históricas en una base de datos PostgreSQL.
*   **Usabilidad:** Interfaz de usuario intuitiva y fácil de usar, con un diseño responsivo.
*   **Mantenibilidad:** Código limpio, bien documentado y modular, siguiendo buenas prácticas de desarrollo.
*   **Autenticación y Autorización:** Los usuarios deben registrarse e iniciar sesión para guardar su historial de mediciones. Sistema de autenticación seguro (JWT).
*   **Disponibilidad:** La aplicación debe estar disponible y responder de forma consistente.

### 3. Arquitectura General (MVP Monolítico)

En esta fase inicial (MVP), Argus se implementará con un backend monolítico (Node.js/Express.js), pero con una arquitectura preparada para una futura migración a microservicios.

*   **Frontend (Next.js, TypeScript):**
    *   Interfaz de usuario construida con React, utilizando Next.js para un rendimiento óptimo (SSR y SSG).
    *   Editor de código enriquecido (`react-ace` o `CodeMirror`) con resaltado de sintaxis.
    *   Componentes para la visualización de resultados (tablas, gráficos).
    *   Formulario para la entrada de código, selección de lenguaje e inputs de prueba.
    *   Conexión con la API REST del backend.
    *   Gestión del estado de la aplicación (Context API, Zustand o Redux).

*   **Backend (Node.js, API REST - Express.js) - Monolítico:**
    *   API RESTful construida con Express.js.
    *   Recibe el código, el input, el lenguaje y la información del usuario (si está autenticado).
    *   *Temporalmente*, ejecuta el código de forma segura (usando `child_process`), mide su rendimiento y analiza su complejidad.
    *   Gestiona la comunicación con la cola de mensajes (SQS) para la ejecución asíncrona (preparando el camino para los futuros workers).
    *   Interactúa con la base de datos PostgreSQL para almacenar y recuperar las mediciones.
    *   Implementa la autenticación y autorización de usuarios (JWT).

*   **Cola de Mensajes (AWS SQS):**
    *  Desacopla el backend de la *lógica de ejecución*.
    * Permite la ejecución asíncrona.
    *  Prepara la arquitectura para la futura migración a microservicios (workers).

*   **Base de Datos (PostgreSQL):**
    *   Almacena las mediciones históricas, la información de los usuarios y los datos de autenticación.
    *   Se utilizará un ORM (Sequelize o TypeORM).

*   **Infraestructura (AWS):**
    *   API Gateway: Para exponer la API REST.
    *   SQS (Simple Queue Service): Cola de mensajes.
    *   ECS (Elastic Container Service) / Fargate: Para ejecutar el backend monolítico en un contenedor Docker. Fargate es la opción preferida (serverless).
    *   RDS (Relational Database Service) para PostgreSQL, o PostgreSQL desplegado en EC2/ECS.
    *   CloudWatch: Para la monitorización y logging.
    *   IAM: Para la gestión de permisos y seguridad.
    *   (Opcional) S3 para servir el frontend de forma estática.

**Arquitectura Preparada para Microservicios:**

Aunque el MVP es monolítico, el diseño *ya incorpora principios* que facilitarán la migración a microservicios en el futuro:

*   **Comunicación a través de SQS:**  El backend ya está desacoplado de la lógica de ejecución gracias a SQS.
*   **Encapsulamiento de la Lógica de Ejecución:** La lógica de ejecución de código (para cada lenguaje) se implementará en clases separadas (`JavaScriptExecutor`, `PythonExecutor`, etc.) que implementan una interfaz común (`CodeExecutor`).  Esto facilita la extracción de esta lógica a workers independientes (microservicios) en el futuro.
*   **Diseño Modular:** El backend se diseñará de forma modular, con responsabilidades bien definidas para cada componente (controladores, servicios, modelos, etc.).

**Tecnologías Clave:**

*   **Frontend:** Next.js, React, TypeScript, react-ace/CodeMirror, recharts/Chart.js, fetch/axios.
*   **Backend:** Node.js, Express.js, TypeScript, JWT, bcrypt, Sequelize/TypeORM, express-rate-limit, Winston/Bunyan, `aws-sdk`, `child_process`, `esprima`, `ast`.
*   **Base de Datos:** PostgreSQL.
*   **Infraestructura:** AWS (API Gateway, SQS, ECS/Fargate, RDS, CloudWatch, IAM).
*   **Contenedores:** Docker.

```mermaid
graph TD
    subgraph Usuario
        A[Usuario: Ingresa codigo, lenguaje e input opcional]
    end

    subgraph Frontend
        B[Frontend: Envia solicitud a la API - POST /api/v1/execute]
    end

    subgraph API_Gateway
        C[API Gateway: Recibe solicitud, autentica JWT, aplica rate limiting]
    end

    subgraph Backend[Backend Monolitico]
        D[Backend: Valida la solicitud]
        D --> E{Solicitud Valida?}
        E -- No --> F[Backend: Responde con error - 400 Bad Request o 401 Unauthorized]
        E -- Si --> G[Backend: Obtiene CodeExecutor segun lenguaje]
        G --> H[Backend: Ejecuta codigo con CodeExecutor - child_process, mide tiempo/memoria, analiza complejidad]
        H --> I[Backend: Crea mensaje para SQS - executionId, resultados]
        I --> J[Backend: Envia mensaje a SQS]
        J --> K[Backend: Guarda resultados en DB]
        K --> L[Backend: Responde a Frontend - 202 Accepted, executionId]
    end

    subgraph SQS
        M[SQS: Cola de Mensajes]
    end

    subgraph Base_de_Datos
        N[PostgreSQL: Almacena resultados]
    end

    subgraph Frontend_Resultados
        O[Frontend: Recibe y muestra resultados]
    end

    A --> B
    B --> C
    C --> D
    L --> B
    J --> M
    H --> N
    F --> B
```
<hr>


<div align="center" style="display: flex; justify-content: center;">
<img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/AWS-%23232F3E.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/AWS_API_Gateway-FF4F8B?style=for-the-badge&logo=amazon-api-gateway&logoColor=white" alt="AWS API Gateway" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/Amazon_SQS-FF4F8B?style=for-the-badge&logo=amazon-sqs&logoColor=white" alt="Amazon SQS" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/Amazon_ECS-FF4F8B?style=for-the-badge&logo=amazon-ecs&logoColor=white" alt="Amazon ECS" style="margin: 4px;"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" style="margin: 4px"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" style="margin: 4px"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" style="margin: 4px"/>
</div>


