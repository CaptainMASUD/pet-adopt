const express = require('express');
const { login, register } = require('../controllers/adminCrontroller');
const { getPurchaseHistory } = require('../controllers/petController');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/history', getPurchaseHistory);

module.exports = router;
