// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const adminRoutes = require('./routes/adminRoutes');
const petRoutes = require('./routes/petRoutes');
require('./db/initTables'); // Initialize tables

const app = express();

// Enable CORS
app.use(cors({
    origin: '*', // Replace '*' with specific origin(s) if needed, e.g., 'http://localhost:3001'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/pets', petRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
