import { useState } from "react";

interface Note {
  id: number;
  text: string;
  done: boolean;
}

const NotesCard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([...notes, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleDone = (id: number) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)));
  };

  return (
    <div style={cardStyle}>
      <h3>Notes</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add note"
        style={{ width: "80%" }}
      />
      <button onClick={addNote}>Add</button>
      <ul style={{ textAlign: "left", marginTop: "10px" }}>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => toggleDone(note.id)}
            style={{
              cursor: "pointer",
              backgroundColor: note.done ? "#d4edda" : "#f8f9fa",
              padding: "5px",
              margin: "5px 0",
              borderRadius: "5px",
              textDecoration: note.done ? "line-through" : "none",
            }}
          >
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 16,
  textAlign: "center",
};

export default NotesCard;
