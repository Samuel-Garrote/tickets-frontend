// src/pages/Home.jsx
import React from 'react';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';

export default function Home() {
    return (
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the Tickets App!</p>
        <TicketList/>
        <TicketForm/>
    </div>
    );
}
