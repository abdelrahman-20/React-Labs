import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import '../styles/UsersPage.css';

// Async function to fetch users from API
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Page that displays a list of all users
function UsersPage() {
  const navigate = useNavigate();

  // useQuery hook from React Query
  // Manages fetching, caching, and state for API calls
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'], // Unique key for this query
    queryFn: fetchUsers, // Function that fetches the data
  });

  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="users-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  // Show error state if fetch fails
  if (error) {
    return (
      <div className="users-container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      {/* Header with back button */}
      <div className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Users & Posts Manager</h1>
      </div>

      {/* Grid of user cards */}
      <div className="users-grid">
        {users.map(user => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p className="user-email">{user.email}</p>
            <p className="user-company">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
