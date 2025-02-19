## Roadmap de Desarrollo

**Leyenda:**

*   **Estimación de Tiempo:**
    *   `[T1]` (Trivial - menos de 1 hora)
    *   `[S]` (Small - 1-4 horas)
    *   `[M]` (Medium - 4-8 horas)
    *   `[L]` (Large - 1-2 días)
    *   `[XL]` (Extra Large - 3-5 días)
    *   `[XXL]` (Épica - más de 5 días.  Debería dividirse en subtareas).
*   **Prioridad:**
    *   `[P1]` (Crítica - Debe hacerse primero)
    *   `[P2]` (Alta - Importante, pero puede esperar si hay tareas P1)
    *   `[P3]` (Media - Se puede hacer cuando las tareas P1 y P2 estén completas)
    *   `[P4]` (Baja - Puede posponerse si es necesario)

**Hitos (Milestones):**

*   **Hito 1:** Backend Básico con Autenticación
*   **Hito 2:** Endpoint de Ejecución y Comunicación con SQS
*   **Hito 3:** Worker Básico (JavaScript)
*   **Hito 4:** Worker Completo (JavaScript)
*   **Hito 5:** Backend: Recepción de Resultados y Endpoints Adicionales
*   **Hito 6:** Frontend Básico
*   **Hito 7:** MVP (Minimum Viable Product)
*   **Hito 8:** Pruebas Completas
* **Hito 9:** Despliegue Inicial

**Fase 1: Configuración Inicial y Conexión a la Base de Datos**

*   **[Tarea 1.1] Crear Estructura del Proyecto** `[S]` `[P1]`
    *   **Descripción:** Crear la estructura de directorios y archivos base.
    *   **Entregables:** Estructura de directorios, `package.json`, archivos base.
    *   **Dependencias:** Ninguna.

*   **[Tarea 1.2] Instalar Dependencias** `[S]` `[P1]`
    *   **Descripción:** Instalar dependencias de desarrollo y producción.
    *   **Entregables:** `package.json` actualizado, `node_modules` creada.
    *   **Dependencias:** Tarea 1.1.

*   **[Tarea 1.3] Configurar TypeScript** `[S]` `[P1]`
    *   **Descripción:** Crear y configurar `tsconfig.json`.
    *   **Entregables:** `tsconfig.json` configurado.
    *   **Dependencias:** Tarea 1.2.

*   **[Tarea 1.4] Configurar ESLint y Prettier** `[S]` `[P1]`
    *   **Descripción:** Configurar ESLint y Prettier.
    *   **Entregables:** `.eslintrc.js` y `.prettierrc.js` configurados.
    *   **Dependencias:** Tarea 1.2.

*   **[Tarea 1.5] Crear Punto de Entrada (`app.ts`)** `[S]` `[P1]`
    *   **Descripción:** Crear `app.ts`, inicializar Express, endpoint básico (`/`).
    *   **Entregables:** `app.ts` creado y funcional.
    *   **Dependencias:** Tarea 1.2.

*   **[Tarea 1.6] Configurar Scripts en `package.json`** `[S]` `[P1]`
    *   **Descripción:** Añadir scripts para tareas comunes.
    *   **Entregables:** Scripts en `package.json`.
    *   **Dependencias:** Tarea 1.1.

*   **[Tarea 1.7] Configurar Conexión a la Base de Datos (Sequelize)** `[M]` `[P1]`
    *   **Descripción:** Crear `src/config/database.ts`, configurar conexión, crear instancia de Sequelize.
    *   **Entregables:** `src/config/database.ts` configurado, conexión probada.
    *   **Dependencias:** Tarea 1.2.

*   **[Tarea 1.8] Definir Modelos de Datos (Sequelize)** `[L]` `[P1]`
    *   **Descripción:** Crear modelos Sequelize para `usuarios` y `ejecuciones`.
    *   **Entregables:** Archivos de modelos creados y configurados.
    *   **Dependencias:** Tarea 1.7.

*   **[Tarea 1.9] Crear y Ejecutar Migraciones** `[M]` `[P1]`
    *   **Descripción:** Crear y ejecutar migraciones de Sequelize.
    *   **Entregables:** Tablas creadas en la base de datos.
    *   **Dependencias:** Tarea 1.8.

*   **[Tarea 1.10] Probar Conexión y Operaciones CRUD** `[M]` `[P1]`
    *   **Descripción:** Crear script para probar conexión y CRUD.
    *   **Entregables:** Script de prueba creado y ejecutado.
    *   **Dependencias:** Tarea 1.9.

**Fase 2: Implementación de la Autenticación**  **(Hito 1)**

*   **[Tarea 2.1] Crear Controlador de Autenticación** `[S]` `[P1]`
    *   **Descripción:** Crear `src/controllers/authController.ts`.
    *   **Entregables:** Archivo `src/controllers/authController.ts` creado.
    *   **Dependencias:** Tarea 1.1.

*   **[Tarea 2.2] Implementar Lógica de Registro (`register`)** `[L]` `[P1]`
    *   **Descripción:** Implementar función `register`.
    *   **Entregables:** Función `register` implementada.
    *   **Dependencias:** Tarea 2.1, Tarea 1.8.

*   **[Tarea 2.3] Implementar Lógica de Inicio de Sesión (`login`)** `[L]` `[P1]`
    *   **Descripción:** Implementar función `login`.
    *   **Entregables:** Función `login` implementada.
    *   **Dependencias:** Tarea 2.1, Tarea 1.8.

*   **[Tarea 2.4] Crear Middleware de Autenticación** `[M]` `[P1]`
    *   **Descripción:** Crear `src/middleware/authMiddleware.ts`.
    *   **Entregables:** Middleware `authMiddleware.ts` creado.
    *   **Dependencias:** Tarea 1.2.

*   **[Tarea 2.5] Definir Rutas de Autenticación** `[S]` `[P1]`
    *   **Descripción:** Crear `src/routes/authRoutes.ts`.
    *   **Entregables:** Archivo `src/routes/authRoutes.ts` creado.
    *   **Dependencias:** Tarea 2.1.

*   **[Tarea 2.6] Integrar Rutas en `app.ts`** `[S]` `[P1]`
    *   **Descripción:** Importar y usar rutas de autenticación.
    *   **Entregables:** Rutas integradas.
    *   **Dependencias:** Tarea 2.5, Tarea 1.5

*   **[Tarea 2.7] Probar la Autenticación** `[M]` `[P1]`
    *   **Descripción:** Probar endpoints de registro e inicio de sesión.
    *   **Entregables:** Endpoints probados.
    *   **Dependencias:** Tareas 2.2, 2.3, 2.6.

**Fase 3: Endpoint de Ejecución y Comunicación con SQS** **(Hito 2)**

*   **[Tarea 3.1] Crear Controlador de Ejecuciones** `[S]` `[P1]`
    *   **Descripción:** Crear `src/controllers/ejecucionController.ts`.
    *   **Entregables:** Archivo creado.
    *   **Dependencias:** Tarea 1.1

*   **[Tarea 3.2] Implementar Validación de Entrada (`ejecutarCodigo`)** `[M]` `[P1]`
    *   **Descripción:** Validar datos de entrada.
    *   **Entregables:** Validación implementada.
    *   **Dependencias:** Tarea 3.1

*   **[Tarea 3.3] Implementar Comunicación con SQS (`ejecutarCodigo`)** `[L]` `[P1]`
    *   **Descripción:** Implementar envío de mensajes a SQS.
    *   **Entregables:** Comunicación con SQS implementada.
    *   **Dependencias:** Tarea 3.1, 3.2

*   **[Tarea 3.4] Crear Ruta para la Ejecución** `[S]` `[P1]`
    *   **Descripción:** Crear `src/routes/ejecucionRoutes.ts`.
    *   **Entregables:** Archivo creado.
    *   **Dependencias:** Tarea 3.1, Tarea 2.4.

*   **[Tarea 3.5] Implementar `ejecutarCodigo` (Integración)** `[M]` `[P1]`
      *   **Descripción:** Combinar lógica.
      *   **Entregables:** Controlador completo.
      *  **Dependencias:** Tareas 3.2, 3.3.

*    **[Tarea 3.6] Integrar Rutas en `app.ts`** `[S]` `[P1]`
        * **Descripción:** Importar `ejecucionRoutes`.
        * **Entregable:** Ruta funcional.
        * **Dependencias:** Tarea 3.4, Tarea 1.5.

*   **[Tarea 3.7] Probar el Endpoint de Ejecución** `[M]` `[P1]`
    *   **Descripción:** Probar endpoint con Postman.
    *   **Entregables:** Endpoint probado.
    *   **Dependencias:** Tareas 3.5, 3.6.

**Fase 4: Implementación del Worker Básico (Node.js)** **(Hito 3)**

*   **[Tarea 4.1] Crear Directorio para el Worker** `[T1]` `[P1]`
    *   **Descripción:** Crear directorio `argus-worker-js`.
    *   **Entregables:** Directorio creado.
    *   **Dependencias:** Ninguna.

*   **[Tarea 4.2] Inicializar Proyecto Node.js (Worker)** `[S]` `[P1]`
    *   **Descripción:** `npm init -y`.
    *   **Entregables:** `package.json` creado.
    *   **Dependencias:** Tarea 4.1.

*   **[Tarea 4.3] Instalar Dependencias del Worker** `[S]` `[P1]`
    *   **Descripción:** Instalar `aws-sdk`, `typescript`, `@types/node`.
    *   **Entregables:** Dependencias instaladas.
    *   **Dependencias:** Tarea 4.2.

*   **[Tarea 4.4] Crear Script del Worker** `[XL]` `[P1]`
    *   **Descripción:** Crear `worker.ts` o `worker.js`.
    *   **Entregables:** Script del worker creado.
    *   **Dependencias:** Tarea 4.3.

*   **[Tarea 4.5] Crear `Dockerfile` para el Worker** `[M]` `[P1]`
    *   **Descripción:** Crear `Dockerfile`.
    *   **Entregables:** `Dockerfile` creado.
    *   **Dependencias:** Tarea 4.4.

*   **[Tarea 4.6] Probar el Worker (Básico)** `[M]` `[P1]`
    *   **Descripción:** Construir y ejecutar imagen Docker, probar.
    *   **Entregables:** Worker básico funcionando.
    *   **Dependencias:** Tareas 4.4, 4.5.

**Fase 5: Implementación Completa del Worker (Node.js/Python)** **(Hito 4)**

*   **[Tarea 5.1] Implementar Ejecución de Código (Worker)** `[XL]` `[P1]`
    *   **Descripción:** Implementar ejecución segura con `child_process.exec` o `subprocess.run`.
    *   **Entregables:** Ejecución de código implementada.
    *   **Dependencias:** Tarea 4.4.
    * **Subtareas:**
        * [Tarea 5.1.1] Crear archivos temporales para código e input `[S]`
        * [Tarea 5.1.2] Implementar ejecución con `child_process.exec` (Node.js) o `subprocess.run` (Python) `[M]`
        * [Tarea 5.1.3] Capturar stdout y stderr `[S]`
        * [Tarea 5.1.4] Establecer timeout `[S]`
        * [Tarea 5.1.5] Manejar errores de ejecución `[M]`

*   **[Tarea 5.2] Implementar Medición de Tiempo y Memoria (Worker)** `[L]` `[P1]`
    *   **Descripción:** Usar `performance.now()` y `process.memoryUsage().heapUsed` (Node.js) o `time.perf_counter()`, `tracemalloc`/`memory_profiler` (Python).
    *   **Entregables:** Medición implementada.
    *   **Dependencias:** Tarea 5.1.
     * **Subtareas:**
        * [Tarea 5.2.1] Implementar medición de tiempo `[S]`
        * [Tarea 5.2.2] Implementar medición de memoria (muestreo periódico) `[M]`
        * [Tarea 5.2.3] Registrar pico máximo de memoria `[S]`

*   **[Tarea 5.3] Implementar Análisis Estático de Complejidad (Worker)** `[XXL]` `[P2]`
    *   **Descripción:** Usar `esprima` (JS) o `ast` (Python) para parsear el AST y analizar la complejidad.
    *   **Entregables:** Análisis estático implementado.
    *   **Dependencias:** Tarea 5.1.
    *   **Subtareas:**
        *   [Tarea 5.3.1] Instalar y configurar `esprima` (JS) o `ast` (Python). `[S]`
        *   [Tarea 5.3.2] Crear función para parsear el código y obtener el AST. `[M]`
        *   [Tarea 5.3.3] Crear función para recorrer el AST e identificar estructuras de control (bucles, recursión). `[L]`
        *   [Tarea 5.3.4] Crear función para analizar llamadas a funciones y su complejidad. `[L]`
        *   [Tarea 5.3.5] Crear función para generar la estimación de la complejidad (Big O). `[L]`
        *   [Tarea 5.3.6] Crear base de datos o archivo de configuración con la complejidad de funciones comunes (opcional). `[M]`

*   **[Tarea 5.4] Implementar Análisis Dinámico de Complejidad (Worker)** `[XXL]` `[P2]`
    *   **Descripción:** Instrumentar el código y relacionar contadores con el input.
    *   **Entregables:** Análisis dinámico implementado.
    *   **Dependencias:** Tarea 5.1, Tarea 5.3.
     * **Subtareas:**
        * [Tarea 5.4.1] Crear función para instrumentar el código (modificar el AST). `[XL]`
        * [Tarea 5.4.2] Ejecutar código instrumentado. `[S]`
        * [Tarea 5.4.3] Obtener valores de los contadores. `[S]`
        * [Tarea 5.4.4] Crear función para inferir la complejidad a partir de los contadores y el input. `[L]`

*   **[Tarea 5.5] Enviar Resultados al Backend (Worker)** `[M]` `[P1]`
    *   **Descripción:** Enviar resultados a través de SQS (recomendado) o API.
    *   **Entregables:** Envío de resultados implementado.
    *   **Dependencias:** Tareas 5.1, 5.2, 5.3, 5.4.

*   **[Tarea 5.6] Manejo de Errores Completo (Worker)** `[M]` `[P1]`
    *   **Descripción:** Capturar excepciones, registrar errores, enviar mensajes de error.
    *   **Entregables:** Manejo de errores implementado.
    *   **Dependencias:** Tareas 5.1, 5.5.

*   **[Tarea 5.7] Crear Workers para Diferentes Lenguajes** `[XXL]` `[P3]`
    *   **Descripción:** Repetir las tareas 5.1 a 5.6 para cada lenguaje de programación adicional que se desee soportar (Python, Java, C++, Go, etc.).  Cada worker debe:
        *   Tener su propio directorio (ej: `argus-worker-python`, `argus-worker-java`).
        *   Tener su propio `Dockerfile`.
        *   Tener su propia lógica de ejecución, medición y análisis, adaptada al lenguaje específico.
        *   Ser capaz de recibir mensajes de la misma cola SQS que el worker de JavaScript (o, si se prefiere, se puede usar una cola SQS separada para cada lenguaje).
        *   Enviar los resultados al backend de la misma forma que el worker de JavaScript (a través de la cola de resultados o directamente a la API).
    *   **Entregables:** Workers para cada lenguaje soportado (además de JavaScript), completamente funcionales e independientes.
    *   **Dependencias:** Tareas 5.1 a 5.6 completadas (para el worker de JavaScript, que sirve como base).
    * **Subtareas (Por cada lenguaje adicional):**
        * [Tarea 5.7.X.1] Crear directorio para el worker (ej: `argus-worker-python`) `[T1]`
        * [Tarea 5.7.X.2] Inicializar proyecto (ej: `npm init -y` si es Node, o crear estructura de proyecto Python) `[S]`
        * [Tarea 5.7.X.3] Instalar dependencias específicas del lenguaje (ej: `aws-sdk`, `tracemalloc`, `ast`, etc. para Python) `[S]`
        * [Tarea 5.7.X.4] Crear script del worker (ej: `worker.py`)  `[XL]`
        * [Tarea 5.7.X.5] Crear `Dockerfile` para el worker `[M]`
        * [Tarea 5.7.X.6] Implementar ejecución del código, medición, análisis estático y dinámico, envío de resultados y manejo de errores (adaptando las tareas 5.1 a 5.6 al lenguaje)  `[XXL]`
        * [Tarea 5.7.X.7] Probar el worker del lenguaje `[M]`

* **[Tarea 5.8] Probar Workers Completos** `[L]` `[P1]`
  * **Descripción**: Probar *exhaustivamente* todos los workers (todos los lenguajes implementados). Esto incluye:
      *  Probar con diferentes tipos de código (bucles, recursión, funciones con diferente complejidad).
      * Probar con diferentes tamaños de input.
      * Probar casos de error (código inválido, timeouts, errores de memoria).
      * Verificar que los resultados (tiempo, memoria, complejidad, output, error) sean correctos.
      *  Verificar que los workers manejen correctamente los errores y envíen mensajes de error al backend.
  * **Entregables**: Workers funcionando y probados exhaustivamente, con alta cobertura de pruebas.
  * **Dependencias:** Tareas 5.1 a 5.7.

**Fase 6: Otros Endpoints** **(Hito 5)**

*   **[Tarea 6.1] Implementar `GET /api/v1/history`** `[L]` `[P2]`
    *   **Descripción:** Implementar el endpoint para obtener el historial de ejecuciones de un usuario.  Esto incluye:
        *   Crear el controlador (`src/controllers/ejecucionController.ts`) y la ruta (`src/routes/ejecucionRoutes.ts`) correspondientes.
        *   Utilizar el middleware de autenticación (`authenticateJWT`) para obtener el `userId` del token JWT.
        *   Consultar la base de datos (tabla `ejecuciones`, usando el modelo `Ejecucion` de Sequelize) para obtener todas las ejecuciones asociadas al `userId`.
        *   Ordenar los resultados por fecha de creación (`created_at`) de forma descendente (las ejecuciones más recientes primero).
        *   Responder con un array de objetos JSON, donde cada objeto representa una ejecución y contiene los campos relevantes (ID, lenguaje, tiempo de ejecución, fecha de creación, etc.).  *No* incluir el código fuente ni el input en la respuesta de este endpoint (para eso está el endpoint de detalles).
        * Manejar el caso en que el usuario no tenga ejecuciones en su historial (responder con un array vacío).
    *   **Entregables:** Endpoint `/api/v1/history` implementado y funcionando correctamente.
    *   **Dependencias:** Tarea 2.4 (middleware de autenticación), Tarea 1.8 (modelos de Sequelize).

*   **[Tarea 6.2] Implementar `GET /api/v1/history/{id}`** `[L]` `[P2]`
    *   **Descripción:** Implementar el endpoint para obtener los detalles de una ejecución específica. Esto incluye:
        *   Crear el controlador y la ruta correspondientes.
        *   Utilizar el middleware de autenticación (`authenticateJWT`).
        *   Obtener el `id` de la ejecución de los parámetros de la ruta (`req.params.id`).
        *   Consultar la base de datos (tabla `ejecuciones`) para obtener la ejecución con el `id` especificado.
        *   Verificar que la ejecución exista.  Si no existe, retornar un error 404 Not Found.
        *   Verificar que la ejecución pertenezca al usuario autenticado (comparar el `userId` del token JWT con el `user_id` de la ejecución).  Si no pertenece al usuario, retornar un error 403 Forbidden (o 404 Not Found, para no revelar información sobre la existencia de ejecuciones de otros usuarios).
        *   Responder con un objeto JSON que contenga *todos* los detalles de la ejecución (incluyendo el código fuente, el input, la salida, el error, etc.).
    *   **Entregables:** Endpoint `/api/v1/history/{id}` implementado y funcionando correctamente.
    *   **Dependencias:** Tarea 2.4 (middleware de autenticación), Tarea 1.8 (modelos de Sequelize).

*   **[Tarea 6.3] Implementar `GET /api/v1/languages`** `[S]` `[P3]`
    *   **Descripción:** Implementar el endpoint para obtener la lista de lenguajes soportados.  Esto incluye:
        *   Crear el controlador y la ruta correspondientes.
        *   Este endpoint *no* requiere autenticación.
        *   Definir un array con los lenguajes soportados (por ejemplo, `['javascript', 'python']`).  Por ahora, este array puede estar hardcodeado en el controlador.  En el futuro, se podría obtener de una base de datos o de un archivo de configuración.
        *   Responder con un objeto JSON que contenga la lista de lenguajes (por ejemplo, `{ "languages": ["javascript", "python"] }`).
    *   **Entregables:** Endpoint `/api/v1/languages` implementado y funcionando correctamente.
    *   **Dependencias:** Ninguna (es un endpoint muy simple).

**Fase 7: Frontend (Next.js)**

*   **[Tarea 7.1] Configurar Proyecto Next.js** `[M]` `[P2]`
    *   **Descripción:** Crear un nuevo proyecto Next.js utilizando `npx create-next-app argus-frontend` (o `yarn create next-app argus-frontend`). Instalar las dependencias necesarias, como `axios` (para las peticiones HTTP), `react-ace` o `CodeMirror` (para el editor de código), y `recharts` o `Chart.js` (para las gráficas, si se utilizan). También, si se elige una librería de manejo de estado diferente al Context API, instalarla.
    *   **Entregables:** Proyecto Next.js inicializado y configurado con las dependencias básicas instaladas.

*   **[Tarea 7.2] Crear Componentes de la UI** `[XL]` `[P2]`
    *   **Descripción:** Crear los componentes React necesarios para la interfaz de usuario.  Por ahora, solo crear la estructura básica de los componentes (sin lógica ni estilos, solo el JSX).
    *   **Entregables:** Archivos de componentes React creados (`.tsx` o `.jsx`), con la estructura básica de cada componente.
    *   **Dependencias:** Tarea 7.1.
     * **Subtareas:**
        * [Tarea 7.2.1] Crear componente `CodeEditor` `[M]`
        * [Tarea 7.2.2] Crear componente `LanguageSelector` `[S]`
        * [Tarea 7.2.3] Crear componente `InputForm` `[S]`
        * [Tarea 7.2.4] Crear componente `ResultsTable` `[M]`
        * [Tarea 7.2.5] Crear componente `ResultsChart` (opcional) `[L]`
        * [Tarea 7.2.6] Crear componente `LoginForm` `[M]`
        * [Tarea 7.2.7] Crear componente `RegisterForm` `[M]`
        * [Tarea 7.2.8] Crear componente `HistoryTable` `[M]`
        * [Tarea 7.2.9] Crear componente `Layout` `[M]`
        * [Tarea 7.2.10] Crear componente `Loader` `[S]`

*   **[Tarea 7.3] Implementar Lógica de la UI** `[XXL]` `[P2]`
    *   **Descripción:** Implementar la lógica para interactuar con la API del backend y manejar el estado de la aplicación.
    *   **Entregables:** Lógica de la UI implementada y funcionando.
    *   **Dependencias:** Tarea 7.1, y tener el Backend funcional (Fases 1-3, 6).
      * **Subtareas:**
        * [Tarea 7.3.1] Crear funciones para peticiones a la API (executeCode, getHistory, etc.) `[L]`
        * [Tarea 7.3.2] Implementar manejo de estado (Context API, Zustand, o Redux) `[L]`
        * [Tarea 7.3.3] Implementar manejo de errores `[M]`
        * [Tarea 7.3.4] Implementar redirección después de login/registro `[S]`
        * [Tarea 7.3.5] Implementar lógica para mostrar/ocultar elementos según autenticación `[M]`

*   **[Tarea 7.4] Integrar Componentes y Lógica** `[XL]` `[P2]`
    *   **Descripción:** Integrar los componentes de la UI con la lógica de la aplicación y el manejo de estado. Esto implica conectar los componentes a las funciones que realizan las llamadas a la API, manejar los eventos de los componentes (clics, cambios en los campos de entrada, envío de formularios), mostrar los datos recibidos de la API en los componentes, actualizar el estado de la aplicación según sea necesario y gestionar la navegación entre las diferentes vistas/páginas de la aplicación. Se debe asegurar una correcta comunicación entre el Frontend y Backend, probando que los datos fluyan correctamente. Se verificará la correcta visualización de los datos en los componentes y se implementará la lógica para mostrar/ocultar elementos de la UI según el estado de autenticación del usuario (por ejemplo, mostrar los botones de "Login" y "Register" si el usuario no está autenticado, y mostrar el botón de "Logout" y el enlace al historial si el usuario está autenticado).
    *   **Subtareas:**
        * [Tarea 7.4.1] Conectar el componente `CodeEditor` con el estado y las funciones de envío de código.  Asegurarse de que el código ingresado por el usuario se guarda en el estado y se envía correctamente al backend. `[M]`
        * [Tarea 7.4.2] Conectar `LanguageSelector` con el estado y el `CodeEditor`.  Asegurarse de que el lenguaje seleccionado se guarda en el estado y se utiliza para resaltar la sintaxis del código correctamente. `[S]`
        * [Tarea 7.4.3] Conectar `InputForm` con el estado y las funciones de envío.  Asegurarse de que el input ingresado por el usuario se guarda en el estado y se envía correctamente al backend. `[S]`
        * [Tarea 7.4.4] Conectar `ResultsTable` con el estado para mostrar los resultados de la ejecución.  Asegurarse de que los datos recibidos del backend se muestran correctamente en la tabla. `[M]`
        * [Tarea 7.4.5] Conectar `ResultsChart` (si existe) con el estado para mostrar los resultados en forma de gráfica. `[M]`
        * [Tarea 7.4.6] Conectar `LoginForm` con las funciones de autenticación y el estado.  Asegurarse de que el email y la contraseña ingresados por el usuario se envían correctamente al backend, que el token JWT se guarda en el estado (o en una cookie) después de un inicio de sesión exitoso, y que el usuario es redirigido a la página principal. `[M]`
        * [Tarea 7.4.7] Conectar `RegisterForm` con las funciones de registro y el estado. Asegurarse de que los datos ingresados por el usuario se envían correctamente al backend, y que el usuario es redirigido a la página principal después de un registro exitoso. `[M]`
        * [Tarea 7.4.8] Conectar `HistoryTable` con las funciones de obtención del historial y el estado. Asegurarse de que el historial de ejecuciones del usuario se obtiene correctamente del backend y se muestra en la tabla. `[M]`
        * [Tarea 7.4.9] Implementar la navegación entre páginas (usando `next/link` o `next/router`). Asegurarse de que los enlaces y botones de la barra de navegación funcionan correctamente. `[M]`
        * [Tarea 7.4.10] Asegurar que los componentes muestren correctamente los datos del estado (loading, errores, datos).`[M]`
        * [Tarea 7.4.11] Implementar la lógica para mostrar/ocultar elementos según el estado de autenticación (usando renderizado condicional). `[M]`

    *   **Entregables:** Componentes integrados con la lógica y el estado, aplicación interactiva y conectada al backend.
    *   **Dependencias:** Tareas 7.2, 7.3.

*   **[Tarea 7.5] Estilizar la UI** `[XL]` `[P3]`
    *   **Descripción:** Añadir estilos CSS a la aplicación para que sea visualmente atractiva, profesional y fácil de usar. Se puede usar CSS puro, CSS Modules, Styled Components, o un framework CSS (Tailwind CSS, Material UI, Bootstrap, etc.). Se debe prestar especial atención a la responsividad (asegurarse de que la aplicación se vea bien en diferentes tamaños de pantalla, desde dispositivos móviles hasta pantallas de escritorio). Se debe crear una paleta de colores consistente, definir estilos para los componentes (botones, campos de entrada, tablas, etc.), y organizar el código CSS de forma modular y mantenible.
    * **Subtareas:**
        * [Tarea 7.5.1] Definir la paleta de colores y los estilos globales (fuentes, tamaños de texto, márgenes, paddings, etc.). `[S]`
        * [Tarea 7.5.2] Estilizar el componente `CodeEditor` (colores de fondo, colores de texto, colores de resaltado de sintaxis, bordes, etc.). `[M]`
        * [Tarea 7.5.3] Estilizar el componente `LanguageSelector` (estilos para el dropdown o los botones de selección). `[S]`
        * [Tarea 7.5.4] Estilizar el componente `InputForm` (estilos para el textarea). `[S]`
        * [Tarea 7.5.5] Estilizar el componente `ResultsTable` (estilos para la tabla, encabezados, celdas, etc.). `[M]`
        * [Tarea 7.5.6] Estilizar el componente `ResultsChart` (si existe) (estilos para la gráfica). `[M]`
        * [Tarea 7.5.7] Estilizar los componentes `LoginForm` y `RegisterForm` (estilos para los campos de entrada, botones, mensajes de error, etc.). `[M]`
        * [Tarea 7.5.8] Estilizar el componente `HistoryTable` (estilos para la tabla). `[M]`
        * [Tarea 7.5.9] Estilizar el componente `Layout` (estilos para la barra de navegación, el encabezado, el pie de página, etc.). `[M]`
        * [Tarea 7.5.10] Asegurar la responsividad de la aplicación (usando media queries o un sistema de grid responsive). `[L]`
    *   **Entregables:** Aplicación con estilos CSS aplicados, diseño responsive y atractivo.
    *   **Dependencias:** Tarea 7.2.

*   **[Tarea 7.6] Probar el Frontend** `[XL]` `[P3]`
    *   **Descripción:** Escribir pruebas unitarias y de integración para los componentes y la lógica del frontend. Se utilizará Jest y React Testing Library. Se deben probar: la renderización de los componentes (que se muestren correctamente con diferentes props y estados), la interacción de los componentes con la lógica (simulando las peticiones a la API con mocks), el manejo de errores (que se muestren los mensajes de error correctos), y la navegación (que los enlaces y botones funcionen correctamente). El objetivo es asegurar que los componentes se comporten como se espera y que la lógica del frontend funcione correctamente.
     * **Subtareas:**
        * [Tarea 7.6.1] Configurar Jest y React Testing Library. `[S]`
        * [Tarea 7.6.2] Escribir pruebas unitarias para los componentes (probar la renderización con diferentes props). `[L]`
        * [Tarea 7.6.3] Escribir pruebas de integración para la interacción entre componentes y lógica (usar mocks para simular la API). `[XL]`
        * [Tarea 7.6.4] Probar el manejo de errores (simular errores de la API y verificar que se muestran los mensajes correctos). `[M]`
        * [Tarea 7.6.5] Probar la navegación (simular clics en enlaces y botones y verificar que se navega a la página correcta). `[M]`
    *   **Entregables:** Pruebas unitarias y de integración para el frontend escritas y pasando, con una buena cobertura de código.
    *   **Dependencias:** Tareas 7.2, 7.3, 7.4

**Fase 8: Pruebas Exhaustivas y Despliegue**

*   **[Tarea 8.1] Pruebas Unitarias (Backend y Workers)** `[XXL]` `[P1]`
    *   **Descripción:** Escribir pruebas unitarias para *todas* las funciones y componentes del *backend* (controladores, servicios, modelos, middleware, utils) y de los *workers* (recepción de mensajes, ejecución de código, medición de tiempo y memoria, análisis de complejidad estático y dinámico, envío de resultados, manejo de errores). Usar Jest (o Mocha/Chai) para las pruebas. El objetivo es asegurar que cada unidad de código funcione correctamente de forma aislada. Se deben cubrir *todos* los casos de uso y los casos de error (validaciones, errores de base de datos, errores de red, errores de SQS, timeouts, código inválido, etc.). Se deben usar *mocks* para aislar las unidades de código que se están probando (por ejemplo, simular la conexión a la base de datos, la comunicación con SQS, las llamadas a funciones externas, etc.). Se debe verificar que las funciones retornen los valores esperados, que los errores se manejen correctamente, que las funciones modifiquen el estado de la aplicación (o de la base de datos, o de la cola de mensajes) como se espera, etc. Se debe buscar una alta cobertura de código (idealmente, cercana al 100%).
    *   **Entregables:** Pruebas unitarias completas y pasando para el backend y los workers, con alta cobertura de código.
    * **Dependencias:** Fases 1-6 completas.

*   **[Tarea 8.2] Pruebas de Integración (Backend y Workers)** `[XXL]` `[P1]`
    *   **Descripción:** Escribir pruebas de integración para verificar la correcta interacción entre los diferentes componentes del *backend* (controladores, servicios, modelos, base de datos, cola de mensajes) y entre el *backend* y los *workers*. Usar Jest y Supertest para las pruebas de integración de la API. Para las pruebas que involucren SQS, se puede usar una instancia local de SQS (como LocalStack) o mocks. Se deben probar los *flujos completos* de la aplicación, desde que se recibe una solicitud en la API hasta que se guarda el resultado en la base de datos (o hasta que se produce un error). Se debe verificar que:
        *   Las solicitudes a la API se procesan correctamente (se validan los datos de entrada, se autentica al usuario, se realizan las operaciones correctas en la base de datos, se encolan los mensajes en SQS, etc.).
        *   Los datos se guardan correctamente en la base de datos.
        *   Los mensajes se encolan y se desencolan correctamente en SQS.
        *   Los workers procesan los mensajes correctamente (ejecutan el código, miden el tiempo y la memoria, analizan la complejidad, envían los resultados).
        *   Los resultados se envían correctamente al backend (ya sea a través de la cola de resultados o directamente a la API).
        *   Los errores se manejan correctamente en todos los niveles (se propagan los errores, se muestran mensajes de error adecuados, etc.).
    *   **Entregables:** Pruebas de integración completas y pasando, cubriendo los flujos principales de la aplicación.
    * **Dependencias:** Fases 1-6 completas.

*   **[Tarea 8.3] Pruebas End-to-End (E2E)** `[XL]` `[P2]`
    *   **Descripción:** Escribir pruebas end-to-end (E2E) para simular el flujo completo de un usuario en la aplicación, desde que interactúa con el *frontend* (interfaz de usuario) hasta que se realizan las operaciones en el *backend*, los *workers* y la *base de datos*, y se muestran los resultados de vuelta en el frontend. Usar Cypress, Playwright o Puppeteer para las pruebas E2E. Estas pruebas deben interactuar con la aplicación *como lo haría un usuario real* (haciendo clic en botones, escribiendo en campos de texto, seleccionando opciones en dropdowns, etc.) y verificar que los resultados sean los esperados. Se debe probar:
        * La navegación entre las diferentes páginas de la aplicación.
        * El flujo de registro e inicio de sesión.
        * El envío de código para su ejecución.
        * La visualización de los resultados de la ejecución.
        * La visualización del historial de ejecuciones.
        * El manejo de errores (por ejemplo, errores de validación, errores de red, errores del servidor).
        * Que la aplicación funcione correctamente en diferentes navegadores y dispositivos (si es posible, aunque esto puede ser más costoso de automatizar).
    *   **Entregables:** Pruebas E2E completas y pasando, cubriendo los flujos principales de usuario.
     * **Dependencias:** Fases 1-7 completas.

*   **[Tarea 8.4] Pruebas de Carga y Rendimiento** `[L]` `[P3]`
    *   **Descripción:** Realizar pruebas de carga y rendimiento para verificar la escalabilidad, estabilidad y capacidad de respuesta de la aplicación bajo diferentes niveles de carga. Se simularán escenarios con un número creciente de usuarios concurrentes y solicitudes por segundo, utilizando herramientas como Artillery, k6 o JMeter.  Se medirán los siguientes indicadores:
        *   **Tiempo de respuesta promedio:** El tiempo que tarda la API en responder a una solicitud (para diferentes endpoints, especialmente `/api/v1/execute`).
        *   **Tasa de errores:** El porcentaje de solicitudes que fallan (códigos de estado HTTP 4xx o 5xx).
        *   **Uso de CPU y memoria:** El consumo de recursos del backend (servidor API) y de los workers (contenedores Docker).  Se monitorizará el uso de CPU, memoria RAM y disco.
        *   **Throughput:** El número de solicitudes que la aplicación puede procesar por segundo (RPS - Requests Per Second).
        *   **Número máximo de usuarios concurrentes:**  Determinar cuántos usuarios simultáneos puede soportar la aplicación antes de que el rendimiento se degrade significativamente (aumenten los tiempos de respuesta o la tasa de errores).
        *   **Puntos de quiebre:** Identificar los componentes que fallan primero bajo carga (cuellos de botella).  Podría ser la base de datos, la cola de mensajes, los workers, o el propio backend.
        *   **Comportamiento del autoescalado:** Verificar que el autoescalado (si está configurado en AWS ECS/Fargate) funciona correctamente.  Comprobar que se crean nuevas instancias de los contenedores cuando la carga aumenta y que se eliminan cuando la carga disminuye.
        *  **Tiempos de respuesta de SQS:** Medir cuánto tarda un mensaje en ser procesado desde que se encola hasta que el worker lo consume y envía los resultados.
    *   **Entregables:**
        *   Informes generados por las herramientas de pruebas de carga (Artillery, k6, JMeter) que muestren los resultados de las pruebas (gráficas, tablas, etc.).
        *   Análisis de los resultados, identificando cuellos de botella, límites de la aplicación y el comportamiento del autoescalado.
        *   Recomendaciones para optimizar el rendimiento (si es necesario).
     * **Dependencias:** Fases 1-6 completas.  Idealmente, tener el frontend también listo para pruebas de carga más realistas (aunque se pueden simular solicitudes directamente a la API).

*   **[Tarea 8.5] Configurar CI/CD (AWS CodePipeline)** `[XL]` `[P2]`
    *   **Descripción:** Configurar un pipeline de Integración Continua y Entrega Continua (CI/CD) utilizando AWS CodePipeline, CodeBuild y CodeDeploy (o herramientas equivalentes como Jenkins, GitLab CI, CircleCI, GitHub Actions, etc.). El pipeline debe automatizar completamente el proceso de construcción, prueba y despliegue de la aplicación, desde el momento en que se hace un commit al repositorio de código hasta que la nueva versión está disponible para los usuarios. Se deben definir las siguientes etapas:

        1.  **Source (Origen):**
            *   Configurar el pipeline para que se active automáticamente cuando se detecten cambios en el repositorio de código (GitHub, GitLab, Bitbucket, AWS CodeCommit, etc.).
            *   Especificar la rama del repositorio que activará el pipeline (normalmente `main` o `develop`).

        2.  **Build (Construcción):**
            *   Crear un proyecto de CodeBuild (o equivalente) que se encargue de construir las imágenes Docker del backend, el frontend y los workers.
            *   Dentro del proyecto de CodeBuild, definir un archivo `buildspec.yml` (o equivalente) que especifique los comandos a ejecutar para construir las imágenes.  Estos comandos típicamente incluyen:
                *   Iniciar sesión en el registro de contenedores (ECR o Docker Hub).
                *   Ejecutar `docker build` para cada imagen, utilizando los `Dockerfile` correspondientes.
                *   Etiquetar las imágenes con un identificador único (por ejemplo, el hash del commit o un número de versión).
                *   Enviar las imágenes al registro de contenedores.
            *   (Opcional) Ejecutar linters (ESLint, Prettier) y formateadores de código antes de construir las imágenes.
            *   (Opcional) Ejecutar pruebas unitarias *antes* de construir las imágenes Docker (para detectar errores lo antes posible y evitar construir imágenes innecesariamente).

        3.  **Test (Pruebas):**
            *   Crear proyectos de CodeBuild (o equivalentes) separados para ejecutar las pruebas unitarias, de integración y E2E.
            *   Definir archivos `buildspec.yml` (o equivalentes) para cada tipo de prueba.  Estos archivos deben:
                *   Ejecutar las pruebas unitarias del backend y de los workers.
                *   Ejecutar las pruebas de integración del backend y los workers.
                *   Ejecutar las pruebas E2E (esto puede requerir un entorno de pruebas separado, que se puede crear y destruir dinámicamente como parte del pipeline).
            *   Configurar el pipeline para que las pruebas se ejecuten en paralelo (si es posible) para acelerar el proceso.
            *   Configurar el pipeline para que se detenga si alguna de las pruebas falla.
            *  (Opcional) Integrar con herramientas de análisis de cobertura de código (como Codecov o SonarCloud) para monitorizar la calidad del código.
            * (Opcional) Ejecutar pruebas de seguridad estáticas (SAST) y análisis de dependencias para detectar vulnerabilidades.

        4.  **Deploy (Despliegue):**
            *   Configurar CodeDeploy (o equivalente) para desplegar la aplicación en AWS ECS/Fargate.
            *   Definir una estrategia de despliegue *blue/green* (despliegue sin tiempo de inactividad) o *rolling update* (actualización gradual) para minimizar el impacto en los usuarios.
                *   **Blue/Green:** Se crea un nuevo entorno (green) con la nueva versión de la aplicación.  Se redirige el tráfico al nuevo entorno.  El entorno antiguo (blue) se puede mantener en espera o eliminar.
                *   **Rolling Update:** Se actualizan las instancias de los contenedores de forma gradual, reemplazando las instancias antiguas por las nuevas.
            *   Configurar CodeDeploy para que utilice las nuevas imágenes Docker que se construyeron en la etapa de Build y se enviaron al registro de contenedores.
            *   Configurar CodeDeploy para que actualice las definiciones de tareas y servicios de ECS con las nuevas imágenes.
            *   (Opcional) Configurar CodeDeploy para que realice un rollback automático a la versión anterior de la aplicación si el despliegue falla o si las pruebas de verificación posteriores al despliegue fallan.

        5. **(Opcional) Notificaciones:** Configurar el pipeline para que envíe notificaciones (por correo electrónico, Slack, etc.) sobre el estado del pipeline (éxito, fallo, inicio de una etapa, etc.).  Esto permite al equipo de desarrollo estar al tanto del proceso de CI/CD.

        6.  **(Opcional) Rollback:** En caso de un fallo en el despliegue, o en una fase de pruebas posterior, implementar un rollback manual o automatizado.


    *   **Entregables:** Pipeline de CI/CD completo, configurado y funcionando, automatizando todo el proceso desde el código hasta el despliegue.  Archivos de configuración de CI/CD (por ejemplo, `buildspec.yml` para CodeBuild, archivos de configuración de CodePipeline, archivos de definición de tareas y servicios de ECS, etc.).
    *  **Dependencias:** Fases 1-7 completas.

*   **[Tarea 8.6] Desplegar en AWS (ECS/Fargate)** `[XL]` `[P1]`
    *   **Descripción:** Desplegar la aplicación en AWS usando ECS (Elastic Container Service) o Fargate (que es un motor de ejecución serverless para ECS). Se deben realizar los siguientes pasos:
        1.  **Crear un clúster de ECS:**  Un clúster es una agrupación lógica de tareas o servicios.
        2.  **Definir las tareas (Task Definitions):** Una tarea es una especificación de cómo ejecutar un contenedor (o un grupo de contenedores) en ECS.  Se debe crear una definición de tarea para el backend, una para el frontend y una para cada tipo de worker.  En la definición de la tarea, se especifica:
            *   La imagen Docker a utilizar (la imagen que se construyó en el pipeline de CI/CD y se envió al registro de contenedores).
            *   Los puertos que se deben exponer (por ejemplo, el puerto 3000 para el backend, el puerto 80/443 para el frontend).
            *   Las variables de entorno que se deben pasar al contenedor (credenciales de AWS, URL de la base de datos, URL de la cola de mensajes, etc.).
            *   Los límites de CPU y memoria para el contenedor.
            *   Los *secrets* (información sensible, como contraseñas) que se deben pasar al contenedor (usando AWS Secrets Manager o Parameter Store).
            *   La configuración de logging (dónde enviar los logs del contenedor, normalmente a CloudWatch Logs).
        3.  **Definir los servicios (Services):**  Un servicio de ECS se encarga de mantener un número deseado de instancias de una tarea en ejecución.  Se debe crear un servicio para el backend, uno para el frontend y uno para cada tipo de worker.  En la definición del servicio, se especifica:
            *   La definición de tarea a utilizar.
            *   El número deseado de tareas (instancias del contenedor) a ejecutar.
            *   La estrategia de despliegue (rolling update o blue/green).
            *   La configuración de autoescalado (opcional).
        4.  **Configurar el balanceo de carga (ALB - Application Load Balancer):**  Se debe crear un Application Load Balancer (ALB) para distribuir el tráfico entrante entre las instancias de los contenedores del backend y del frontend.  El ALB se configura para escuchar en los puertos 80 (HTTP) y 443 (HTTPS) y reenviar el tráfico a los contenedores correspondientes. Se debe configurar:
            *   *Listeners*: Configurar los listeners para los puertos 80 y 443.
            *   *Target Groups*: Crear grupos de destino (target groups) para el backend y el frontend.  Cada grupo de destino contiene las instancias de los contenedores que recibirán el tráfico.
            *  *Rules*: Configurar reglas en el listener para enrutar el tráfico a los grupos de destino correctos (por ejemplo, las solicitudes a `/api` se enrutan al backend, y las demás solicitudes se enrutan al frontend).
            * *Health Checks*: Configurar *health checks* para que el ALB verifique periódicamente el estado de las instancias de los contenedores y deje de enviar tráfico a las instancias que no estén sanas.
        5.  **Configurar el autoescalado (opcional):**  Se puede configurar el autoescalado para que ECS aumente o disminuya automáticamente el número de instancias de los contenedores en función de la demanda.  Esto se hace definiendo políticas de escalado basadas en métricas de CloudWatch (como el uso de CPU, el uso de memoria, el número de solicitudes, etc.).
        6.  **Configurar la base de datos (RDS PostgreSQL):**  Crear una instancia de RDS PostgreSQL y configurar la conexión desde el backend (usando las variables de entorno). Se deben configurar los grupos de seguridad para permitir el acceso desde las instancias de ECS/Fargate a la base de datos.
        7.  **Configurar las colas de mensajes (SQS):**  Crear las colas SQS necesarias (una para las solicitudes de ejecución y otra para los resultados, o las que se hayan definido en la arquitectura). Se deben configurar los permisos para que el backend pueda enviar mensajes a las colas y los workers puedan recibir y eliminar mensajes.
        8.  **Configurar API Gateway:**  Crear una API REST en API Gateway.  Definir los recursos (por ejemplo, `/api/v1/execute`, `/api/v1/history`, etc.) y los métodos (GET, POST, etc.).  Configurar la integración con el backend (a través del Application Load Balancer). Configurar la autenticación (usando un JWT Authorizer o integrando la autenticación directamente con el backend). Configurar el *rate limiting*.
        9. **Configurar CloudWatch:** Se configura para el monitoreo y logs.
        10. **Grupos de seguridad y VPCs:** Configurar los grupos de seguridad (firewalls virtuales) y las VPCs (redes virtuales privadas) para controlar el acceso a los recursos de AWS.  Se debe asegurar que solo los componentes que necesitan comunicarse entre sí puedan hacerlo.
        11. **(Opcional) Dominio personalizado:** Configurar un dominio personalizado para la API y el frontend (usando Route 53 o un proveedor de DNS externo).

    *   **Entregables:** Aplicación completamente desplegada en AWS y accesible públicamente (o a través de una red privada, según la configuración de la VPC y los grupos de seguridad).  Infraestructura como código (IaC) definida (por ejemplo, usando CloudFormation, Terraform o CDK) para poder reproducir la infraestructura fácilmente.
    * **Dependencias:** Fases 1-7 completas.

*   **[Tarea 8.7] Configurar Monitoreo y Alertas (CloudWatch)** `[M]` `[P2]`
    *   **Descripción:** Configurar CloudWatch para monitorizar el rendimiento de la aplicación y establecer alertas. Se debe:
        *   **Métricas:**
            *   Monitorizar las métricas estándar de ECS/Fargate (uso de CPU, memoria, red, etc.).
            *   Monitorizar las métricas de RDS (uso de CPU, memoria, disco, conexiones, etc.).
            *   Monitorizar las métricas de SQS (número de mensajes visibles, número de mensajes enviados, número de mensajes recibidos, antigüedad de los mensajes, etc.).
            *   Monitorizar las métricas de API Gateway (número de solicitudes, latencia, tasa de errores, etc.).
            *   Crear métricas personalizadas (si es necesario) para monitorizar aspectos específicos de la aplicación (por ejemplo, el número de ejecuciones de código por minuto, el tiempo promedio de ejecución, etc.).  Esto se puede hacer desde el backend (enviando métricas personalizadas a CloudWatch) o desde los workers.
        *   **Logs:**
            *   Configurar la recolección de logs de todos los componentes (backend, frontend, workers) y centralizarlos en CloudWatch Logs.
            *   Crear grupos de logs y streams de logs.
            *   Configurar la retención de logs (por ejemplo, 30 días, 90 días, etc.).
            *   Crear filtros de métricas (metric filters) para extraer información relevante de los logs y convertirla en métricas.  Por ejemplo, se puede crear un filtro para contar el número de errores 500 en los logs del backend.
        *   **Alarmas:**
            *   Crear alarmas de CloudWatch basadas en las métricas.  Las alarmas se activan cuando una métrica supera un umbral definido durante un período de tiempo determinado.
            *   Configurar alarmas para:
                *   Alto uso de CPU o memoria en el backend o los workers.
                *   Alta latencia de la API.
                *   Alta tasa de errores (4xx o 5xx).
                *   Gran número de mensajes en la cola SQS (indica que los workers no están procesando los mensajes lo suficientemente rápido).
                *   Errores en los logs.
            *   Configurar acciones para las alarmas (por ejemplo, enviar una notificación por correo electrónico, enviar un mensaje a un canal de Slack, escalar automáticamente el número de instancias de los contenedores, etc.).
        *   **Paneles de Control (Dashboards):**
            *   Crear paneles de control de CloudWatch para visualizar las métricas y los logs de forma centralizada.
            *   Crear gráficos para las métricas clave (tiempo de respuesta, tasa de errores, uso de CPU, uso de memoria, etc.).
            *   Añadir widgets para mostrar los logs más recientes.

    *   **Entregables:** Monitoreo y alertas configurados en CloudWatch, permitiendo una supervisión proactiva del estado de la aplicación y una respuesta rápida a los problemas.  Paneles de control creados para visualizar las métricas y los logs.
    * **Dependencias:** Tarea 8.6

*   **[Tarea 8.8] Documentación Final** `[L]` `[P2]`
    *   **Descripción:** Actualizar, organizar y completar *toda* la documentación del proyecto. Esto es *fundamental* para la mantenibilidad y escalabilidad del proyecto a largo plazo, así como para facilitar la colaboración y el onboarding de nuevos desarrolladores. Se debe incluir:
        *   **`README.md` (Archivo Léame Principal):**
            *   Descripción general del proyecto (qué es Argus, para qué sirve, a quién va dirigido).
            *   Tecnologías utilizadas (lista detallada, con versiones si es relevante).
            *   Requisitos previos (software necesario para ejecutar la aplicación, tanto en desarrollo como en producción: Node.js, Python, Docker, AWS CLI, cuenta de AWS, etc.).
            *   Instrucciones de instalación y configuración (paso a paso, incluyendo cómo configurar las variables de entorno, tanto para desarrollo local como para producción).
            *   Instrucciones de uso (cómo ejecutar la aplicación localmente, cómo desplegarla en AWS, cómo usar la API, cómo interactuar con el frontend, ejemplos de uso).
            *   Arquitectura de la aplicación (descripción de los componentes, diagramas de arquitectura, diagramas de secuencia, diagrama de despliegue).  Incluir enlaces a los diagramas Mermaid que ya hemos creado.
            *   Estado del proyecto (en desarrollo, en producción, etc., y roadmap futuro).
            *   Contribuciones (cómo contribuir al proyecto, guía de estilo de código, proceso de revisión de código).
            *   Licencia (especificar la licencia de software del proyecto, por ejemplo, MIT, Apache 2.0, GPL, etc.).
            *   Información de contacto (correo electrónico del equipo de desarrollo, enlace al repositorio de código, etc.).
            *   Explicación de los comandos del `package.json`.

        *   **Documentación de la API (Swagger/OpenAPI):**
            *   Definir la API REST de Argus utilizando el estándar OpenAPI (antes conocido como Swagger). Esto permite generar documentación interactiva de la API, que los desarrolladores (tanto del frontend como externos) pueden usar para explorar y probar los endpoints, ver los formatos de las solicitudes y respuestas, etc.
            *   Se puede usar un editor online (como el Swagger Editor, [https://editor.swagger.io/](https://editor.swagger.io/)) o una herramienta integrada en el código (como `swagger-jsdoc` y `swagger-ui-express` en Node.js).  La ventaja de la integración en el código es que la documentación se genera automáticamente a partir de comentarios especiales en el código, lo que ayuda a mantenerla actualizada.
            *   La documentación de la API debe incluir:
                *   Descripción general de la API.
                *   Descripción detallada de cada endpoint (ruta, método HTTP, parámetros, cuerpo de la solicitud, ejemplos de solicitud y respuesta, códigos de estado HTTP posibles, descripción de los errores).
                *   Esquemas de los datos (modelos de datos).
                *   Información de autenticación (cómo obtener y usar el token JWT).
            *   Se debe desplegar la documentación de la API (por ejemplo, usando Swagger UI) para que sea accesible a través de un navegador web.

        *   **Documentación del Código:**
            *   Asegurarse de que el código esté bien documentado, usando comentarios claros y concisos.
            *   Usar JSDoc (para JavaScript/TypeScript) para generar documentación HTML a partir de los comentarios del código.  JSDoc permite documentar funciones, clases, parámetros, tipos de retorno, etc.
            *   Seguir una guía de estilo de código consistente (por ejemplo, la guía de estilo de Airbnb para JavaScript).

        *   **Documentación de la Arquitectura:**
            *   Incluir todos los diagramas que hemos creado (diagrama de componentes, diagrama de despliegue, diagrama de flujo del worker, diagrama de secuencia de la API, diagrama ERD de la base de datos, diagrama de Gantt del roadmap).
            *   Explicar cada diagrama y su propósito.

        *   **Guía de Contribución (`CONTRIBUTING.md`):**
            *   Si el proyecto es de código abierto, crear un archivo `CONTRIBUTING.md` que explique cómo otros desarrolladores pueden contribuir al proyecto.  Esto debe incluir:
                *   Instrucciones para configurar el entorno de desarrollo.
                *   Guía de estilo de código.
                *   Proceso de revisión de código (cómo enviar pull requests).
                *   Cómo reportar bugs.
                *   Cómo sugerir nuevas funcionalidades.

        *   **Documentación de la Base de Datos:**
            *  Incluir el documento de modelado de la base de datos.

    *   **Entregables:** Documentación completa, clara, precisa, actualizada y bien organizada, que cubra todos los aspectos del proyecto (código, API, arquitectura, despliegue, contribuciones, etc.).
    * **Dependencias:** Haber completado todas las fases anteriores del proyecto.


```mermaid
gantt
    title Roadmap de Desarrollo de Argus (Backend y Frontend)

    dateFormat  YYYY-MM-DD
    axisFormat %Y-%m-%d
    todayMarker off

    section Fase 1: Configuración Inicial y Conexión a la Base de Datos
    Tarea 1.1 :a1, 2024-03-01, 1d
    Tarea 1.2 :a2, after a1, 1d
    Tarea 1.3 :a3, after a2, 1d
    Tarea 1.4 :a4, after a3, 1d
    Tarea 1.5 :a5, after a4, 1d
    Tarea 1.6 :a6, after a5, 1d
    Tarea 1.7 :a7, after a6, 2d
    Tarea 1.8 :a8, after a7, 2d
    Tarea 1.9 :a9, after a8, 2d
    Tarea 1.10 :a10, after a9, 2d

    section Fase 2: Implementación de la Autenticación
    Tarea 2.1 :b1, after a10, 1d
    Tarea 2.2 :b2, after b1, 2d
    Tarea 2.3 :b3, after b2, 2d
    Tarea 2.4 :b4, after b3, 2d
    Tarea 2.5 :b5, after b4, 1d
    Tarea 2.6 :b6, after b5, 1d
    Tarea 2.7 :b7, after b6, 2d
    Hito 1     :milestone, after b7, 0d

    section Fase 3: Endpoint de Ejecución y Comunicación con SQS
    Tarea 3.1 :c1, after b7, 1d
    Tarea 3.2 :c2, after c1, 2d
    Tarea 3.3 :c3, after c2, 2d
    Tarea 3.4 :c4, after c3, 1d
    Tarea 3.5 :c5, after c4, 2d
    Tarea 3.6 :c6, after c5, 1d
    Tarea 3.7 :c7, after c6, 1d
    Tarea 3.8 :c8, after c7, 2d
    Hito 2     :milestone, after c8, 0d

    section Fase 4: Implementación del Worker Básico (Node.js)
    Tarea 4.1 :d1, after c8, 1d
    Tarea 4.2 :d2, after d1, 1d
    Tarea 4.3 :d3, after d2, 1d
    Tarea 4.4 :d4, after d3, 3d
    Tarea 4.5 :d5, after d4, 2d
    Tarea 4.6 :d6, after d5, 2d
    Hito 3     :milestone, after d6, 0d

    section Fase 5: Implementación Completa del Worker (Node.js/Python)
    Tarea 5.1  :e1, after d6, 3d
      Tarea 5.1.1 :e1_1, after e1, 1d
      Tarea 5.1.2 :e1_2, after e1_1, 2d
      Tarea 5.1.3 :e1_3, after e1_2, 1d
      Tarea 5.1.4 :e1_4, after e1_3, 1d
      Tarea 5.1.5 :e1_5, after e1_4, 2d
    Tarea 5.2  :e2, after e1, 3d
      Tarea 5.2.1 :e2_1, after e2, 1d
      Tarea 5.2.2 :e2_2, after e2_1, 2d
      Tarea 5.2.3 :e2_3, after e2_2, 1d
    Tarea 5.3 :e3, after e2, 5d
      Tarea 5.3.1 :e3_1, after e3, 1d
      Tarea 5.3.2 :e3_2, after e3_1, 2d
      Tarea 5.3.3 :e3_3, after e3_2, 3d
      Tarea 5.3.4 :e3_4, after e3_3, 3d
      Tarea 5.3.5 :e3_5, after e3_4, 3d
      Tarea 5.3.6 :e3_6, after e3_5, 2d
    Tarea 5.4  :e4, after e3, 5d
      Tarea 5.4.1 :e4_1, after e4, 4d
      Tarea 5.4.2 :e4_2, after e4_1, 1d
      Tarea 5.4.3 :e4_3, after e4_2, 1d
      Tarea 5.4.4 :e4_4, after e4_3, 3d
    Tarea 5.5  :e5, after e4, 2d
    Tarea 5.6  :e6, after e5, 2d
    Tarea 5.7  :e7, after e6, 5d
      Tarea 5.7.JS.1 :e7_js1, after e7,1d
      Tarea 5.7.JS.2 :e7_js2, after e7_js1,1d
      Tarea 5.7.JS.3 :e7_js3, after e7_js2,1d
      Tarea 5.7.JS.4 :e7_js4, after e7_js3,3d
      Tarea 5.7.JS.5 :e7_js5, after e7_js4,2d
      Tarea 5.7.JS.6 :e7_js6, after e7_js5,5d
      Tarea 5.7.JS.7 :e7_js7, after e7_js6,2d
      Tarea 5.7.PY.1 :e7_py1, after e7_js7,1d
      Tarea 5.7.PY.2 :e7_py2, after e7_py1,1d
      Tarea 5.7.PY.3 :e7_py3, after e7_py2,1d
      Tarea 5.7.PY.4 :e7_py4, after e7_py3,3d
      Tarea 5.7.PY.5 :e7_py5, after e7_py4,2d
      Tarea 5.7.PY.6 :e7_py6, after e7_py5,5d
      Tarea 5.7.PY.7 :e7_py7, after e7_py6,2d

    Tarea 5.8  :e8, after e7, 3d
    Hito 4     :milestone, after e8, 0d

    section Fase 6: Otros Endpoints
    Tarea 6.1 :f1, after e8, 3d
    Tarea 6.2 :f2, after f1, 3d
    Tarea 6.3 :f3, after f2, 1d
    Hito 5     :milestone, after f3, 0d

    section Fase 7: Frontend (Next.js)
    Tarea 7.1 :g1, after f3, 2d
    Tarea 7.2 :g2, after g1, 5d
      Tarea 7.2.1 :g2_1, after g2, 2d
      Tarea 7.2.2 :g2_2, after g2_1, 1d
      Tarea 7.2.3 :g2_3, after g2_2, 1d
      Tarea 7.2.4 :g2_4, after g2_3, 2d
      Tarea 7.2.5 :g2_5, after g2_4, 3d
      Tarea 7.2.6 :g2_6, after g2_5, 2d
      Tarea 7.2.7 :g2_7, after g2_6, 2d
      Tarea 7.2.8 :g2_8, after g2_7, 2d
      Tarea 7.2.9 :g2_9, after g2_8, 2d
      Tarea 7.2.10 :g2_10, after g2_9, 1d
    Tarea 7.3 :g3, after g2, 5d
      Tarea 7.3.1 :g3_1, after g3, 3d
      Tarea 7.3.2 :g3_2, after g3_1, 3d
      Tarea 7.3.3 :g3_3, after g3_2, 2d
      Tarea 7.3.4 :g3_4, after g3_3, 1d
      Tarea 7.3.5 :g3_5, after g3_4, 2d
    Tarea 7.4 :g4, after g3, 4d
      Tarea 7.4.1  :g4_1, after g4, 2d
      Tarea 7.4.2  :g4_2, after g4_1, 1d
      Tarea 7.4.3  :g4_3, after g4_2, 1d
      Tarea 7.4.4  :g4_4, after g4_3, 2d
      Tarea 7.4.5  :g4_5, after g4_4, 2d
      Tarea 7.4.6  :g4_6, after g4_5, 2d
      Tarea 7.4.7  :g4_7, after g4_6, 2d
      Tarea 7.4.8  :g4_8, after g4_7, 2d
      Tarea 7.4.9  :g4_9, after g4_8, 2d
      Tarea 7.4.10 :g4_10, after g4_9, 2d
      Tarea 7.4.11 :g4_11, after g4_10, 2d
    Tarea 7.5 :g5, after g4, 4d
      Tarea 7.5.1  :g5_1, after g5, 1d
      Tarea 7.5.2  :g5_2, after g5_1, 2d
      Tarea 7.5.3  :g5_3, after g5_2, 1d
      Tarea 7.5.4  :g5_4, after g5_3, 1d
      Tarea 7.5.5  :g5_5, after g5_4, 2d
      Tarea 7.5.6  :g5_6, after g5_5, 2d
      Tarea 7.5.7  :g5_7, after g5_6, 2d
      Tarea 7.5.8  :g5_8, after g5_7, 2d
      Tarea 7.5.9  :g5_9, after g5_8, 2d
      Tarea 7.5.10 :g5_10, after g5_9, 3d
    Tarea 7.6 :g6, after g5, 4d
      Tarea 7.6.1 :g6_1, after g6, 1d
      Tarea 7.6.2 :g6_2, after g6_1, 3d
      Tarea 7.6.3 :g6_3, after g6_2, 4d
      Tarea 7.6.4 :g6_4, after g6_3, 2d
      Tarea 7.6.5 :g6_5, after g6_4, 2d
    Hito 6     :milestone, after g3, 0d
    Hito 7     :milestone, after g6, 0d

    section Fase 8: Pruebas Exhaustivas y Despliegue
    Tarea 8.1 :h1, after g6, 5d
    Tarea 8.2 :h2, after h1, 5d
    Tarea 8.3 :h3, after h2, 4d
    Tarea 8.4 :h4, after h3, 3d
    Tarea 8.5 :h5, after h4, 4d
    Tarea 8.6 :h6, after h5, 4d
    Tarea 8.7 :h7, after h6, 2d
    Tarea 8.8 :h8, after h7, 3d
    Hito 8     :milestone, after h4, 0d
    Hito 9     :milestone, after h8, 0d
```
