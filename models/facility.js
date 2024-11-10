const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    location: String,
    capacity: Number
});

module.exports = mongoose.model('Facility', facilitySchema);
