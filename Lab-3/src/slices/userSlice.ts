import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: User[] = await res.json();
      return data;
    } catch (err: unknown) {
      let message = "Failed";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id: string, { rejectWithValue }) => {
    if (!id) return rejectWithValue("empty_id");
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (res.status === 404) return rejectWithValue("not_found");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: User = await res.json();
      return [data];
    } catch (err: unknown) {
      let message = "Failed";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload || action.error.message);
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = String(action.payload || action.error.message);
      });
  },
});

export default usersSlice.reducer;
