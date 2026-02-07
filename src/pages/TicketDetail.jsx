import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function TicketDetail() {
  const { id } = useParams(); // Captura el id de la URL
  const { state } = useContext(AppContext);

  // Buscar el ticket por id en el estado global
  const ticket = state.tickets.find(t => t.id.toString() === id);

  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div style={{ padding: '10px' }}>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      {ticket.tags && ticket.tags.length > 0 && (
        <div>
          {ticket.tags.map((tag, i) => (
            <span key={i} style={{ padding: '2px 6px', marginRight: '5px', backgroundColor: '#eee', borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>
    </div>
  );
}
