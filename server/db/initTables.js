const db = require('./config');

const initTables = () => {
    const adminTable = `
    CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin TINYINT(1) DEFAULT 0
    )`;

    const petTable = `
    CREATE TABLE IF NOT EXISTS pets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        breed VARCHAR(50) NOT NULL,
        birth_date DATE,
        gender ENUM('Male', 'Female') NOT NULL,
        price DECIMAL(10, 2) NOT NULL
    )`;

    const purchaseTable = `
    CREATE TABLE IF NOT EXISTS purchases (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pet_id INT NOT NULL,
        buyer_name VARCHAR(100) NOT NULL,
        buyer_contact VARCHAR(100),
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pet_id) REFERENCES pets(id)
    )`;

    db.query(adminTable, (err) => {
        if (err) console.error('Error creating admins table:', err.message);
    });

    db.query(petTable, (err) => {
        if (err) console.error('Error creating pets table:', err.message);
    });

    db.query(purchaseTable, (err) => {
        if (err) console.error('Error creating purchases table:', err.message);
    });
};

initTables();
