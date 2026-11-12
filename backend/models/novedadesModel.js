const pool = require('../db');

async function getNovedades() {
    const query = 'select * from novedades order by fecha desc';
    return pool.query(query);
}

async function getNovedadesConAutor() {
    const query = `select n.*, u.usuario as autor
                   from novedades n
                   left join usuarios u on u.id = n.id_usuario
                   order by n.fecha desc`;
    return pool.query(query);
}

async function getNovedadById(id) {
    const query = 'select * from novedades where id = ?';
    const rows = await pool.query(query, [id]);
    return rows[0];
}

async function insertNovedad(obj) {

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

module.exports = { getNovedades, getNovedadesConAutor, getNovedadById, insertNovedad, modificarNovedadById, deleteNovedadById };
