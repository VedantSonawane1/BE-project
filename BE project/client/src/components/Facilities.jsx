import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import FacilityCard from './FacilityCard';
import BookingForm from './BookingForm';

const Facilities = ({ user }) => {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        axios.get('http://localhost:8000/facilities/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => setFacilities(response.data))
        .catch(error => {
            console.error('Failed to fetch facilities:', error);
            toast.error('Failed to fetch facilities');
        });
    }, []);

    const handleBooking = (facilityId, startTime, endTime) => {
        if (!user || !user.googleId) {
            toast.error('Please log in to book a facility.');
            return;
        }

        const token = localStorage.getItem('authToken');
        axios.post('http://localhost:8000/bookings', {
            userId: user.googleId,
            facilityId,
            startTime,
            endTime
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            toast.success('Booking Successful');
            setSelectedFacility(null);  // Reset after booking
        })
        .catch(error => {
            console.error('Booking failed:', error.response?.data || error.message);
            toast.error('Booking Failed');
        });
    };

    return (
        <div className="container mx-8 my-8 "> {/* Added right padding */}
            <h2 className="text-2xl font-bold mb-4 mt-20">Available Facilities</h2>
            {/* Use grid to display four cards per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {facilities.map(facility => (
                    <FacilityCard
                        key={facility._id}
                        facility={facility}
                        onSelect={() => setSelectedFacility(facility)}
                    />
                ))}
            </div>

            {selectedFacility && (
                <BookingForm
                    facility={selectedFacility}
                    onBooking={handleBooking}
                    onClose={() => setSelectedFacility(null)}
                />
            )}
        </div>
    );
};

export default Facilities;
