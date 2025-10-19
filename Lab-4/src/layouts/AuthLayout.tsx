import { Outlet } from "react-router-dom";
import styles from "../styles/layout.module.css";

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      <Outlet />
    </div>
  );
}
