import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogin }) => {
    return (
        <nav className="bg-transparent p-3 fixed w-full top-0 z-10">
            <div className="container mx-auto flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg px-6 py-2">
                {/* Wrap the Booking Buddy title with Link to navigate to home */}
                <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
                    Booking Buddy
                </Link>
                <div>
                    <Link to="/facilities" className="text-white mx-4 hover:text-blue-200 transition duration-300">Facilities</Link>
                    <Link to="/bookings" className="text-white mx-4 hover:text-blue-200 transition duration-300">My Bookings</Link>
                    {!user ? (
                        <button 
                            onClick={onLogin} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300">
                            Login
                        </button>
                    ) : (
                        <span className="text-white">Welcome, {user.name}</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
