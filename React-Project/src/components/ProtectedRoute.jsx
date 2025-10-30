import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component that protects routes requiring authentication
// If user is not authenticated, redirects to login page
// If user is authenticated, renders the requested component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Check if user is logged in
  // If not, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, show the protected content
  return children;
}

export default ProtectedRoute;
