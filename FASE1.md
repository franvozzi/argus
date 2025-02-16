# Fase 1: Diseño y Planeamiento

## System Design
Aquí definiremos la estructura y componentes de un sistema para cumplir con requerimientos específicos.

La aplicación se compone de los siguientes módulos:

**Frontend** (Next.js + TypeScript): UI para ingresar código, ver resultados y consultar el historial.

**Backend** (Go API REST): Recibe y ejecuta el código en un entorno aislado, mide performance y almacena resultados.

**Ejecutor de Código** (Docker + Runtimes): Contenedores Docker configurados para cada lenguaje.

**Base de Datos** (PostgreSQL en Azure): Almacena resultados de ejecuciones.

**Infraestructura** (Azure + Docker Swarm/Kubernetes): Orquestación de contenedores para escalabilidad.

<div align="center">
  <img src="https://drive.google.com/uc?export=view&id=1mK7YHImPYQmv1lFiTZdYpaDVPwTTKFPb" width="45%"></img>
</div>

## Flujo de Datos
Para comprender el flujo de datos de Argus, debemos comprender que simplemente esta será la ruta desde su origen hasta su destino.

<div>
  <img src="https://drive.google.com/uc?export=view&id=1Sn7aclGMmUcb5htZFRqiHDSMBtTRV1l9">
</div>

## Bases de Datos
La base de datos va a almacenar linformación sobre los usuarios y las ejecuciones de código, permitiendo la consulta de mediciones anteriores. Está diseñada para garantizar eficiencia y escalabilidad, utilizando PostgreSQL (en Azure).
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE executions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    execution_time_ms FLOAT NOT NULL,
    memory_usage_kb FLOAT NOT NULL,
    complexity_time TEXT,  -- Ej: O(n), O(n log n)
    complexity_space TEXT, -- Ej: O(1), O(n)
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Casos de Uso

### a) Ejecución Exitosa de Código

Flujo:

 1) Usuario ingresa código y presiona "Ejecutar".
  
 2) Backend ejecuta el código y mide rendimiento.
  
 3)  Se almacena el resultado y se muestra al usuario.
  
  Output esperado: ✅ Usuario recibe tiempo de ejecución, uso de memoria y complejidad estimada.

### Código con Error de Sintaxis

Flujo:

 1) Usuario ingresa código con errores y lo ejecuta.
  
 2) Backend captura el error y lo envía al frontend.
  
  Resultado esperado: ❌ Usuario recibe un mensaje con detalles del error.

### Código con Ejecución Infinita (Timeout)

Flujo:

 1) Usuario ingresa código con un bucle infinito.
  
 2) Backend detecta que excede el límite de tiempo y cancela la ejecución.
  
  Resultado esperado:⌛️ Usuario recibe un mensaje de "Timeout".

### Consulta del Historial de Mediciones

Flujo:

 1) Usuario accede a su historial.
  
 2) Backend consulta PostgreSQL y devuelve los resultados.
  
  Resultado esperado: Usuario ve sus ejecuciones pasadas con detalles de rendimiento.

### Lenguaje No Soportado ❌

Flujo:

  1) Usuario intenta ejecutar código en un lenguaje no soportado.
  
  2) Backend rechaza la solicitud y devuelve un error.
  
  Resultado esperado:‼️ Usuario recibe un mensaje indicando que el lenguaje no está disponible. 
