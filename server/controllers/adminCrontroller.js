const Admin = require('../models/adminModel');

exports.login = (req, res) => {
    const { username, password } = req.body;

    Admin.findByUsername(username, (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.length === 0 || results[0].password !== password || results[0].isAdmin === 0) {
            return res.status(401).send('Invalid credentials or not an admin.');
        }

        // Remove the password from the response
        const { password: _, ...adminData } = results[0];

        res.status(200).send({
            message: 'Login successful!',
            admin: adminData
        });
    });
};
exports.register = (req, res) => {
    const { username, email, password } = req.body; // Removed `isAdmin` from request

    const newAdmin = {
        username,
        email,
        password,
        isAdmin: 0 // Automatically set to false (0)
    };

    Admin.create(newAdmin, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Admin registered successfully, awaiting admin status activation.');
    });
};
