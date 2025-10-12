import CounterCard from "./../cards/CounterCard";
import TimerCard from "./../cards/TimerCard";
import NotesCard from "./../cards/NotesCard";
import UsersCard from "./../cards/UserCard";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards">
        <CounterCard />
        <TimerCard />
        <NotesCard />
        <UsersCard />
      </div>
    </div>
  );
}
