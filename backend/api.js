const express = require('express');
const nodemailer = require('nodemailer');
const db = require('./db');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

router.post('/contacto', async (req, res) => {
    
});

router.get('/novedades', async (req, res) => {
    try {
        let novedades = await db.query('SELECT * FROM novedades ORDER BY fecha DESC');

        novedades = novedades.map(novedad => {
            if (novedad.img_id) {
                const imagen = cloudinary.url(novedad.img_id, {
                    width: 960,
                    height: 200,
                    crop: 'fill'
                });
                return { ...novedad, imagen };
            } else {
                return { ...novedad, imagen: '' };
            }
        });

        res.status(200).json(novedades);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: true,
            message: 'Error al obtener novedades'
        });
    }
});

module.exports = router;