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
async function enviarMail({ nombre, email, telefono, motivo, plan, mensaje }) {
    if (!process.env.SMTP_HOST) return;

    const smtp = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await smtp.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `Nueva consulta de ${nombre} - Atletic Gym`,
        html: `<p><strong>Nombre:</strong> ${esc(nombre)}</p>
               <p><strong>Email:</strong> ${esc(email)}</p>
               <p><strong>Motivo:</strong> ${esc(motivo) || '-'}</p>
               <p><strong>Plan de interés:</strong> ${esc(plan) || '-'}</p>
               <p><strong>Teléfono:</strong> ${esc(telefono) || '-'}</p>
               <p><strong>Mensaje:</strong> ${esc(mensaje)}</p>`
    });
}

// POST /api/contacto -> guarda el mensaje (y lo envía por mail si hay SMTP)
router.post('/contacto', async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;
    // El motivo es opcional; se limita el largo para no guardar textos enormes
    const motivo = req.body.motivo ? String(req.body.motivo).slice(0, 60) : null;

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
        // El plan de interés es opcional, pero si viene tiene que existir en la base
        let id_plan = null;
        let plan = null;
        if (req.body.id_plan !== undefined && req.body.id_plan !== null && req.body.id_plan !== '') {
            const numero = Number(req.body.id_plan);
            plan = Number.isInteger(numero) && numero > 0 ? await planesModel.getPlanById(numero) : undefined;
            if (!plan) {
                return res.status(400).json({ error: true, message: 'El plan elegido no es válido.' });
            }
            id_plan = plan.id;
        }

        await contactosModel.insertContacto({ nombre, email, telefono, motivo, id_plan, mensaje });

        // El mensaje ya quedó guardado; si falla el mail solo se registra el error
        try {
            await enviarMail({ nombre, email, telefono, motivo, plan: plan ? plan.nombre : null, mensaje });
        } catch (err) {
            console.error('No se pudo enviar el mail:', err.message);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: 'No pudimos guardar tu mensaje.' });
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
