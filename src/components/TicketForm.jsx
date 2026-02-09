import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';


export default function TicketForm({ editTicket, onFinishEdit }) {
  const { dispatch } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  const BACKEND_URL = 'https://tickets-backend-production-e500.up.railway.app';

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

    const ticketData = {
      title,
      description,
      priority,
      tags: tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (editTicket) {
      // EDIT ticket
      fetch(`${BACKEND_URL}/tickets/${editTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      })
        .then(res => res.json())
        .then(updatedTicket => {
          dispatch({ type: 'UPDATE_TICKET', ticket: updatedTicket });
          if (onFinishEdit) onFinishEdit();
          setMessage('Ticket updated!');
          setTimeout(() => setMessage(''), 2000);
        })
        .catch(err => console.error(err));
    } else {
      // NEW ticket
      fetch(`${BACKEND_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      })
        .then(res => res.json())
        .then(ticket => {
          dispatch({ type: 'ADD_TICKET', ticket });
          setTitle('');
          setDescription('');
          setPriority('low');
          setTags('');
          setMessage('Ticket added!');
          setTimeout(() => setMessage(''), 2000);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>{editTicket ? 'Edit Ticket' : 'Add Ticket'}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">
        {editTicket ? 'Save Changes' : 'Add Ticket'}
      </button>

      {message && <p className="ticket-message">{message}</p>}
    </form>
  );
}
