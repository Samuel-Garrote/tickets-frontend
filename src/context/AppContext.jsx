import { createContext, useReducer } from 'react';

// Create context
export const AppContext = createContext();

// Initial state
const initialState = {
  tickets: []
};

// Reducer
function reducer(state, action) {
  if (action.type === 'SET_TICKETS') {
    return { ...state, tickets: action.tickets };
  }

  if (action.type === 'ADD_TICKET') {
    return { ...state, tickets: [...state.tickets, action.ticket] };
  }

  if (action.type === 'UPDATE_TICKET') {
    return {
      ...state,
      tickets: state.tickets.map(t =>
        t.id === action.ticket.id ? action.ticket : t
      )
    };
  }

  if (action.type === 'DELETE_TICKET') {
    return {
      ...state,
      tickets: state.tickets.filter(ticket => ticket.id !== action.id)
    };
  }

  return state;
}


// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
