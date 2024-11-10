const express = require('express');
const cors = require('cors');  // Import cors
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingsRoute = require('./routes/bookings');
const facilitiesRoute = require('./routes/facilities');
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/oauth', authRoute);
app.use('/bookings', bookingsRoute);
app.use('/facilities', facilitiesRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
