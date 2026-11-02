const pool = require('../db');

async function getNovedades() {
    const query = 'select * from novedades order by fecha desc';
    return pool.query(query);
}

async function getNovedadById(id) {
    const query = 'select * from novedades where id = ?';
    const rows = await pool.query(query, [id]);
    return rows[0];
}

async function insertNovedad(obj) {
    // La fecha se completa automáticamente al crear la novedad
    obj.fecha = new Date();
    const query = 'insert into novedades set ?';
    return pool.query(query, [obj]);
}

async function modificarNovedadById(obj, id) {
    const query = 'update novedades set ? where id = ?';
    return pool.query(query, [obj, id]);
}

async function deleteNovedadById(id) {
    const query = 'delete from novedades where id = ?';
    return pool.query(query, [id]);
}

module.exports = { getNovedades, getNovedadById, insertNovedad, modificarNovedadById, deleteNovedadById };
