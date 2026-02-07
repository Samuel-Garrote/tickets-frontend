import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function TicketForm({ editTicket, onFinishEdit }) {
  const { dispatch } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState(''); // Feedback

  useEffect(() => {
    if (editTicket) {
      setTitle(editTicket.title);
      setDescription(editTicket.description);
      setPriority(editTicket.priority || 'low');
      setTags(editTicket.tags ? editTicket.tags.join(',') : '');
    }
  }, [editTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTicket) {
      const updatedTicket = {
        ...editTicket,
        title,
        description,
        priority,
        tags: tags.split(',').map(t => t.trim()).filter(t => t)
      };
      dispatch({ type: 'UPDATE_TICKET', ticket: updatedTicket });
      if (onFinishEdit) onFinishEdit();
      setMessage('Ticket updated!');
    } else {
      const newTicket = {
        title,
        description,
        priority,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
      };

      fetch("https://tickets-backend-production-ecbc.up.railway.app/tickets", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      })
        .then(res => res.json())
        .then(ticket => {
          dispatch({ type: 'ADD_TICKET', ticket });
          setTitle('');
          setDescription('');
          setPriority('low');
          setTags('');
          setMessage('Ticket added!');
          setTimeout(() => setMessage(''), 2000); // Feedback desaparece
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>{editTicket ? 'Edit Ticket' : 'Add Ticket'}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ marginRight: '10px' }}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ marginRight: '10px' }}
      />

      <button
        type="submit"
        style={{
          cursor: 'pointer',
          padding: '5px 10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        {editTicket ? 'Save Changes' : 'Add Ticket'}
      </button>

      {message && <p style={{ color: 'green', marginTop: '5px' }}>{message}</p>}
    </form>
  );
}
