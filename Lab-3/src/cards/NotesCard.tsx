import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { addNote, toggleDone, removeNote } from "./../slices/notesSlice";

export default function NotesCard() {
  const [text, setText] = useState("");
  const notes = useSelector((s: RootState) => s.notes.notes);
  const dispatch = useDispatch();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addNote(text.trim()));
    setText("");
  };

  return (
    <div className="card notes-card">
      <h3>Notes</h3>
      <form onSubmit={submit} className="notes-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note"
        />
        <button type="submit">Add</button>
      </form>
      <ul className="notes-list">
        {notes.map((n) => (
          <li key={n.id} className={n.done ? "done" : ""}>
            <span onClick={() => dispatch(toggleDone(n.id))}>{n.text}</span>
            <div className="note-actions">
              <button onClick={() => dispatch(toggleDone(n.id))}>
                {n.done ? "Undo" : "Done"}
              </button>
              <button onClick={() => dispatch(removeNote(n.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
