import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./../store";
import { increment, reset } from "./../slices/counterSlice";

export default function CounterCard() {
  const count = useSelector((s: RootState) => s.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h3>Counter</h3>
      <div className="counter-value">{count}</div>
      <div className="btn-row">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
}
