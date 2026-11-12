const express = require('express');
const router = express.Router();
const util = require('util');
const cloudinary = require('cloudinary').v2;
const novedadesModel = require('../../models/novedadesModel');

const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

const CATEGORIAS = ['clases', 'eventos', 'consejos', 'promociones'];

const armarCategorias = (actual) =>
    CATEGORIAS.map(valor => ({ valor, seleccionada: valor === actual }));

const archivoImagen = (req) => (req.files && req.files.imagen) ? req.files.imagen : undefined;
const esImagen = (archivo) => /^image\//.test(archivo.mimetype);

router.get('/', async (req, res) => {
    try {
        let novedades = await novedadesModel.getNovedadesConAutor();

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

router.get('/agregar', (req, res) => {
    res.render('admin/agregar', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        categorias: armarCategorias('clases')
    });
});

router.post('/agregar', async (req, res) => {
    const { titulo, subtitulo, cuerpo, categoria } = req.body;

    const mostrarError = (message) => res.render('admin/agregar', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        categorias: armarCategorias(categoria),
        error: true,
        message
    });

    try {
        if (!titulo || !subtitulo || !cuerpo) {
            return mostrarError('Todos los campos son requeridos');
        }

        const imagen = archivoImagen(req);
        if (imagen && !esImagen(imagen)) {
            return mostrarError('El archivo debe ser una imagen (jpg, png, webp...)');
        }

        let img_id = null;
        if (imagen) {
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        await novedadesModel.insertNovedad({
            titulo, subtitulo, cuerpo,
            categoria: CATEGORIAS.includes(categoria) ? categoria : 'clases',
            img_id,
            id_usuario: req.session.id_usuario
        });
        res.redirect('/admin/novedades');
    } catch (error) {
        console.error(error);
        mostrarError('No se cargó la novedad');
    }
});

router.post('/eliminar/:id', async (req, res) => {
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
    const { id, titulo, subtitulo, cuerpo, categoria, img_original } = req.body;

    const mostrarError = (message) => res.render('admin/modificar', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedad: { id, titulo, subtitulo, cuerpo, img_id: img_original },
        categorias: armarCategorias(categoria),
        error: true,
        message
    });

    try {
        if (!titulo || !subtitulo || !cuerpo) {
            return mostrarError('Todos los campos son requeridos');
        }

        const imagen = archivoImagen(req);
        if (imagen && !esImagen(imagen)) {
            return mostrarError('El archivo debe ser una imagen (jpg, png, webp...)');
        }

        let img_id = img_original || null;
        let borrar_img_vieja = false;

        if (req.body.img_delete === '1') {
            img_id = null;
            borrar_img_vieja = true;
        } else if (imagen) {
            img_id = (await uploader(imagen.tempFilePath)).public_id;
            borrar_img_vieja = true;
        }

        if (borrar_img_vieja && img_original) {
            await destroy(img_original);
        }

        await novedadesModel.modificarNovedadById({
            titulo, subtitulo, cuerpo,
            categoria: CATEGORIAS.includes(categoria) ? categoria : 'clases',
            img_id
        }, id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.error(error);
        mostrarError('No se modificó la novedad');
    }
});

module.exports = router;
