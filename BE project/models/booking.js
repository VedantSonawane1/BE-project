const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    facilityId: {
        type: String,
        required: true,
    },
    facilityName: {  // Include facilityName in the schema
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
