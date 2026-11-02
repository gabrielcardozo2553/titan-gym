const pool = require('../db');

async function getPlanes() {
    return pool.query('select * from planes order by precio asc');
}

module.exports = { getPlanes };
