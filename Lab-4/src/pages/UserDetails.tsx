import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "../styles/userDetails.module.css";

const fetchUser = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

const fetchPosts = async (id: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();

  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
  });

  const postsQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPosts(id!),
  });

  if (userQuery.isLoading || postsQuery.isLoading)
    return <p>Loading user details...</p>;

  if (userQuery.error || postsQuery.error) return <p>Error loading data.</p>;

  const user = userQuery.data;
  const posts = postsQuery.data;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{user.name}</h2>
      <p className={styles.email}>{user.email}</p>

      <h3>Posts</h3>
      <ul className={styles.posts}>
        {posts.map((p: any) => (
          <li key={p.id} className={styles.postItem}>
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
