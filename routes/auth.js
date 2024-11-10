// http://localhost:5173/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA0MjRmN2ZmN2FhMDEwMmYxMGY2MGYiLCJnb29nbGVJZCI6IjExMTUwNjQyMjY3OTk3MTIwOTcxNyIsImlhdCI6MTcyODU5MjkyMCwiZXhwIjoxNzI4NTk2NTIwfQ.jCYAnqx8h1U90v0RJQNQyX8z-qY8-YNpVDWFrU1WgAE

// Required dependencies
const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');  // For JWT
const { ObjectId } = require('mongodb'); // Import ObjectId from mongodb
const User = require('../models/User');
const credentials = require('../credentials.json');
const router = express.Router();

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// JWT secret key (ensure this is secure in production)
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        console.log("Middleware user : ",user);
        req.user = user;
        next();
    });
};

// Add a new route for `/me`
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Use the userId from the JWT payload
        const user = await User.findById(new ObjectId(userId)); // Convert userId to ObjectId
        // const user = await User.findById(req.user.googleId); // Use the userId from the JWT payload
        console.log("User : ",user);
        console.log("user.userId : ",user.userId);
        console.log("user.googleId : ",user.googleId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user data.' });
    }
});



// Route to initiate OAuth
router.get('/', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
    });
    res.redirect(authUrl);
});

// Callback route
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        console.log("1")
        // Exchange authorization code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        console.log("2")
        // Use the access token to get the user's profile information
        const oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: 'v2',
        });
        console.log("3")
        const userInfo = await oauth2.userinfo.get();
        console.log("4")
        const { id, email, name } = userInfo.data;
        console.log("Id : ",id)
        console.log("Email : ",email)
        console.log("Name : ",name)
        console.log("5")



        // Save or update user in the database

      
        const user = await User.findOneAndUpdate(
            { googleId: id },
            {
                googleId: id,
                email,
                name,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token || '',
                tokenExpiry: new Date(tokens.expiry_date),
            },
            { upsert: true, new: true }
        );
        console.log("6")

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, googleId: id },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token valid for 1 hour
        );
        console.log("7")

        // Redirect user back to homepage with the JWT in the query string
        res.redirect(`http://localhost:5173/?token=${token}`);
        console.log("8")
    } catch (error) {
        console.error('Error during OAuth callback:', error);
        res.status(500).send('Authentication failed.');
    }
});

module.exports = router;
