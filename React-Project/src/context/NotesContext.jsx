import { createContext, useState, useContext } from 'react';

// Context for managing notes state across the app
const NotesContext = createContext(null);

// Provider component that manages notes state
export function NotesProvider({ children }) {
  // State array to store all notes
  // Each note has: id, text, and priority (important/normal/delayed)
  const [notes, setNotes] = useState([]);

  // Function to add a new note
  const addNote = (text, priority) => {
    const newNote = {
      id: Date.now(), // Use timestamp as unique ID
      text,
      priority,
    };
    // Add new note to the beginning of the array
    setNotes(prev => [newNote, ...prev]);
  };

  // Function to delete a note by its ID
  const deleteNote = (id) => {
    // Filter out the note with matching ID
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Function to change the priority of an existing note
  const changePriority = (id, newPriority) => {
    // Map through notes and update the one with matching ID
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, priority: newPriority } : note
      )
    );
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, changePriority }}>
      {children}
    </NotesContext.Provider>
  );
}

// Custom hook to access notes context
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
}
