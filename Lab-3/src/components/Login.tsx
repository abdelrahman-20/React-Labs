import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../slices/authSlice";
import type { RootState } from "../store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((s: RootState) => s.auth.error);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={submit}>
        <h2>Login</h2>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="actions">
          <button type="submit">Sign in</button>
          <button
            type="button"
            onClick={() => {
              setUsername("admin");
              setPassword("password123");
              dispatch(clearError());
            }}
          >
            Fill demo
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
