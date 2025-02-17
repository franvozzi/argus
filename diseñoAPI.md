## Diseño de APIs (REST)

**Descripción**

La API REST de Argus permitirá a los usuarios ejecutar código en múltiples lenguajes de programación, medir su rendimiento (tiempo de ejecución y uso de memoria), obtener un análisis de su complejidad algorítmica, y almacenar los resultados de forma persistente. Se seguirán principios de diseño RESTful para garantizar la escalabilidad, la mantenibilidad y la facilidad de uso.

**Endpoints Principales**

**1. Ejecución de Código**

*   **Endpoint:** `POST /api/v1/execute`  (Se añade un prefijo `/api/v1/` para versionado)
*   **Descripción:** Ejecuta código en un lenguaje determinado, mide su rendimiento y estima su complejidad.
*   **Request Body (JSON):**

    ```json
    {
      "language": "python",  // Lenguaje del código (e.g., "python", "javascript")
      "code": "def factorial(n):\n  if n == 0:\n    return 1\n  else:\n    return n * factorial(n-1)\n\nprint(factorial(5))",  // Código a ejecutar
      "input": "5" // Input opcional para el código, puede ser un string, un número, un array, etc. según lo que requiera el código
    }
    ```
*   **Response Body (JSON - Éxito 200 OK):**

    ```json
    {
      "execution_time_ms": 2.5,      // Tiempo de ejecución en milisegundos
      "memory_usage_kb": 1536,     // Uso máximo de memoria en kilobytes
      "complexity_time": "O(n)",   // Complejidad temporal estimada (Big O)
      "complexity_space": "O(n)",  // Complejidad espacial estimada (Big O)
      "output": "120\n",          // Salida estándar del código (stdout)
      "error": ""                // Error estándar del código (stderr) - vacío si no hay errores
    }
    ```

*   **Response Body (JSON - Error):**

    ```json
    {
    "error": "Código inválido para el lenguaje seleccionado.", // Mensaje de error
     "status_code": 400  // Código de estado HTTP
    }

    {
      "error": "Tiempo de ejecución excedido.",
      "status_code": 408 // Request Timeout
    }
    ```
* **Diagrama de secuencia** 
<div>
  <img align="center" src="https://drive.google.com/uc?export=view&id=1ahbNIoHEHFEQbN53g0Kw-G8U25FJifVn">
</div>
    Se utilizarán códigos de estado HTTP estándar para indicar diferentes tipos de errores (400 Bad Request, 408 Request Timeout, 500 Internal Server Error, etc.).

</br>
</br>


**2. Obtener el Historial de Ejecuciones (Requiere Autenticación)**

*   **Endpoint:** `GET /api/v1/history`
*   **Descripción:** Obtiene el historial de ejecuciones del usuario autenticado.
*   **Headers:**
    *   `Authorization: Bearer <token JWT>` (Obligatorio)
*   **Response Body (JSON - Éxito 200 OK):**

    ```json
    [
      {
        "id": 1,
        "language": "python",
        "execution_time_ms": 120.5,
        "created_at": "2025-02-16T10:00:00Z"
      },
      {
        "id": 2,
        "language": "javascript",
        "execution_time_ms": 200.1,
        "created_at": "2025-02-15T14:30:00Z"
      }
    ]
    ```
*  **Response (Error 401 Unauthorized):**
    ```json
    {
    "error": "Unauthorized"
    }
    ```
* **Diagrama de secuencia** 
<div>
  <img align="center" src="https://drive.google.com/uc?export=view&id=1FNiHm3lVkohoHbnyilrs3Xj5MTUw4kd8">
</div>
</br>

**3. Obtener Detalles de una Ejecución (Requiere Autenticación)**

*   **Endpoint:** `GET /api/v1/history/{id}`  (donde `{id}` es el ID de la ejecución)
*   **Descripción:** Obtiene los detalles completos de una ejecución específica, incluyendo el código, el input, las métricas y la salida.
*   **Headers:**
    *   `Authorization: Bearer <token JWT>` (Obligatorio)
*   **Response Body (JSON - Éxito 200 OK):**

    ```json
    {
      "id": 1,
      "language": "python",
      "code": "def factorial(n):\n  if n == 0:\n    return 1\n  else:\n    return n * factorial(n-1)\n\nprint(factorial(5))",
      "input": "5",
      "execution_time_ms": 2.5,
      "memory_usage_kb": 1536,
      "complexity_time": "O(n)",
      "complexity_space": "O(n)",
      "output": "120\n",
      "error": "",
      "created_at": "2025-02-16T10:00:00Z"
    }
    ```
* **Response (Error 401 Unauthorized/ 404 Not Found):**

    ```json
    {
      "error": "Unauthorized" //401
    }
    ```

     ```json
    {
      "error": "Execution not found" //404
    }
    ```
 * **Diagrama de secuencia**    
<div>
  <img align="center" src="https://drive.google.com/uc?export=view&id=1i-lwtytFn1eBX6mdf-dHNdTHDhy_ihxB">
</div>
</br>

**4. Obtener Lenguajes Soportados**

*   **Endpoint:** `GET /api/v1/languages`
*   **Descripción:** Retorna la lista de lenguajes de programación soportados por la API.
*   **Response Body (JSON - Éxito 200 OK):**

    ```json
    {
      "languages": ["python", "javascript", "java", "c++", "go"]
    }
    ```
* **Diagrama de secuencia** 
<div>
  <img align="center" src="https://drive.google.com/uc?export=view&id=1G7ddQ3IUauAvot8eE2RBTyC8TAqtjfP5">
</div>
</br>

**Seguridad y Autenticación**

**1. Registro de Usuarios**

*   **Endpoint:** `POST /api/v1/register`
*   **Descripción:** Crea un nuevo usuario.
*   **Request Body (JSON):**

    ```json
    {
      "username": "usuario123",
      "email": "usuario@example.com",
      "password": "password123"  // La contraseña se hasheará con bcrypt en el backend
    }
    ```
*   **Response Body (JSON - Éxito 201 Created):**

    ```json
    {
      "message": "Usuario registrado con éxito.",
       "user_id": 123
    }
    ```
    *   **Response Body (JSON - Error):**
    ```json
    {
      "error": "El correo electrónico ya está registrado",
       "status_code": 409 //Conflict
    }
    ```
* **Diagrama de secuencia**

  
<div>
  <img src="https://drive.google.com/uc?export=view&id=1gho6NMASzLeXvDs17sBmZfAgWU9WyJuY" align="center">
</div>
</br>

**2. Inicio de Sesión (Login)**

*   **Endpoint:** `POST /api/v1/login`
*   **Descripción:** Autentica a un usuario existente y genera un token JWT.
*   **Request Body (JSON):**

    ```json
    {
      "email": "usuario@example.com",
      "password": "password123"
    }
    ```
*   **Response Body (JSON - Éxito 200 OK):**

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // Token JWT
    }
    ```
* **Response (Error 401 Unauthorized):**
        ```json
        {
          "error": "Credenciales Inválidas"
        }
        ```
* **Diagrama de secuencia**
  
<div>
  <img src="https://drive.google.com/uc?export=view&id=1lY5rzODQXCtem_RhoTK11NMBpkzt3JZ9" align="center">
</div>
</br>

**3. Protección de Endpoints**

*   Los endpoints `/api/v1/execute` y `/api/v1/history` *requerirán* autenticación mediante el header `Authorization: Bearer <token JWT>`.
*   Si el token es inválido, ha expirado o no se proporciona, la API retornará un error `HTTP 401 Unauthorized`.

**4. Seguridad Adicional**

*   **bcrypt:** Se utilizará `bcrypt` para el hashing seguro de las contraseñas antes de almacenarlas en la base de datos.  Esto es fundamental para proteger las credenciales de los usuarios.
*   **Roles y Permisos (Futuro):** En futuras versiones, se implementará un sistema de roles y permisos para diferenciar entre usuarios regulares y administradores, permitiendo un control de acceso más granular.
*   **Rate Limiting:** Se implementará *rate limiting* (limitación de la tasa de solicitudes) para prevenir abusos en la ejecución de código y proteger la API contra ataques de denegación de servicio (DDoS).

**Consideraciones Adicionales**

*   **Rate Limiting y Protección contra Abusos:**
    *   Se implementará un límite en la cantidad de ejecuciones de código que un usuario puede realizar en un período de tiempo determinado.
    *   Se utilizará una biblioteca de *rate limiting* (como `express-rate-limit` en Node.js) para gestionar estas restricciones.
    *   Se considerarán medidas adicionales de protección contra ataques DDoS, como el uso de firewalls y el bloqueo de IPs sospechosas.

*   **Manejo de Errores y Logs:**
    *   Se implementará un sistema de logs centralizado (utilizando una herramienta como Winston o Bunyan en Node.js) para registrar errores, eventos importantes y métricas de rendimiento.
    *   Se definirán formatos de respuesta de error consistentes, incluyendo códigos de estado HTTP apropiados y mensajes de error descriptivos.

*   **Testing y Validación:**
    *   Se crearán pruebas unitarias para cada componente del backend (controladores, servicios, modelos de datos).
    *   Se realizarán pruebas de integración para validar el correcto funcionamiento de la API en su conjunto, incluyendo la interacción con la base de datos y la cola de mensajes.
    *   Se evaluará la precisión de las mediciones de tiempo de ejecución y uso de memoria, y se realizarán pruebas de carga para verificar la escalabilidad del sistema.

*   **Estrategia de Despliegue y Dockerización:**
    *   Se creará un `Dockerfile` optimizado para cada componente (frontend, backend, workers), minimizando el tamaño de la imagen y el tiempo de construcción.
    *   Se utilizará Docker Compose para facilitar el desarrollo y las pruebas en un entorno local.
    *   Se implementará un pipeline de CI/CD (Integración Continua / Entrega Continua) utilizando AWS CodePipeline, CodeBuild y CodeDeploy (o herramientas equivalentes) para automatizar el despliegue en AWS.

*   **Escalabilidad y Aislamiento de Ejecuciones:**  (Ya cubierto en el diseño, pero lo reitero)
    *   Se utilizará una cola de mensajes (SQS) para gestionar las solicitudes de ejecución de código de forma asíncrona.
    *   Los workers (contenedores Docker) consumirán los mensajes de la cola y ejecutarán el código en entornos aislados.
    *   Se configurarán límites de recursos (CPU, memoria, tiempo de ejecución) para cada contenedor Docker, para evitar que un proceso consuma todos los recursos del servidor.

* **Versionado de la API:** Se utiliza un esquema de versionado claro (`/api/v1/`) para permitir futuras actualizaciones de la API sin romper la compatibilidad con clientes existentes.

Este documento de diseño de la API REST para Argus es completo y detallado, cubriendo todos los aspectos importantes, desde los endpoints y los formatos de request/response hasta la seguridad, el manejo de errores, las pruebas y el despliegue.  Se han incorporado todas las mejoras y sugerencias previas. Está listo para ser usado como referencia durante el desarrollo.
