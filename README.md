Ticket System – Frontend

Frontend application for a simple ticket management system built with React.
The application allows users to create, view, edit and delete tickets through a REST API.

This project focuses on building a full CRUD interface and managing application state in a React application.

Tech Stack

React

React Router

Context API

JavaScript (ES6+)

CSS

REST API integration

Features

View list of tickets

Create new tickets

Edit existing tickets

Delete tickets

View ticket details

Global state management using Context API

Client-side routing with React Router

Project Structure
src/
 ├── components/
 │   ├── Navbar
 │   ├── TicketList
 │   ├── TicketItem
 │   └── TicketForm
 │
 ├── pages/
 │   ├── Tickets
 │   └── TicketDetail
 │
 ├── context/
 │   └── AppContext
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
State Management

The application uses React Context to manage global state for tickets.

This allows different components to access and update ticket data without passing props through multiple levels of the component tree.

Typical actions include:

adding new tickets

updating existing tickets

removing tickets

Ticket Operations

The frontend interacts with a backend REST API to perform ticket operations:

GET /tickets → retrieve all tickets

POST /tickets → create a new ticket

PUT /tickets/:id → update a ticket

DELETE /tickets/:id → remove a ticket

These endpoints allow the frontend to implement full CRUD functionality.

Running the Project

Install dependencies:

npm install

Run the development server:

npm run dev

The application will run at:

http://localhost:5173
Backend

This frontend communicates with a backend server built with:

Node.js

Express

REST API

Backend repository:
https://github.com/Samuel-Garrote/tickets-backend

Live demo:

https://frontend-tickets.netlify.app/
