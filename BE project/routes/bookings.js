const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/User');
const { createCalendarEvent } = require('../utils/googleCalendar');

// POST route for creating a booking
router.post('/', async (req, res) => {
    const { userId, facilityId, facilityName, startTime, endTime } = req.body;

    if (!userId || !facilityId || !facilityName || !startTime || !endTime) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Find the user's tokens in the database
        const user = await User.findOne({ googleId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the booking in the database
        const newBooking = await Booking.create({ userId, facilityId, facilityName, startTime, endTime });

        // Create event in Google Calendar
        const event = {
            summary: `Booking for Facility ${facilityName}`, // Use facilityName instead of facilityId
            start: {
                dateTime: new Date(startTime).toISOString(),  // Convert start time to ISO format
                timeZone: 'UTC', // Optional: You can dynamically set user's timeZone
            },
            end: {
                dateTime: new Date(endTime).toISOString(),    // Convert end time to ISO format
                timeZone: 'UTC',
            },
        };

        // Call the function to create an event in Google Calendar
        await createCalendarEvent(user, event);

        res.status(201).json({ message: 'Booking created and event added to calendar.', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking or calendar event:', error);
        res.status(500).json({ message: 'Error creating booking or calendar event.' });
    }
});

module.exports = router;
