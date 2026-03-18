
# larosproject-ui

**Última modificación:** 18/03/2026

## Descripción

**larosproject-ui** es una aplicación **FrontEnd** que permite consumir las APIs REST desarrolladas durante el curso **AlgaWorks - Fullstack Angular e Spring**.

La aplicación se conecta con el servicio **larosproject-api**, que expone endpoints para la gestión de recursos como **movimientos/lanzamientos**, **categorías** y **personas**.

---

## Ejecución del servicio

Una vez iniciado el proyecto, la aplicación FrontEnd se ejecuta en:

http://localhost:4200/login

---

## Integración con Backend

El cliente se conecta con el servicio **larosproject-api**, que expone los siguientes endpoints:

```
GET http://localhost:8080/lanzamientos/
GET http://localhost:8080/personas
...
```

Para más información sobre el servicio Backend, consulte:

```
larosproject-api/README.md
```

---

## Instalación y ejecución

### Instalación de dependencias

```bash
npm install
```

### Ejecutar la aplicación

```bash
npm start
```

---

## Requisitos

- Node.js 10
