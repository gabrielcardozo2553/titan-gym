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

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
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
    secret: 'transportesSecret',
    resave: false,
    saveUninitialized: true
}));

const secured = async (req, res, next) => {
    try {
        if (req.session.id_usuario) {
            next();
        } else {
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.log(error);
    }
};

app.use('/api', apiRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, novedadesRouter);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});