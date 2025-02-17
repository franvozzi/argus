# System Design

Este documento describe el diseño del sistema para Argus.

## 1. Componentes Principales

### Frontend (Next.js)

*   **Responsabilidades:**
    *   Interfaz de usuario para ingresar código, inputs y seleccionar el lenguaje.
    *   Editor de código enriquecido (utilizando `react-ace` o `CodeMirror`).
    *   Visualización de resultados (tablas y gráficos, usando `recharts` o `Chart.js`).
    *   Gestión del estado de la UI (Context API, Zustand, o Redux si es necesario).
    *   Comunicación con la API REST del backend (mediante `fetch` o `axios`).
    *   Manejo de la autenticación del usuario (guardar/leer el token JWT).
    *   Mostrar indicadores de carga y mensajes de error.
    *   Renderizado del lado del servidor (SSR) y/o generación de sitios estáticos (SSG) con Next.js para optimizar el rendimiento.
*   **Tecnologías:** Next.js, React, TypeScript, react-ace/CodeMirror, recharts/Chart.js, fetch/axios.

### Backend (Node.js/Express.js)

*   **Responsabilidades:**
    *   Implementación de la API RESTful (con Express.js).
    *   Validación de los datos de entrada (código, input, lenguaje).
    *   Autenticación y autorización (JWT, bcrypt).
    *   Comunicación con la cola de mensajes (SQS).
    *   Interacción con la base de datos PostgreSQL (utilizando un ORM como Sequelize o TypeORM).
    *   Gestión de errores y logging (Winston/Bunyan).
    *   Implementación del *rate limiting* (usando `express-rate-limit`).
*   **Tecnologías:** Node.js, Express.js, TypeScript, JWT, bcrypt, Sequelize/TypeORM, express-rate-limit, Winston/Bunyan.

### Workers (Docker + Node.js/Python/...)

*   **Responsabilidades:**
    *   Recibir mensajes de la cola de mensajes (SQS).
    *   Ejecutar el código de forma segura dentro de un contenedor Docker.
    *   Medir el tiempo de ejecución y el uso de memoria.
    *   Realizar el análisis de complejidad algorítmica (estático y dinámico).
    *   Enviar los resultados al backend (a través de la cola de mensajes o directamente).
    *   Manejar errores (timeouts, errores de ejecución, etc.).
*   **Tecnologías:** Docker, Node.js (para el worker de JavaScript), Python (para el worker de Python), bibliotecas de medición de rendimiento, bibliotecas de análisis AST (esprima, ast).

### Cola de Mensajes (AWS SQS)

*   **Responsabilidades:**
    *   Desacoplar el backend de los workers.
    *   Permitir la ejecución asíncrona de código.
    *   Asegurar la escalabilidad y la resiliencia del sistema.
    *   Gestionar la cola de solicitudes de ejecución.
*   **Tecnología:** AWS SQS (Simple Queue Service).

### Base de Datos (PostgreSQL)

*   **Responsabilidades:**
    *   Almacenar el historial de ejecuciones (código, input, lenguaje, resultados, usuario).
    *   Almacenar la información de los usuarios (username, email, hash de la contraseña).
    *   (Opcional) Almacenar métricas agregadas para análisis y reportes.
*   **Tecnología:** PostgreSQL (gestionado por AWS RDS o desplegado en EC2/ECS).

### API Gateway (AWS API Gateway)

*   **Responsabilidades:**
    *   Punto de entrada único para la API.
    *   Gestión de la autenticación y autorización (JWT). Puede delegar la validación al backend o usar un *authorizer* personalizado.
    *   *Rate limiting* (complementario al del backend).
    *   Transformación de solicitudes y respuestas (si es necesario).
    *   Enrutamiento de solicitudes al backend.
*   **Tecnología:** AWS API Gateway.

## 2. Diseño Detallado de los Workers

Este es un aspecto crucial, ya que aquí se ejecuta el código y se mide su rendimiento.

*   **Estructura del Worker (Común a todos los lenguajes):**

    1.  **Recepción del Mensaje:** El worker escucha la cola SQS y recibe un mensaje con:
        *   `code`: El código a ejecutar (string).
        *   `language`: El lenguaje del código ("python", "javascript", etc.).
        *   `input`: El input para el código (string, number, JSON, etc.).
        *   `executionId`: Identificador único de la ejecución.
        *   `userId`: (Opcional) ID del usuario, si el código es de un usuario autenticado.

    2.  **Preparación del Entorno:**
        *   Crear un directorio temporal.
        *   Crear un archivo con el código (`code.py`, `code.js`, etc.).
        *   Crear un archivo con el input (si es necesario).

    3.  **Ejecución del Código (con Medición):**
        *   **Tiempo:** APIs de alta resolución:
            *   JavaScript: `performance.now()`
            *   Python: `time.perf_counter()` o `time.time()`
        *   **Memoria:**
            *   JavaScript: `process.memoryUsage().heapUsed` (heap de V8). Para mayor precisión, un *profiler*.
            *   Python: `tracemalloc` o `memory_profiler`. También `resource.getrusage(resource.RUSAGE_SELF).ru_maxrss` (Unix-like).
        *   **Ejecución con `child_process` (Node.js) o `subprocess` (Python):**
            *   Subproceso para controlar tiempo y recursos.
            *   Captura de stdout y stderr.
            *   Timeout para evitar bucles infinitos.
        *   **Ejemplo (Node.js):**

            ```javascript
            const { exec } = require('child_process');
            const startTime = performance.now();
            const child = exec('node code.js', { timeout: 5000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
                const endTime = performance.now();
                const executionTime = endTime - startTime;
                const memoryUsage = process.memoryUsage().heapUsed;

               // ... enviar resultados ...
            });

            if (input) {
              child.stdin.write(input);
              child.stdin.end();
            }

            ```

        *   **Ejemplo (Python):**

            ```python
            import subprocess
            import time
            import tracemalloc
            import resource

            start_time = time.perf_counter()
            tracemalloc.start()

            process = subprocess.Popen(['python', 'code.py'],
                                      stdin=subprocess.PIPE,
                                      stdout=subprocess.PIPE,
                                      stderr=subprocess.PIPE,
                                      text=True)

            try:
              stdout, stderr = process.communicate(input=input_data, timeout=5)
            except subprocess.TimeoutExpired:
              process.kill()
              stdout, stderr = process.communicate()
              stderr += "\nTimeoutExpired: Execution exceeded 5 seconds."

            end_time = time.perf_counter()
            execution_time = end_time - start_time
            current, peak = tracemalloc.get_traced_memory()
            tracemalloc.stop()
            max_rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024  # KB (Unix)
            # ... enviar resultados ...

            ```

    4.  **Análisis de Complejidad (Aproximación):**
        *   **Análisis Estático (antes de la ejecución):**
            *   `esprima` (JavaScript) o `ast` (Python) para parsear el código en un AST.
            *   Recorrer el AST para identificar:
                *   Bucles (`for`, `while`).
                *   Anidamiento de bucles.
                *   Recursión.
                *   Llamadas a funciones (si hay información de su complejidad).
            *   Estimar la complejidad (O(n), O(log n), O(n^2), etc.). Ser conservador.
        *   **Análisis Dinámico (durante la ejecución):**
            *   Instrumentar el código (añadir contadores) para contar operaciones clave.  Modificar el AST antes de la ejecución.
            *   Relacionar las cuentas con el tamaño del input para inferir la complejidad.

    5.  **Envío de Resultados:** Enviar resultados (tiempo, memoria, complejidad, stdout, stderr, executionId, userId) al backend. Opciones:
        *   **Directamente a la API (menos escalable):** Solicitud HTTP a la API del backend (`POST /api/v1/results`).
        *   **A través de la cola de mensajes (más escalable):** Mensaje a otra cola SQS (ej. `results-queue`).  *Opción preferida*.
        *   **A través de la base de datos (no recomendado):** Escribir directamente en la base de datos.  Acopla el worker y puede generar problemas de concurrencia.

    6.  **Manejo de Errores:** Capturar excepciones, registrar errores y timeouts, y enviar un mensaje de error al backend.

*   **Dockerización:**
    *   `Dockerfile` para cada lenguaje (Node.js, Python, etc.).
    *   Instalar dependencias.
    *   Copiar el script del worker.
    *   Configurar el comando de inicio para escuchar la cola SQS.
    *   Limitar recursos del contenedor (CPU, memoria) con opciones de Docker.

## 3. Escalabilidad

*   **Horizontal:** Arquitectura con cola de mensajes y workers permite escalar horizontalmente añadiendo más instancias de workers (contenedores). AWS ECS/Fargate lo facilita.
*   **Vertical:** Aumentar recursos (CPU, memoria) de las instancias EC2/Fargate o de la base de datos (RDS).
*   **Base de Datos:** PostgreSQL (con RDS) es escalable. Réplicas de lectura para mejorar el rendimiento y sharding/particionamiento para grandes bases de datos.
*   **API Gateway:** AWS API Gateway escala automáticamente.

## 4. Seguridad

*   **Autenticación y Autorización:** JWT para autenticar usuarios y proteger endpoints.
*   **Aislamiento:** Docker aísla las ejecuciones de código.
*   **Limitación de Recursos:** Contenedores con límites de CPU, memoria y tiempo.
*   **Usuario No Root:** Ejecutar código dentro del contenedor como usuario no root.
*   **Sin Acceso a Red (o Whitelist):** Deshabilitar acceso a red en contenedores (o usar whitelist).
*   **Seccomp:** Usar perfil seccomp para restringir llamadas al sistema.
*   **Escaneo de Vulnerabilidades:** Escanear imágenes Docker.
*   **HTTPS:** Comunicaciones cifradas (HTTPS).
*   **Validación de Entrada:** Validar rigurosamente los datos de entrada en el backend.
*   **Rate Limiting:** En API Gateway y en el backend.

## 5. Despliegue (CI/CD)

*   **Docker Compose:** Para desarrollo local.
*   **AWS ECS/Fargate:** Para despliegue en producción.
*   **AWS CodePipeline, CodeBuild, CodeDeploy:** Para CI/CD. Automatizar construcción de imágenes, pruebas y despliegue.

## 6. Monitoreo y Logging

*   **CloudWatch:** Monitorizar rendimiento de la aplicación y contenedores.
*   **Logs Centralizados:** Usar un sistema centralizado (CloudWatch Logs, ELK stack) para recolectar y analizar logs.
*   **Alertas:** Configurar alertas en CloudWatch para problemas (errores, alto uso de CPU).

Este documento proporciona una descripción detallada del diseño del sistema de Argus.  Es importante iterar sobre este diseño durante el desarrollo.
