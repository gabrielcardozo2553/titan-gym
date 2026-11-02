require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const apiRouter = require('./api');
const loginRouter = require('./routes/admin/login');
const novedadesRouter = require('./routes/admin/novedades');
const contactosRouter = require('./routes/admin/contactos');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    defaultLayout: false
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'titan-gym-dev-secret',
    resave: false,
    saveUninitialized: false
}));

// Middleware: solo deja pasar a usuarios que iniciaron sesión
const secured = (req, res, next) => {
    if (req.session.id_usuario) {
        return next();
    }
    res.redirect('/admin/login');
};

app.use('/api', apiRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, novedadesRouter);
app.use('/admin/contactos', secured, contactosRouter);

// Ruta inexistente
app.use((req, res) => {
    res.status(404).json({ error: true, message: 'Ruta no encontrada' });
});

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor de Titan Gym corriendo en http://localhost:${PORT}`);
});
