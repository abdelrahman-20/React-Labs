import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import '../styles/AnalyticsPage.css';

// Fetch all users
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

// Fetch all posts
const fetchAllPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

// Fetch all todos
const fetchAllTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

// Analytics page showing statistics about users
function AnalyticsPage() {
  const navigate = useNavigate();

  // Fetch all data in parallel using React Query
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: fetchAllPosts,
  });

  const { data: todos, isLoading: todosLoading } = useQuery({
    queryKey: ['allTodos'],
    queryFn: fetchAllTodos,
  });

  // Show loading while any query is pending
  if (usersLoading || postsLoading || todosLoading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  // Calculate statistics

  // Count posts per user
  const postsPerUser = {};
  posts.forEach(post => {
    postsPerUser[post.userId] = (postsPerUser[post.userId] || 0) + 1;
  });

  // Count completed todos per user
  const completedTodosPerUser = {};
  todos.forEach(todo => {
    if (todo.completed) {
      completedTodosPerUser[todo.userId] = (completedTodosPerUser[todo.userId] || 0) + 1;
    }
  });

  // Find user with most posts
  const userWithMostPosts = users.reduce((max, user) => {
    const postCount = postsPerUser[user.id] || 0;
    const maxCount = postsPerUser[max.id] || 0;
    return postCount > maxCount ? user : max;
  }, users[0]);

  // Find user with fewest posts
  const userWithFewestPosts = users.reduce((min, user) => {
    const postCount = postsPerUser[user.id] || 0;
    const minCount = postsPerUser[min.id] || 0;
    return postCount < minCount ? user : min;
  }, users[0]);

  // Find user with most completed todos
  const userWithMostCompletedTodos = users.reduce((max, user) => {
    const todoCount = completedTodosPerUser[user.id] || 0;
    const maxCount = completedTodosPerUser[max.id] || 0;
    return todoCount > maxCount ? user : max;
  }, users[0]);

  // Find user with fewest completed todos
  const userWithFewestCompletedTodos = users.reduce((min, user) => {
    const todoCount = completedTodosPerUser[user.id] || 0;
    const minCount = completedTodosPerUser[min.id] || 0;
    return todoCount < minCount ? user : min;
  }, users[0]);

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Analytics Dashboard</h1>
      </div>

      {/* Statistics grid */}
      <div className="analytics-grid">
        {/* Total users stat */}
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-value">{users.length}</div>
        </div>

        {/* User with most posts */}
        <div className="stat-card highlight">
          <h3>Most Posts</h3>
          <div className="stat-user">{userWithMostPosts.username}</div>
          <div className="stat-value">{postsPerUser[userWithMostPosts.id]} posts</div>
        </div>

        {/* User with fewest posts */}
        <div className="stat-card">
          <h3>Fewest Posts</h3>
          <div className="stat-user">{userWithFewestPosts.username}</div>
          <div className="stat-value">{postsPerUser[userWithFewestPosts.id]} posts</div>
        </div>

        {/* User with most completed todos */}
        <div className="stat-card highlight">
          <h3>Most Completed To-Dos</h3>
          <div className="stat-user">{userWithMostCompletedTodos.username}</div>
          <div className="stat-value">{completedTodosPerUser[userWithMostCompletedTodos.id]} completed</div>
        </div>

        {/* User with fewest completed todos */}
        <div className="stat-card">
          <h3>Fewest Completed To-Dos</h3>
          <div className="stat-user">{userWithFewestCompletedTodos.username}</div>
          <div className="stat-value">{completedTodosPerUser[userWithFewestCompletedTodos.id]} completed</div>
        </div>

        {/* Total posts stat */}
        <div className="stat-card">
          <h3>Total Posts</h3>
          <div className="stat-value">{posts.length}</div>
        </div>

        {/* Total todos stat */}
        <div className="stat-card">
          <h3>Total To-Dos</h3>
          <div className="stat-value">{todos.length}</div>
        </div>

        {/* Completed todos stat */}
        <div className="stat-card">
          <h3>Completed To-Dos</h3>
          <div className="stat-value">{todos.filter(t => t.completed).length}</div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
