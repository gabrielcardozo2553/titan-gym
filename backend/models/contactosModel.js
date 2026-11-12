const pool = require('../db');

async function insertContacto({ nombre, email, telefono, motivo, id_plan, mensaje }) {
    const query = 'insert into contactos set ?';
    return pool.query(query, [{ nombre, email, telefono, motivo, id_plan, mensaje }]);
}

async function getContactos() {
    const query = `select c.*, p.nombre as plan
                   from contactos c
                   left join planes p on p.id = c.id_plan
                   order by c.fecha desc`;
    return pool.query(query);
}

async function deleteContactoById(id) {
    return pool.query('delete from contactos where id = ?', [id]);
}

module.exports = { insertContacto, getContactos, deleteContactoById };
