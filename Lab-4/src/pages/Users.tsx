import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styles from "../styles/users.module.css";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export default function Users() {
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10000,
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <button className={styles.refreshBtn} onClick={() => refetch()}>
        Refresh Users
      </button>
      <ul className={styles.list}>
        {users.map((user: any) => (
          <li key={user.id} className={styles.listItem}>
            <Link className={styles.link} to={`/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
