require('dotenv').config();

const os = require('os');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const apiRouter = require('./api');
const loginRouter = require('./routes/admin/login');
const novedadesRouter = require('./routes/admin/novedades');
const contactosRouter = require('./routes/admin/contactos');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const limitar = (max, message, html = false) => rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => html
        ? res.status(429).send(message)
        : res.status(429).json({ error: true, message })
});
app.post('/api/contacto', limitar(10, 'Enviaste muchos mensajes. Probá de nuevo en unos minutos.'));
app.post('/admin/login', limitar(10, 'Demasiados intentos de ingreso. Probá de nuevo en unos minutos.', true));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true
}));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    defaultLayout: false,
    helpers: {

        fecha: (valor) => valor
            ? new Date(valor).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
            : ''
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    sessionSecret = crypto.randomBytes(32).toString('hex');
    console.warn('Aviso: falta SESSION_SECRET en el archivo .env. Se usa una clave temporal.');
}

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 8 }
}));

const secured = (req, res, next) => {
    if (req.session.id_usuario) {
        return next();
    }
    res.redirect('/admin/login');
};

app.get('/', (req, res) => {
    res.json({
        nombre: 'API de Atletic Gym',
        endpoints: ['/api/novedades', '/api/planes', '/api/entrenadores', 'POST /api/contacto'],
        panel: '/admin/login'
    });
});
app.get('/admin', (req, res) => res.redirect('/admin/login'));

app.use('/api', apiRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, novedadesRouter);
app.use('/admin/contactos', secured, contactosRouter);

app.use((req, res) => {
    res.status(404).json({ error: true, message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) return next(err);
    const status = err.status || 500;
    res.status(status).json({
        error: true,
        message: status === 400 ? 'Solicitud inválida' : 'Error interno del servidor'
    });
});

const PORT = process.env.APP_PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Servidor de Atletic Gym corriendo en http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso. Cerrá el otro programa o cambiá APP_PORT en el .env.`);
    } else {
        console.error(err);
    }
    process.exit(1);
});
