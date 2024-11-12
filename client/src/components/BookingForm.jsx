import React, { useState } from 'react';

const BookingForm = ({ facility, onBooking, onClose }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startTime || !endTime) {
            alert('Please select both start and end times.');
            return;
        }
        // Send both facilityId and facilityName to the backend
        onBooking(facility._id, facility.name, startTime, endTime);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Book {facility.name}</h2> {/* Show facility name */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-900">Start Time</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-80 text-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-900">End Time</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white bg-opacity-80 text-gray-900"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Confirm</button>
                        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
