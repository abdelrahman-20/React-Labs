import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import '../styles/NotesPage.css';

// Note Manager page for creating and organizing notes
function NotesPage() {
  const navigate = useNavigate();
  const { notes, addNote, deleteNote, changePriority } = useNotes();

  // Local state for the note input form
  const [noteText, setNoteText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('normal');

  // Handle adding a new note
  const handleAddNote = (e) => {
    e.preventDefault();

    // Only add if there's text
    if (noteText.trim()) {
      addNote(noteText, selectedPriority);
      // Clear the form after adding
      setNoteText('');
      setSelectedPriority('normal');
    }
  };

  // Filter notes by priority
  const importantNotes = notes.filter(note => note.priority === 'important');
  const normalNotes = notes.filter(note => note.priority === 'normal');
  const delayedNotes = notes.filter(note => note.priority === 'delayed');

  return (
    <div className="notes-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Note Manager</h1>
      </div>

      {/* Form to add new notes */}
      <div className="notes-input-section">
        <form onSubmit={handleAddNote} className="note-form">
          {/* Text input for note content */}
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter your note..."
            className="note-input"
          />

          {/* Dropdown to select priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="priority-select"
          >
            <option value="important">Important</option>
            <option value="normal">Normal</option>
            <option value="delayed">Delayed</option>
          </select>

          {/* Submit button */}
          <button type="submit" className="add-note-button">
            Add Note
          </button>
        </form>
      </div>

      {/* Three sections for different priority levels */}
      <div className="notes-sections">
        {/* Important notes section */}
        <div className="notes-section important">
          <h2>Important ({importantNotes.length})</h2>
          <div className="notes-list">
            {importantNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onChangePriority={changePriority}
              />
            ))}
          </div>
        </div>

        {/* Normal notes section */}
        <div className="notes-section normal">
          <h2>Normal ({normalNotes.length})</h2>
          <div className="notes-list">
            {normalNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onChangePriority={changePriority}
              />
            ))}
          </div>
        </div>

        {/* Delayed notes section */}
        <div className="notes-section delayed">
          <h2>Delayed ({delayedNotes.length})</h2>
          <div className="notes-list">
            {delayedNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onChangePriority={changePriority}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual note component with delete and priority change controls
function NoteItem({ note, onDelete, onChangePriority }) {
  return (
    <div className="note-item">
      {/* Note text */}
      <p className="note-text">{note.text}</p>

      {/* Controls for managing the note */}
      <div className="note-controls">
        {/* Dropdown to change priority */}
        <select
          value={note.priority}
          onChange={(e) => onChangePriority(note.id, e.target.value)}
          className="note-priority-change"
        >
          <option value="important">Important</option>
          <option value="normal">Normal</option>
          <option value="delayed">Delayed</option>
        </select>

        {/* Delete button */}
        <button
          onClick={() => onDelete(note.id)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NotesPage;
