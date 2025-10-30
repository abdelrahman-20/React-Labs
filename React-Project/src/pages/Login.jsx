import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

// Login page component
function Login() {
  // Local state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get login function from auth context
  const { login } = useAuth();

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setError(''); // Clear any previous errors

    // Attempt login with entered credentials
    const success = login(username, password);

    if (success) {
      // If login succeeds, navigate to dashboard
      navigate('/dashboard');
    } else {
      // If login fails, show error message
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Dashboard Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password input field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Show error message if login fails */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Hint for demo credentials */}
        <p className="hint">Hint: admin / admin123</p>
      </div>
    </div>
  );
}

export default Login;
