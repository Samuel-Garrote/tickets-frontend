import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import TicketItem from './TicketItem';

export default function TicketList() {
    const { state, dispatch } = useContext(AppContext);

    const [searchText, setSearchText] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

     useEffect(() => {
    fetch("https://tickets-backend-production-e500.up.railway.app/tickets")
        .then(res => res.json())
        .then(data => dispatch({ type: "SET_TICKETS", tickets: data }))
        .catch(err => console.log(err));
    }, [dispatch]);

    const filteredTickets = state.tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOrder === 'newest') {
        return b.createdAt - a.createdAt;
    } else {
        return a.createdAt - b.createdAt;
    }
    });

    return (
    <div>
        <h2>Tickets</h2>

      {/* Input para filtrar */}
        <input
        type="text"
        placeholder="Search by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '10px' }}
        />

      {/* Botones para ordenar */}
        <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setSortOrder('newest')}>Newest First</button>
        <button onClick={() => setSortOrder('oldest')}>Oldest First</button>
        </div>

      {/* Lista ordenada */}
        {sortedTickets.length === 0 ? (
        <p>No tickets found</p>
        ) : (
        sortedTickets.map(ticket => (
            <TicketItem key={ticket.id} ticket={ticket} />
        ))
      )}
    </div>
  );
}
