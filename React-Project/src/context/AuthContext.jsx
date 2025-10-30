import { createContext, useState, useContext } from 'react';

// Create a Context to share authentication state across the app
const AuthContext = createContext(null);

// AuthProvider component wraps the app and provides auth state to all children
export function AuthProvider({ children }) {
  // State to track if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store the logged-in user's information
  const [user, setUser] = useState(null);

  // Function to handle login
  // Takes username and password, validates them, and updates state
  const login = (username, password) => {
    // Simple validation: check against dummy credentials
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setUser({ username });
      return true;
    }
    return false;
  };

  // Function to handle logout
  // Clears authentication state and user data
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Provide the auth state and functions to all child components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context in components
// Makes it easier to access auth state without importing useContext every time
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
