# Atletic Gym

Sitio web de un gimnasio, hecho para la Quinta Evaluación de Práctica Profesional II (2026). Es una adaptación del proyecto base de clase (React + Node/Express + MySQL) a una temática nueva.

## Secciones

- **Home:** carrusel, selector de actividades, planes y testimonios.
- **Nosotros:** historia del gimnasio y equipo de entrenadores.
- **Novedades:** clases, eventos, consejos y promociones.
- **Contacto:** formulario que guarda el mensaje en la base de datos.

También hay un panel de administración en `/admin/login` para gestionar las novedades y ver los mensajes recibidos.

## Estructura

```
backend/     API y panel admin (Node, Express, Handlebars, MySQL)
frontend/    Sitio público (React)
database/    Script SQL con tablas y datos de ejemplo
```

## Base de datos

Tablas: `usuarios`, `novedades`, `planes`, `entrenadores` y `contactos`.

Relaciones:
- un usuario publica muchas novedades (`novedades.id_usuario`)
- un plan puede estar en muchos contactos (`contactos.id_plan`)

## Cómo correrlo

Requiere Node.js 18+ y MySQL o MariaDB.

1. Importar la base (borra y recrea `atletic_gym`):
   ```
   mysql -u root -p < database/atletic_gym.sql
   ```
2. Backend (http://localhost:4000):
   ```
   cd backend
   cp .env.example .env
   npm install
   npm start
   ```
3. Frontend (http://localhost:3000):
   ```
   cd frontend
   cp .env.example .env
   npm install
   npm start
   ```

Usuario del panel: `admin` / `admin123`. Cloudinary (imágenes) y SMTP (mails) son opcionales.

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/novedades` | Novedades |
| GET | `/api/planes` | Planes |
| GET | `/api/entrenadores` | Entrenadores |
| POST | `/api/contacto` | Guarda un mensaje |

## Tecnologías

React, React Router, Axios, Node.js, Express, Handlebars, MySQL, Cloudinary, Nodemailer.

## Autor

Gabriel Cardozo, Tecnicatura en Desarrollo de Software, 2.º año.
