const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosModel');

router.get('/', (req, res) => {
    res.render('admin/login', { layout: 'admin/layout' });
});

router.post('/', async (req, res) => {
    try {
        const { usuario, password } = req.body;
        if (typeof usuario !== 'string' || typeof password !== 'string' || !usuario || !password) {
            return res.render('admin/login', { layout: 'admin/layout', error: true });
        }
        const data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

        if (data) {

            req.session.regenerate(err => {
                if (err) throw err;
                req.session.id_usuario = data.id;
                req.session.nombre = data.usuario;
                req.session.save(() => res.redirect('/admin/novedades'));
            });
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
