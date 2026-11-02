const express = require('express');
const router = express.Router();
const util = require('util');
const cloudinary = require('cloudinary').v2;
const novedadesModel = require('../../models/novedadesModel');

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

const CATEGORIAS = ['clases', 'eventos', 'consejos', 'promociones'];

// Marca como seleccionada la categoría actual para el <select> de la vista
const armarCategorias = (actual) =>
    CATEGORIAS.map(valor => ({ valor, seleccionada: valor === actual }));

// Listado
router.get('/', async (req, res) => {
    try {
        let novedades = await novedadesModel.getNovedades();

        novedades = novedades.map(novedad => {
            if (novedad.img_id) {
                const imagen = cloudinary.image(novedad.img_id, {
                    width: 80,
                    height: 80,
                    crop: 'fill'
                });
                return { ...novedad, imagen };
            }
            return { ...novedad, imagen: '' };
        });

        res.render('admin/novedades', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedades
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('No se pudieron cargar las novedades');
    }
});

// Alta
router.get('/agregar', (req, res) => {
    res.render('admin/agregar', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        categorias: armarCategorias('clases')
    });
});

router.post('/agregar', async (req, res) => {
    const { titulo, subtitulo, cuerpo, categoria } = req.body;
    try {
        if (!titulo || !subtitulo || !cuerpo) {
            return res.render('admin/agregar', {
                layout: 'admin/layout',
                usuario: req.session.nombre,
                categorias: armarCategorias(categoria),
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }

        let img_id = null;
        if (req.files && req.files.imagen) {
            img_id = (await uploader(req.files.imagen.tempFilePath)).public_id;
        }

        await novedadesModel.insertNovedad({
            titulo, subtitulo, cuerpo,
            categoria: CATEGORIAS.includes(categoria) ? categoria : 'clases',
            img_id
        });
        res.redirect('/admin/novedades');
    } catch (error) {
        console.error(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            categorias: armarCategorias(categoria),
            error: true,
            message: 'No se cargó la novedad'
        });
    }
});

// Baja
router.get('/eliminar/:id', async (req, res) => {
    try {
        const novedad = await novedadesModel.getNovedadById(req.params.id);
        if (novedad && novedad.img_id) {
            await destroy(novedad.img_id);
        }
        await novedadesModel.deleteNovedadById(req.params.id);
    } catch (error) {
        console.error(error);
    }
    res.redirect('/admin/novedades');
});

// Modificación
router.get('/modificar/:id', async (req, res) => {
    try {
        const novedad = await novedadesModel.getNovedadById(req.params.id);
        if (!novedad) return res.redirect('/admin/novedades');

        res.render('admin/modificar', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedad,
            categorias: armarCategorias(novedad.categoria)
        });
    } catch (error) {
        console.error(error);
        res.redirect('/admin/novedades');
    }
});

router.post('/modificar', async (req, res) => {
    try {
        let img_id = req.body.img_original || null;
        let borrar_img_vieja = false;

        if (req.body.img_delete === '1') {
            img_id = null;
            borrar_img_vieja = true;
        } else if (req.files && req.files.imagen) {
            img_id = (await uploader(req.files.imagen.tempFilePath)).public_id;
            borrar_img_vieja = true;
        }

        if (borrar_img_vieja && req.body.img_original) {
            await destroy(req.body.img_original);
        }

        const obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            categoria: CATEGORIAS.includes(req.body.categoria) ? req.body.categoria : 'clases',
            img_id
        };

        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.error(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedad: { ...req.body, img_id: req.body.img_original },
            categorias: armarCategorias(req.body.categoria),
            error: true,
            message: 'No se modificó la novedad'
        });
    }
});

module.exports = router;
