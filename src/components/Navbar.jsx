// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Simple navigation bar
export default function Navbar() {
    return (
    <nav style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white' }}>
      {/* App title */}
        <h2 style={{ display: 'inline', marginRight: '20px' }}>Tickets App</h2>

      {/* Navigation link */}
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        Home
        </Link>
    </nav>
    );
}
