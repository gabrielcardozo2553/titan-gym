const pool = require('../db');

async function getPlanes() {
    return pool.query('select * from planes order by precio asc');
}

async function getPlanById(id) {
    const rows = await pool.query('select * from planes where id = ?', [id]);
    return rows[0];
}

module.exports = { getPlanes, getPlanById };
