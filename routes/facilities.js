const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility'); // Create a Facility model as needed

// POST route for creating a facility
router.post('/', async (req, res) => {
    try {
        const newFacility = await Facility.create(req.body);
        res.status(201).json(newFacility);
    } catch (error) {
        console.error('Error creating facility:', error);
        res.status(500).json({ message: 'Error creating facility.' });
    }
});

// GET route for fetching facilities
router.get('/', async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json(facilities);
    } catch (error) {
        console.error('Error fetching facilities:', error);
        res.status(500).json({ message: 'Error fetching facilities.' });
    }
});

// DELETE route for deleting a facility by ID
router.delete('/:id', async (req, res) => {
    try {
        const facilityId = req.params.id;
        const deletedFacility = await Facility.findByIdAndDelete(facilityId);
        if (!deletedFacility) {
            return res.status(404).json({ message: 'Facility not found.' });
        }
        res.status(200).json({ message: 'Facility deleted successfully.' });
    } catch (error) {
        console.error('Error deleting facility:', error);
        res.status(500).json({ message: 'Error deleting facility.' });
    }
});

module.exports = router;
