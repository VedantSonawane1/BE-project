import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/bookings/user/123') // Replace with real userId
            .then(response => setBookings(response.data.bookings))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-2xl font-bold mr-4 ml-4 mb-4 mt-20">My Bookings</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking._id} className="bg-gray-100 p-4 mb-2 rounded shadow">
                        <p>Facility ID: {booking.facilityId}</p>
                        <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
                        <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyBookings;
