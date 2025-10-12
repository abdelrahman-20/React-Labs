import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store";
import Login from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { logout } from "./slices/authSlice";

export default function App() {
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();

  return (
    <div className="app-root">
      {auth.loggedIn ? (
        <>
          <header className="app-header">
            <div>
              Welcome, <strong>{auth.username}</strong>
            </div>
            <button className="logout-btn" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </header>
          <main>
            <Dashboard />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
