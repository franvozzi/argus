# Diseño de la API REST para Argus (MVP Monolítico)

Este documento describe el diseño de la API REST para la versión MVP (Minimum Viable Product) de Argus. La API permite a los usuarios ejecutar código en varios lenguajes, obtener métricas de rendimiento y acceder a su historial de ejecuciones.  Se sigue un enfoque RESTful, con una arquitectura inicialmente monolítica (backend en Node.js/Express.js) pero preparada para una futura migración a microservicios.

## 1. Consideraciones Generales

*   **Tecnología:** La API se implementará con Node.js y el framework Express.js.
*   **Formato de Datos:** Se utilizará JSON (JavaScript Object Notation) para todas las solicitudes y respuestas.
*   **Versionado:** La API se versionará utilizando un prefijo en la URL (`/api/v1/`). Esto permite realizar cambios en el futuro sin afectar a los clientes existentes.
*   **Códigos de Estado HTTP:** Se utilizarán códigos de estado HTTP estándar para indicar el resultado de cada solicitud (éxito, error, etc.).
*   **Autenticación:** Se utilizará JWT (JSON Web Token) para la autenticación y autorización.
*   **Rate Limiting:** Se implementará *rate limiting* para prevenir abusos y ataques de denegación de servicio.
*   **Documentación:** Se utilizará Swagger/OpenAPI para generar documentación interactiva de la API.

## 2. Endpoints

La API de Argus tendrá los siguientes endpoints principales:

### 2.1. Autenticación (`/api/v1/auth`)

*   **`POST /api/v1/auth/register`**:  Registra un nuevo usuario.

    *   **Request Body:**

        ```json
        {
          "username": "usuario123",  // Nombre de usuario (único)
          "email": "usuario@example.com", // Correo electrónico (único)
          "password": "contraseña123"   // Contraseña (se hasheará con bcrypt)
        }
        ```

    *   **Response (Éxito - 201 Created):**

        ```json
        {
          "message": "Usuario registrado con éxito.",
          "user_id": 123 // ID del nuevo usuario
        }
        ```

    *   **Response (Error - 400 Bad Request):**  Si los datos de entrada son inválidos (por ejemplo, formato de correo electrónico incorrecto, contraseña demasiado corta, etc.).

        ```json
        {
          "error": "Datos de entrada inválidos.",
          "details": [
            {
              "field": "email",
              "message": "El correo electrónico no es válido."
            },
            {
                "field": "password",
                "message": "La contraseña debe tener al menos 6 caracteres"
            }
          ]
        }
        ```

    *   **Response (Error - 409 Conflict):** Si el nombre de usuario o el correo electrónico ya están registrados.

        ```json
        {
          "error": "El correo electrónico ya está registrado."
        }
        ```
     *   **Response (Error - 500 Internal Server Error):** Si ocurre un error interno del servidor.

        ```json
        {
          "error": "Error interno del servidor."
        }
        ```

*   **`POST /api/v1/auth/login`**:  Inicia sesión para un usuario existente.

    *   **Request Body:**

        ```json
        {
          "email": "usuario@example.com",
          "password": "contraseña123"
        }
        ```

    *   **Response (Éxito - 200 OK):**

        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // Token JWT
        }
        ```

    *   **Response (Error - 400 Bad Request):**  Si los datos de entrada son inválidos.

        ```json
        {
           "error": "Datos de entrada inválidos."
        }
        ```

    *   **Response (Error - 401 Unauthorized):**  Si las credenciales son incorrectas.

        ```json
        {
          "error": "Credenciales inválidas."
        }
        ```
      *   **Response (Error - 500 Internal Server Error):** Si ocurre un error interno del servidor.

        ```json
        {
          "error": "Error interno del servidor."
        }
        ```

### 2.2. Ejecución de Código (`/api/v1/execute`)

*   **`POST /api/v1/execute`**:  Ejecuta un bloque de código en un lenguaje específico.

    *   **Request Body:**

        ```json
        {
          "language": "javascript",  // Lenguaje de programación (ej: "javascript", "python")
          "code": "console.log('Hola, mundo!');", // Código fuente a ejecutar
          "input": "datos de entrada"   // Input opcional para el código
        }
        ```

    *   **Headers:**
        *   `Authorization: Bearer <token JWT>` (Opcional, si el usuario está autenticado).  Si se proporciona el token, la ejecución se asociará al usuario.

    *   **Response (Éxito - 202 Accepted):**  La solicitud se ha aceptado para su procesamiento (ejecución asíncrona).

        ```json
        {
          "message": "Solicitud de ejecución recibida.",
          "executionId": "a1b2c3d4-e5f6-7890-1234-567890abcdef" // ID único de la ejecución
        }
        ```

    *   **Response (Error - 400 Bad Request):**  Si los datos de entrada son inválidos (lenguaje no soportado, código vacío, etc.).

      ```json
        {
          "error": "Datos de entrada inválidos",
          "details": [
            {
              "field": "language",
              "message": "Lenguaje no soportado."
            }
          ]
        }
      ```

    *   **Response (Error - 401 Unauthorized):**  Si se requiere autenticación y el token JWT no se proporciona o es inválido.

        ```json
        {
          "error": "No autorizado."
        }
        ```
     *   **Response (Error - 500 Internal Server Error):** Si ocurre un error interno del servidor.

        ```json
        {
          "error": "Error interno del servidor."
        }
        ```

### 2.3. Historial de Ejecuciones (`/api/v1/history`)

*   **`GET /api/v1/history`**:  Obtiene el historial de ejecuciones del usuario autenticado.

    *   **Headers:**
        *   `Authorization: Bearer <token JWT>` (Obligatorio).

    *   **Response (Éxito - 200 OK):**

        ```json
        [
          {
            "id": 1,
            "language": "javascript",
            "execution_time_ms": 12.5,
            "created_at": "2024-03-08T10:00:00Z"
          },
          {
            "id": 2,
            "language": "python",
            "execution_time_ms": 25.8,
            "created_at": "2024-03-08T09:00:00Z"
          }
        ]
        ```

    *   **Response (Error - 401 Unauthorized):**  Si el token JWT no se proporciona o es inválido.

    *   **Response (Error - 500 Internal Server Error):**

*   **`GET /api/v1/history/{id}`**:  Obtiene los detalles de una ejecución específica.

    *   **Headers:**
        *   `Authorization: Bearer <token JWT>` (Obligatorio).

    *   **Path Parameter:**
        *   `id`: El ID de la ejecución.

    *   **Response (Éxito - 200 OK):**

        ```json
        {
          "id": 1,
          "user_id": 123,
          "language": "javascript",
          "code": "console.log('Hola, mundo!');",
          "input": null,
          "execution_time_ms": 12.5,
          "memory_usage_kb": 512,
          "complexity_time": "O(1)",
          "complexity_space": "O(1)",
          "output": "Hola, mundo!\n",
          "error": null,
          "created_at": "2024-03-08T10:00:00Z"
        }
        ```

    *   **Response (Error - 401 Unauthorized):**  Si el token JWT no se proporciona o es inválido.
    *   **Response (Error - 403 Forbidden):** Si el usuario no tiene permiso para acceder a la ejecución (no es el propietario).
    *   **Response (Error - 404 Not Found):**  Si la ejecución con el ID especificado no existe.
    *   **Response (Error - 500 Internal Server Error):**

### 2.4. Lenguajes Soportados (`/api/v1/languages`)
*   **`GET /api/v1/languages`**:  Obtiene la lista de lenguajes de programación soportados.

    *   **Response (Éxito - 200 OK):**

        ```json
        {
          "languages": ["javascript", "python"]
        }
        ```
     *   **Response (Error - 500 Internal Server Error):**

## 3. Manejo de Errores

La API utilizará códigos de estado HTTP estándar para indicar el resultado de cada solicitud.  Además, las respuestas de error incluirán un cuerpo JSON con información adicional sobre el error.

*   **400 Bad Request:**  Solicitud inválida (datos de entrada incorrectos, formato incorrecto, etc.).
*   **401 Unauthorized:**  No autenticado (token JWT faltante o inválido).
*   **403 Forbidden:**  Autenticado, pero sin permisos para acceder al recurso.
*   **404 Not Found:**  Recurso no encontrado (por ejemplo, una ejecución con un ID que no existe).
*   **409 Conflict:**  Conflicto (por ejemplo, al intentar registrar un usuario con un email ya existente).
*   **429 Too Many Requests:**  Se ha excedido el límite de solicitudes (rate limiting).
*   **500 Internal Server Error:**  Error interno del servidor.

## 4. Seguridad

*   **Autenticación:** JWT (JSON Web Token).
*   **Hashing de Contraseñas:** bcrypt.
*   **Validación de Entrada:**  Validación rigurosa de todos los datos de entrada.
*   **Rate Limiting:**  Limitación de la tasa de solicitudes.
*   **HTTPS:**  Todas las comunicaciones a través de HTTPS.

## 5. Documentación (Swagger/OpenAPI)

Se utilizará Swagger/OpenAPI para generar documentación interactiva de la API.  La documentación estará disponible en un endpoint específico (por ejemplo, `/api/v1/docs`).

## 6. Consideraciones Adicionales
* **Formato de los datos de entrada (input):** Se deberá definir un formato para los datos de entrada, o permitir un texto plano.
* **Testeo:** Se realizarán pruebas exhaustivas.

Este documento proporciona una descripción detallada del diseño de la API REST para Argus, incluyendo los endpoints, los formatos de las solicitudes y respuestas, los códigos de estado HTTP, la autenticación, el manejo de errores y la documentación. Este diseño es consistente con los principios RESTful y está preparado para una futura evolución de la arquitectura.
