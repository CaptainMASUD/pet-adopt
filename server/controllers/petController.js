// controllers/petController.js

const Pet = require('../models/petModel');
const Purchase = require('../models/purcheaseModel');

exports.getAllPets = (req, res) => {
    Pet.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
};

exports.addPet = (req, res) => {
    const { name, breed, birth_date, gender, price } = req.body;
    Pet.create({ name, breed, birth_date, gender, price }, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Pet added successfully.');
    });
};

exports.purchasePet = (req, res) => {
    const { pet_id, buyer_name, buyer_contact } = req.body;

    // Check if pet exists
    Pet.getById(pet_id, (err, petResults) => {
        if (err) return res.status(500).send(err);
        if (petResults.length === 0) return res.status(404).send('Pet not found.');

        // Check if pet has already been purchased
        Purchase.getByPetId(pet_id, (err, purchaseResults) => {
            if (err) return res.status(500).send(err);
            if (purchaseResults.length > 0) return res.status(400).send('Pet has already been purchased.');

            // Add purchase record
            Purchase.create({ pet_id, buyer_name, buyer_contact }, (err) => {
                if (err) return res.status(500).send(err);
                res.send('Pet purchased successfully!');
            });
        });
    });
};

exports.getPurchaseHistory = (req, res) => {
    Purchase.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
};

// New update method
exports.updatePet = (req, res) => {
    const petId = req.params.id;
    const { name, breed, birth_date, gender, price } = req.body;

    // Check if pet exists
    Pet.getById(petId, (err, petResults) => {
        if (err) return res.status(500).send(err);
        if (petResults.length === 0) return res.status(404).send('Pet not found.');

        // Update pet
        Pet.update(petId, { name, breed, birth_date, gender, price }, (err) => {
            if (err) return res.status(500).send(err);
            res.send('Pet updated successfully.');
        });
    });
};

// New delete method
exports.deletePet = (req, res) => {
    const petId = req.params.id;

    // Check if pet exists
    Pet.getById(petId, (err, petResults) => {
        if (err) return res.status(500).send(err);
        if (petResults.length === 0) return res.status(404).send('Pet not found.');

        // Delete pet
        Pet.delete(petId, (err) => {
            if (err) return res.status(500).send(err);
            res.send('Pet deleted successfully.');
        });
    });
};
