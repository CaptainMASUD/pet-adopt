// routes/petRoutes.js

const express = require('express');
const { getAllPets, addPet, purchasePet, getPurchaseHistory, updatePet, deletePet } = require('../controllers/petController');
const router = express.Router();

router.get('/', getAllPets);
router.post('/add', addPet);
router.post('/purchase', purchasePet); // New route for purchasing a pet
router.get('/history', getPurchaseHistory);

// New update route
router.put('/update/:id', updatePet);

// New delete route
router.delete('/delete/:id', deletePet);

module.exports = router;
