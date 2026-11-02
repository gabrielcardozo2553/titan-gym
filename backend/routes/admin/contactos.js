const express = require('express');
const router = express.Router();
const contactosModel = require('../../models/contactosModel');

// Listado de mensajes recibidos desde el formulario de contacto
router.get('/', async (req, res) => {
    try {
        const contactos = await contactosModel.getContactos();
        res.render('admin/contactos', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            contactos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('No se pudieron cargar los mensajes');
    }
});

router.get('/eliminar/:id', async (req, res) => {
    try {
        await contactosModel.deleteContactoById(req.params.id);
    } catch (error) {
        console.error(error);
    }
    res.redirect('/admin/contactos');
});

module.exports = router;
