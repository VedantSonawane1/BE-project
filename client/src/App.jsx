import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Facilities from './components/Facilities';
import Home from './components/Home';
import MyBookings from './components/MyBookings';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            // Fetch user data from the backend using the token
            axios.get('http://localhost:8000/oauth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setUser(response.data.user); // Update here
                toast.success('Logged in successfully!');
            })
            .catch(error => {
                console.error('Error fetching user', error);
                localStorage.removeItem('authToken');  // Remove invalid token
            });
        }
    }, []);

    // Handle login redirect (get token from URL after OAuth)
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (token) {
            localStorage.setItem('authToken', token);  // Save token in localStorage
            window.history.replaceState({}, document.title, "/");  // Clean URL
            window.location.reload();  // Refresh the page to apply the session
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:8000/oauth/';  // OAuth login
    };

    useEffect(() => {
        console.log("User state updated: ", user); // Log when user state updates
    }, [user]);

    return (
        <>
            <Router>
                <Navbar user={user} onLogin={handleLogin} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/facilities" element={<Facilities user={user} />} />
                    <Route path="/bookings" element={<MyBookings user={user} />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
};

export default App;
