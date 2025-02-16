# Diseño de APIs (REST)

## Descripción
La API REST permitirá la ejecución de código en múltiples lenguajes, midiendo su rendimiento y almacenando los resultados en PostgreSQL. 
Se seguirán principios de diseño RESTful para garantizar escalabilidad y facilidad de uso.

## Endpoints Principales
<div>
  <img align="center" src="https://drive.google.com/uc?export=view&id=17vDBvJYVbbl4OjQqyQENpjidVVvEgeqc">
</div>

## Definición de Endpoints
### Ejecución de código
  Endpoint: ```POST/execute```
  - Descripción: Ejecuta código en un lenguaje determinado y mide su rendimiento.
  - Request body:
    ```
    {
      "language": "python",
      "code": "print('Hola Mundo')"
    }
    ```
  - Response:
    ```
    {
      "execution_time_ms": 120.5,
      "memory_usage_kb": 2048,
      "complexity_time": "O(n)",
      "complexity_space": "O(1)"
    }
    ```
### Obtener el Historial de Ejecuciones
  Endpoint: ```GET /history```
  - Descripción:
  - Response body:
    ```
    [
        {
            "id": 1,
            "language": "python",
            "execution_time_ms": 120.5,
            "created_at": "2025-02-16T10:00:00Z"
        },
        {
            "id": 2,
            "language": "java",
            "execution_time_ms": 200.1,
            "created_at": "2025-02-15T14:30:00Z"
        }
    ]
    ```
### Obtener Detalles de una Ejecución
  Endpoint: ```GET/history/{id}```
  - Descripción: Obtiene detalles completos de una ejecución específica.
  - Response body:
    ```
    {
      "id": 1,
      "language": "python",
      "code": "print('Hola Mundo')",
      "execution_time_ms": 120.5,
      "memory_usage_kb": 2048,
      "complexity_time": "O(n)",
      "complexity_space": "O(1)",
      "created_at": "2025-02-16T10:00:00Z"
    }
    ```
### Obtener Lenguajes Soportados
  Endpoint: ```GET/languages```
  - Descripción: Retorna la lista de lenguajes soportados.
  - Response:
    ```
    {
      "languages": ["python", "java", "c++", "javascript", "go"]
    }
    ```

## Seguridad y Auth
Para proteger los endpoints y garantizar un acceso seguro, se implementará un sistema de autenticación basado en JSON Web Tokens (JWT).

### Registro y Autenticación de Usuarios
  Endpoint: ```POST/register```
  - Descripción: Crea un nuevo usuario.
  - Request:
    ```
    {
      "username": "usuario123",
      "email": "usuario@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```
    {
      "message": "Usuario registrado con éxito."
    }
    ```
  Endpoint: ```POST/login```
  - Descripción: Autentica al usuario y genera un token JWT.
  - Request:
    ```
    {
      "email": "usuario@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Protección de Endpoints

- Los endpoints ```/execute``` y ```/history``` requerirán autenticación mediante el header ```Authorization: Bearer <token>```.
- Si el token es inválido o ha expirado, se retornará un error ```HTTP 401 Unauthorized```.

### Seguridad Adicional

- Se usará ***bcrypt*** para almacenar contraseñas de forma segura.

- Configuración de ***roles y permisos*** en futuras versiones para diferenciar accesos de usuarios regulares y administradores.

- Implementación de ***rate limiting*** para prevenir abusos en la ejecución de código. (Oportunidad de escalabilidad)

- Se implementará autenticación basada en tokens JWT para restringir el acceso a los endpoints de historial y ejecución.

## Consideraciones Adicionales

### Rate Limiting y Protección contra Abusos

- Implementación de un límite en la cantidad de ejecuciones por usuario en un tiempo determinado para evitar abusos.

- Uso de ***Go Rate Limiter*** para gestionar las restricciones.

- Protección contra ataques de denegación de servicio (DDoS) mediante firewall y bloqueo de IPs sospechosas.

### Manejo de Errores y Logs

- Implementación de logs centralizados con ***Zap*** en Go.

- Creación de un sistema de monitoreo para detectar anomalías en el tiempo de ejecución.

- Unificación de respuestas de error con códigos HTTP para mejor debugging.

### Testing y Validación

- Creación de Unit Testing con Go testing framework.

- Pruebas de integración para validar el correcto funcionamiento de la API con PostgreSQL.

- Evaluación de la precisión de los tiempos de ejecución y la correcta medición de la complejidad.

### Estrategia de Despliegue y Dockerización

- Creación de un Dockerfile optimizado para reducir el tiempo de construcción y mejorar la portabilidad.

- Uso de docker-compose para manejar la infraestructura local durante el desarrollo.

- Implementación de un pipeline CI/CD con Azure DevOps para deploys automatizados.

### Escalabilidad y Aislamiento de Ejecuciones

- Implementación de un sistema de colas con RabbitMQ o Kafka (aún no definido) para gestionar múltiples ejecuciones concurrentes.

- Aislamiento de ejecuciones en contenedores independientes para evitar interferencias entre códigos de distintos usuarios.

- Medidas de seguridad como ejecución en entornos sandboxed para prevenir código malicioso.
