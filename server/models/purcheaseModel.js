const db = require('../db/config');

const Purchase = {
    getAll: (callback) => {
        db.query('SELECT * FROM purchases', callback);
    },
    create: (purchase, callback) => {
        db.query('INSERT INTO purchases SET ?', purchase, callback);
    },
    getByPetId: (petId, callback) => {
        db.query('SELECT * FROM purchases WHERE pet_id = ?', [petId], callback);
    }
};

module.exports = Purchase;
