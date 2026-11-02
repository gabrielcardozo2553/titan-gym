const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel');

router.get('/', (req, res) => {
    res.render('admin/login', { layout: 'admin/layout' });
});

router.post('/', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', { layout: 'admin/layout', error: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('admin/login', {
            layout: 'admin/layout',
            error: true,
            message: 'Error del servidor, intentá de nuevo.'
        });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;
