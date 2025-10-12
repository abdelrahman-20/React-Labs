import { useState } from "react";

const CounterCard = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={cardStyle}>
      <h3>Counter</h3>
      <p>Value: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 16,
  textAlign: "center",
};

export default CounterCard;
