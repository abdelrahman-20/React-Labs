import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  text: string;
  done: boolean;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = { notes: [] };

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer(state, action: PayloadAction<Note>) {
        state.notes.unshift(action.payload);
      },
      prepare(text: string) {
        return { payload: { id: nanoid(), text, done: false } };
      },
    },
    toggleDone(state, action: PayloadAction<string>) {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) note.done = !note.done;
    },
    removeNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNote, toggleDone, removeNote } = notesSlice.actions;
export default notesSlice.reducer;
