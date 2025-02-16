<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
  <div style="margin-bottom: 2rem;">
    <img src="logoArgus.png" alt="Logo Argus" style="max-width: 200px; height: auto;">
  </div>
  
# Argus

Argus es una aplicación para medir performance en bloques de código.

## **Análisis y Diseño**

### **1\. Requerimientos Funcionales**

- ✅ Ejecutar código en múltiples lenguajes.
- ✅ Medir tiempo de ejecución en milisegundos.
- ✅ Medir uso de memoria. 
- ✅ Estimar complejidad en tiempo y espacio.
- ✅ Guardar mediciones pasadas por usuario.

### **2\. Requerimientos No Funcionales**

- ⚡ Alta concurrencia (usuarios ejecutando código simultáneamente).
- 🔒 Seguridad (ejecución aislada para evitar ataques).
- 📈 Escalabilidad (soporte para más lenguajes y usuarios).
- 💾 Persistencia de mediciones en PostgreSQL.

### **3\. Arquitectura General**

📌 **Frontend (Next.js, TypeScript)**

*   UI para ingresar código y ver resultados.
    
*   Conexión con la API REST.
    

📌 **Backend (Go, API REST)**

*   Recibe código y lo envía a ejecución.
    
*   Gestiona ejecución segura con Docker.
    
*   Guarda resultados en PostgreSQL.
    

📌 **Ejecutor de Código (Docker + Runtimes)**

*   Contenedores aislados con lenguajes soportados.
    
*   Mide tiempo y memoria durante la ejecución.
    
*   Retorna métricas al backend.
    

📌 **Base de Datos (PostgreSQL en Azure)**

*   Almacena mediciones históricas por usuario.
    

📌 **Infraestructura (Azure + Docker Swarm/Kubernetes)**

*   Orquestación de contenedores para ejecución escalable.

  <hr>

<div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
  <div style="text-align: center;">
    <img src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white" alt="Azure" style="margin: 4px;">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" style="margin: 4px;">
    <img src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" alt="Go" style="margin: 4px;">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next JS" style="margin: 4px;">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres" style="margin: 4px;">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" style="margin: 4px;">
  </div>
</div>

