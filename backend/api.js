const express = require('express');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;

const novedadesModel = require('./models/novedadesModel');
const planesModel = require('./models/planesModel');
const entrenadoresModel = require('./models/entrenadoresModel');
const contactosModel = require('./models/contactosModel');

const router = express.Router();

// Evita que el contenido del formulario inserte HTML en el mail
const esc = (t = '') => String(t).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

// Envía el mensaje por mail solo si hay un SMTP configurado en el .env
async function enviarMail({ nombre, email, telefono, mensaje }) {
    if (!process.env.SMTP_HOST) return;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `Nueva consulta de ${nombre} - Titan Gym`,
        html: `<p><strong>Nombre:</strong> ${esc(nombre)}</p>
               <p><strong>Email:</strong> ${esc(email)}</p>
               <p><strong>Teléfono:</strong> ${esc(telefono) || '-'}</p>
               <p><strong>Mensaje:</strong> ${esc(mensaje)}</p>`
    });
}

// POST /api/contacto -> guarda el mensaje (y lo envía por mail si hay SMTP)
router.post('/contacto', async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).json({
            error: true,
            message: 'Nombre, email y mensaje son obligatorios.'
        });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: true, message: 'El email no es válido.' });
    }

    try {
        await contactosModel.insertContacto({ nombre, email, telefono, mensaje });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: 'No pudimos guardar tu mensaje.' });
    }

    try {
        await enviarMail({ nombre, email, telefono, mensaje });
    } catch (err) {
        // El mensaje ya quedó guardado; solo registramos el fallo del mail
        console.error('No se pudo enviar el mail:', err.message);
    }

    res.status(201).json({ error: false, message: '¡Mensaje enviado! Te respondemos a la brevedad.' });
});

// GET /api/novedades
router.get('/novedades', async (req, res) => {
    try {
        let novedades = await novedadesModel.getNovedades();

        novedades = novedades.map(novedad => {
            if (novedad.img_id) {
                const imagen = cloudinary.url(novedad.img_id, {
                    width: 960,
                    height: 300,
                    crop: 'fill'
                });
                return { ...novedad, imagen };
            }
            return { ...novedad, imagen: '' };
        });

        res.status(200).json(novedades);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Error al obtener novedades' });
    }
});

// GET /api/planes
router.get('/planes', async (req, res) => {
    try {
        res.status(200).json(await planesModel.getPlanes());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Error al obtener los planes' });
    }
});

// GET /api/entrenadores
router.get('/entrenadores', async (req, res) => {
    try {
        res.status(200).json(await entrenadoresModel.getEntrenadores());
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Error al obtener los entrenadores' });
    }
});

module.exports = router;
