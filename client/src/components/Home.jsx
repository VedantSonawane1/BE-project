// Home.jsx
import React from 'react';
import './Home.css'; // Importing CSS file for styles
import Footer from './Footer'; // Import the Footer component



export default function Home() {
  return (
    <main className="home-container">
      <div className="home-background">
        <h1 className="home-title">Welcome to Booking Buddy!</h1>
      </div>
      
      <Footer /> {/* Add Footer here */}
      
    </main>
  );
}
