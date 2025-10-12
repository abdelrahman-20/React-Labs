import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./../store";
import { fetchUsers, fetchUserById } from "./../slices/userSlice";

export default function UsersCard() {
  const { users } = useSelector((s: RootState) => s.users);
  const dispatch: AppDispatch = useDispatch();
  const [id, setId] = useState("");

  return (
    <div className="card users-card">
      <h3>Users</h3>
      <div className="users-controls">
        <input
          placeholder="user id (optional)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <div className="btn-row">
          <button
            onClick={() => {
              if (!id.trim()) dispatch(fetchUsers());
              else dispatch(fetchUserById(id.trim()));
            }}
          >
            Fetch
          </button>
          <button
            onClick={() => {
              setId("");
              dispatch(fetchUsers());
            }}
          >
            Fetch All
          </button>
        </div>
      </div>

      <ul className="users-list">
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
