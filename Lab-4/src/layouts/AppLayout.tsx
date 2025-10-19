import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "../styles/layout.module.css";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/users" className={styles.navLink}>
          Users
        </Link>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </header>
      <Outlet />
    </div>
  );
}
