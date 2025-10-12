import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./../store";
import { start, pause, tick, resetTimer } from "./../slices/timerSlice";

export default function TimerCard() {
  const { seconds, running } = useSelector((s: RootState) => s.timer);
  const dispatch = useDispatch();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => dispatch(tick()), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, dispatch]);

  return (
    <div className="card">
      <h3>Timer</h3>
      <div className="timer-value">{seconds}s</div>
      <div className="btn-row">
        <button onClick={() => dispatch(start())}>Start</button>
        <button onClick={() => dispatch(pause())}>Pause</button>
        <button onClick={() => dispatch(resetTimer())}>Reset</button>
      </div>
    </div>
  );
}
