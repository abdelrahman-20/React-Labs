import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import '../styles/Dashboard.css';

// Main dashboard page that shows after login
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout: clear auth state and go to login page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Header with welcome message and logout button */}
      <header className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      {/* Grid of feature cards */}
      <div className="dashboard-grid">
        {/* Card 1: Navigate to Users & Posts Manager */}
        <DashboardCard
          title="Users & Posts Manager"
          description="View users, their posts, and manage todos"
          onClick={() => navigate('/users')}
          icon="👥"
        />

        {/* Card 2: Navigate to Note Manager */}
        <DashboardCard
          title="Note Manager"
          description="Create and organize notes by priority"
          onClick={() => navigate('/notes')}
          icon="📝"
        />

        {/* Card 3: Navigate to Analytics */}
        <DashboardCard
          title="Analytics"
          description="View statistics about users and their activities"
          onClick={() => navigate('/analytics')}
          icon="📊"
        />

        {/* Card 4: Navigate to Weather Widget */}
        <DashboardCard
          title="Weather Widget"
          description="Check real-time weather for any city"
          onClick={() => navigate('/weather')}
          icon="🌤️"
        />
      </div>
    </div>
  );
}

export default Dashboard;
