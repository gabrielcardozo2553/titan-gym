# Atletic Gym

Sitio web de un gimnasio, desarrollado como **Quinta Evaluación de Práctica Profesional II (2026)**.
Es una adaptación del proyecto de clase *Transportes* (Front-end con React + Back-end con Node/Express y MySQL) a una temática nueva: un gimnasio y centro de entrenamiento.

## Secciones del sitio

Se mantienen las mismas 4 secciones del sitio original:

| Sección | Qué muestra |
|---|---|
| **Home** | Bienvenida, testimonios y planes de membresía (desde la base de datos) |
| **Nosotros** | Historia del gimnasio y equipo de entrenadores (desde la base de datos) |
| **Novedades** | Clases nuevas, eventos, consejos y promociones cargadas desde el panel admin |
| **Contacto** | Formulario que guarda el mensaje en la base de datos (y lo envía por mail si hay SMTP) |

Además hay un **panel de administración** (`/admin/login`) para dar de alta, modificar y eliminar novedades y para leer los mensajes recibidos.

## Estructura del repositorio

```
atletic-gym/
├── backend/     API REST + panel admin (Node, Express, Handlebars, MySQL)
├── frontend/    Sitio público (React)
└── database/
    └── atletic_gym.sql    Esquema + datos de ejemplo
```

## Modelo de datos

- `usuarios` — administradores del panel.
- `novedades` — título, subtítulo, cuerpo, imagen (Cloudinary), categoría y fecha.
- `planes` — membresías con precio, días por semana y marca de destacado.
- `entrenadores` — equipo del gimnasio (nombre, cargo, especialidad, bio, foto).
- `contactos` — mensajes enviados desde el formulario.

## Puesta en marcha

Requisitos: Node.js 18+ y MySQL 5.7+ / MariaDB 10.4+.

### 1. Base de datos

```bash
mysql -u root -p < database/atletic_gym.sql
```

> El script **borra y recrea** la base `atletic_gym`. Crea el usuario de prueba `admin` / `admin123`.

### 2. Backend

```bash
cd backend
cp .env.example .env      # completar DB_USER, DB_PASSWORD, SESSION_SECRET, etc.
npm install
npm run dev               # o: npm start   → http://localhost:4000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env      # REACT_APP_API_URL=http://localhost:4000
npm install
npm start                 # → http://localhost:3000
```

## Variables de entorno

Ver `backend/.env.example` y `frontend/.env.example`. Los archivos `.env` reales **no** se suben al repositorio.
Cloudinary y SMTP son opcionales: sin Cloudinary las novedades se muestran sin imagen y sin SMTP los mensajes solo se guardan en la base.

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/novedades` | Lista de novedades (más recientes primero) |
| GET | `/api/planes` | Planes de membresía |
| GET | `/api/entrenadores` | Equipo de entrenadores |
| POST | `/api/contacto` | Guarda un mensaje (`nombre`, `email`, `telefono`, `mensaje`) |

Panel admin (requiere sesión): `/admin/login`, `/admin/novedades`, `/admin/contactos`.

## Tecnologías

React 18 · React Router 6 · Axios · Node.js · Express · express-session · express-handlebars · MySQL (mysql2) · Cloudinary · Nodemailer.

## Autor

Gabriel Cardozo — Tecnicatura en Desarrollo de Software, 2.º año.
