import { useTimer } from "./../Hooks/useTimer";

const TimerCard = () => {
  const { seconds, isRunning, start, pause, reset } = useTimer();

  return (
    <div style={cardStyle}>
      <h3>Timer</h3>
      <p>{seconds}s</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {!isRunning ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 16,
  textAlign: "center",
};

export default TimerCard;
