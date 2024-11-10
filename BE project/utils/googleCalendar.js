const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Function to create a Google Calendar event
const createCalendarEvent = async (user, event) => {
    const oauth2Client = new OAuth2();
    oauth2Client.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary', // Ensure this is correct, or use specific calendarId
            resource: event,
        });
        console.log('Calendar event created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw new Error('Failed to create calendar event');
    }
};

module.exports = { createCalendarEvent };
