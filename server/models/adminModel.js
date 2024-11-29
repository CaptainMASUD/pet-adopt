const db = require('../db/config');

const Admin = {
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM admins WHERE username = ?', [username], callback);
    },
    create: (admin, callback) => {
        db.query('INSERT INTO admins SET ?', admin, callback);
    }
};

module.exports = Admin;
