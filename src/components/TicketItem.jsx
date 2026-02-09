import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function TicketItem({ ticket,onEdit }) {
  const { dispatch } = useContext(AppContext);

  const handleDelete = () => {
    fetch(`https://tickets-backend-production-e500.up.railway.app/tickets/${ticket.id}`, {
      method: 'DELETE'
    })
      .then(() => dispatch({ type: 'DELETE_TICKET', id: ticket.id }))
      .catch(err => console.log(err));
  };

  // Color según prioridad
  let color = 'green';
  if (ticket.priority === 'medium') color = 'orange';
  if (ticket.priority === 'high') color = 'red';

  return (
    <div className="ticket-item">
      <Link to={`/tickets/${ticket.id}`} className="ticket-link">
        <h3>
          {ticket.title}{' '}
          <span className="ticket-priority" style={{ backgroundColor: color }}>
            {ticket.priority}
          </span>
        </h3>
        <p>{ticket.description}</p>
        <p>Status: {ticket.status}</p>
      </Link>

      <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>

      {ticket.tags && ticket.tags.length > 0 && (
        <div className="ticket-tags">
          {ticket.tags.map((tag, i) => (
            <span key={i} className="ticket-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Botones */}
      <div className="ticket-buttons">
        
        <button className="btn btn-edit" onClick={() => onEdit(ticket)}>Edit</button>

        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}
