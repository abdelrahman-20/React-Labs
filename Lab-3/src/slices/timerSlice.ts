import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  seconds: number;
  running: boolean;
}

const initialState: TimerState = { seconds: 0, running: false };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    start(state) {
      state.running = true;
    },
    pause(state) {
      state.running = false;
    },
    reset(state) {
      state.seconds = 0;
      state.running = false;
    },
    tick(state) {
      state.seconds += 1;
    },
    setSeconds(state, action: PayloadAction<number>) {
      state.seconds = action.payload;
    },
  },
});

export const {
  start,
  pause,
  reset: resetTimer,
  tick,
  setSeconds,
} = timerSlice.actions;
export default timerSlice.reducer;
