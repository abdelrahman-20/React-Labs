import CounterCard from "./CounterCard";
import TimerCard from "./TimerCard";
import NotesCard from "./NotesCard";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <CounterCard />
        <TimerCard />
        <NotesCard />
      </div>
    </div>
  );
};

export default Dashboard;
