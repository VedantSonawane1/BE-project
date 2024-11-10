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
            <div className="Tilt-inner bg-white shadow-md p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold">{facility.name}</h3>
                <p className="text-sm">{facility.description}</p>
                <button
                    onClick={onSelect}
                    className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                >
                    Book Now
                </button>
            </div>
        </Tilt>
    );
};

export default FacilityCard;
