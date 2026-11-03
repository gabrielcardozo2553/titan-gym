const pool = require('../db');

async function insertContacto({ nombre, email, telefono, motivo, mensaje }) {
    const query = 'insert into contactos set ?';
    return pool.query(query, [{ nombre, email, telefono, motivo, mensaje }]);
}

async function getContactos() {
    return pool.query('select * from contactos order by fecha desc');
}

async function deleteContactoById(id) {
    return pool.query('delete from contactos where id = ?', [id]);
}

module.exports = { insertContacto, getContactos, deleteContactoById };
