import React, { useState } from 'react';

const BookingForm = ({ facility, onBooking, onClose }) => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleBooking = (e) => {
        e.preventDefault();

        if (!startDate || !startTime || !endDate || !endTime) {
            alert('Please select both start and end dates and times.');
            return;
        }

        // Call the onBooking function to proceed with the booking
        onBooking(facility._id, facility.name, `${startDate} ${startTime}`, `${endDate} ${endTime}`);
        alert(`Booking Successful for ${facility.name}!`);
    };

    const styles = {
        overlay: {
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
            zIndex: 50,
        },
        formContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // More transparent white
            backdropFilter: 'blur(10px)', // Blur effect
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
        },
        header: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center',
            color: '#ffffff', // Header color set to white
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 'medium',
            color: '#ffffff', // Label color set to white
            marginBottom: '0.25rem',
        },
        input: {
            marginTop: '0.25rem',
            padding: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.5)', // Slightly transparent border
            borderRadius: '0.375rem',
            width: '100%',
            outline: 'none',
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // More transparent input fields
            color: '#ffffff', // Input text color set to white
        },
        button: {
            backgroundColor: '#2563eb', // Blue 600
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        cancelButton: {
            backgroundColor: '#4a5568', // Gray 600
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
        },
        placeholder: {
            color: '#ffffff', // Placeholder color set to white
            opacity: 0.8, // Optional: Set opacity for better visibility
        },
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.formContainer}>
                <h2 style={styles.header}>Book {facility.name}</h2>
                <form onSubmit={handleBooking}>
                    <div className="mb-4">
                        <label htmlFor="startDate" style={styles.label}>Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={styles.input}
                            placeholder="Select start date"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startTime" style={styles.label}>Start Time</label>
                        <input
                            type="time"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            style={styles.input}
                            placeholder="Select start time"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" style={styles.label}>End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={styles.input}
                            placeholder="Select end date"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endTime" style={styles.label}>End Time</label>
                        <input
                            type="time"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            style={styles.input}
                            placeholder="Select end time"
                        />
                    </div>
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.button}>Confirm Booking</button>
                        <button type="button" style={styles.cancelButton} onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
