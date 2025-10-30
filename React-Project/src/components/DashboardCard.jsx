import '../styles/DashboardCard.css';

// Reusable card component for dashboard features
// Props: title, description, onClick handler, and icon
function DashboardCard({ title, description, onClick, icon }) {
  return (
    <div className="dashboard-card" onClick={onClick}>
      {/* Large icon at top of card */}
      <div className="card-icon">{icon}</div>

      {/* Card title */}
      <h2>{title}</h2>

      {/* Card description */}
      <p>{description}</p>

      {/* Visual indicator that card is clickable */}
      <div className="card-arrow">→</div>
    </div>
  );
}

export default DashboardCard;
