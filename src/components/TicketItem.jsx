import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function TicketItem({ ticket }) {
    const {dispatch} = useContext(AppContext);

    const handleDelete = () => {
    fetch(`https://tickets-backend-production-e500.up.railway.app/tickets/${ticket.id}`, { method: 'DELETE' })
        .then(() => dispatch({ type: 'DELETE_TICKET', id: ticket.id }))
        .catch(err => console.log(err));
    };

    let color = 'green';
    if (ticket.priority === 'medium') color = 'orange';
    if (ticket.priority === 'high') color = 'red';

    return (
    <div
        style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px'
        }}
        onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)'}
        onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
    >
        <Link to={`/tickets/${ticket.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <h3>
            {ticket.title}
            <span style={{
            backgroundColor: color,
            color: 'white',
            padding: '2px 6px',
            marginLeft: '10px',
            borderRadius: '4px',
            fontSize: '12px'
            }}>
            {ticket.priority}
            </span>
        </h3>
        <p>{ticket.description}</p>
        <p>Status: {ticket.status}</p>
            </Link>

        <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>

        {ticket.tags && ticket.tags.length > 0 && (
        <div>
            {ticket.tags.map((tag, i) => (
            <span key={i} style={{
                backgroundColor: '#eee',
                padding: '2px 6px',
                marginRight: '5px',
                borderRadius: '4px',
                fontSize: '12px'
            }}>
                {tag}
            </span>
            ))}
        </div>
        )}

        <button
        onClick={handleDelete}
        style={{
          marginTop: '5px',
          padding: '5px 10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: '#dc3545',
          color: 'white'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#a71d2a'}
        onMouseOut={e => e.target.style.backgroundColor = '#dc3545'}
      >
        Delete
      </button>
    </div>
  );
}
