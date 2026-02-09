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

  // Filtrado
  const filteredTickets = state.tickets.filter(ticket =>
    ticket.title?.toLowerCase().includes(searchText.toLowerCase()) // ? para evitar undefined
  );

  // Orden
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === 'newest') {
      return dateB - dateA; // más reciente primero
    } else {
      return dateA - dateB; // más antiguo primero
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
