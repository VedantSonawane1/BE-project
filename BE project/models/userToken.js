const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accessToken: String,
    refreshToken: String,
    expiryDate: Date
});

module.exports = mongoose.model('UserToken', userTokenSchema);
