import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer'; // Import the Footer component

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/bookings/user/123') // Replace with real userId
            .then(response => setBookings(response.data.bookings))
            .catch(error => console.error(error));
    }, []);

    return (
        <div
            className="container mx-auto my-auto min-h-screen"
            style={{
                background: 'linear-gradient(180deg, #808080, #000000)', // Grey to black gradient
                color: 'white' // Set font color to white
            }}
        >
            <h2 className="text-2xl font-bold pr-4 pl-4 pb-4 pt-20 text-white">My Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking._id} className="bg-gray-900 p-4 mb-2 rounded shadow text-white"> {/* Make the card transparent */}
                        <p>Facility ID: {booking.facilityId}</p>
                        <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
                        <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            <Footer /> {/* Add Footer here */}
        </div>
    );
};

export default MyBookings;
