const pool = require('../db');

async function getEntrenadores() {
    return pool.query('select * from entrenadores order by id asc');
}

module.exports = { getEntrenadores };
