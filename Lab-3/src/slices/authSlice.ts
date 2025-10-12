import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Predefined credentials (in-memory)
const PREDEFINED = { username: "admin", password: "password123" };

interface AuthState {
  loggedIn: boolean;
  username: string | null;
  error?: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  username: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) {
      const { username, password } = action.payload;
      if (
        username === PREDEFINED.username &&
        password === PREDEFINED.password
      ) {
        state.loggedIn = true;
        state.username = username;
        state.error = null;
      } else {
        state.loggedIn = false;
        state.username = null;
        state.error = "Invalid credentials";
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.username = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
