import React from 'react';
import Tilt from 'react-parallax-tilt';

const FacilityCard = ({ facility, onSelect }) => {
    return (
        <Tilt
            className="Tilt"
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
            scale={1.05}
            transitionSpeed={400}
            style={{ height: 250, width: 300 }}
        >
            <div
                className="Tilt-inner bg-cover bg-center shadow-md p-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{
                    backgroundImage: `url('./img2.jpg')`, // Background image
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background color
                    backgroundBlendMode: 'overlay', // Blend mode
                    backdropFilter: 'blur(6px)', // Optional blur effect for a glass-like effect
                }}
            >
                <h3 className="text-lg font-semibold text-white">{facility.name}</h3>
                <p className="text-sm text-white">{facility.description}</p>
                <button
                    onClick={onSelect}
                    className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-400 transition duration-300"
                >
                    Book Now
                </button>
            </div>
        </Tilt>
    );
};

export default FacilityCard;
    