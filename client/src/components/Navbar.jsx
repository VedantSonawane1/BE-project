import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaListUl, FaCalendarAlt } from 'react-icons/fa'; // Importing specific icons
import { FiLogIn } from 'react-icons/fi'; // Login Icon

const Navbar = ({ user, onLogin }) => {
    return (
        <nav className="bg-transparent p-3 fixed w-full top-0 z-10">
            <div className="container mx-auto flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg px-6 py-2">
                {/* Wrap the Booking Buddy title with Link to navigate to home */}
                <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300 flex items-center">
                    <FaHome className="mr-2" /> {/* Home Icon */}
                    Booking Buddy
                </Link>
                <div className="flex space-x-4"> {/* Space between navbar items */}
                    <Link to="/facilities" className="text-white hover:text-blue-200 transition duration-300 flex items-center">
                        <FaListUl className="mr-2" /> {/* Facilities Icon */}
                        Facilities
                    </Link>
                    <Link to="/bookings" className="text-white hover:text-blue-200 transition duration-300 flex items-center">
                        <FaCalendarAlt className="mr-2" /> {/* Bookings Icon */}
                        My Bookings
                    </Link>
                    {!user ? (
                        <button 
                            onClick={onLogin} 
                            className="text-white hover:text-blue-200 transition duration-300 flex items-center"
                        >
                            <FiLogIn className="mr-2" /> {/* Login Icon */}
                            Login
                        </button>
                    ) : (
                        <span className="text-white flex items-center">
                            <FaHome className="mr-2" /> {/* User Home Icon */}
                            Welcome, {user.name}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
