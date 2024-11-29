// models/petModel.js

const db = require('../db/config');

const Pet = {
    getAll: (callback) => {
        db.query('SELECT * FROM pets', callback);
    },
    create: (pet, callback) => {
        db.query('INSERT INTO pets SET ?', pet, callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM pets WHERE id = ?', [id], callback);
    },
    update: (id, pet, callback) => {
        db.query('UPDATE pets SET ? WHERE id = ?', [pet, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM pets WHERE id = ?', [id], callback);
    }
};

module.exports = Pet;
