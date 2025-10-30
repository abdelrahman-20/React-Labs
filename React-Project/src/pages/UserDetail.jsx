import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodosContext';
import '../styles/UserDetail.css';

// Fetch a specific user by ID
const fetchUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

// Fetch all posts for a specific user
const fetchUserPosts = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

// Fetch all todos for a specific user
const fetchUserTodos = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

// Detailed page for a single user showing their info, posts, and todos
function UserDetail() {
  // Get user ID from URL parameter
  const { id } = useParams();
  const navigate = useNavigate();

  // Get todo management functions from context
  const { toggleTodo, isTodoCompleted } = useTodos();

  // Fetch user details
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  // Fetch user's posts
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchUserPosts(id),
  });

  // Fetch user's todos
  const { data: todos, isLoading: todosLoading } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchUserTodos(id),
  });

  // Show loading if any query is still loading
  if (userLoading || postsLoading || todosLoading) {
    return <div className="user-detail-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="user-detail-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate('/users')} className="back-button">
          ← Back to Users
        </button>
        <h1>User Details</h1>
      </div>

      {/* User information card */}
      <div className="user-info-card">
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      </div>

      {/* Two-column layout for posts and todos */}
      <div className="content-grid">
        {/* Posts section */}
        <div className="section">
          <h3>Posts ({posts.length})</h3>
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Todos section */}
        <div className="section">
          <h3>To-Dos ({todos.length})</h3>
          <div className="todos-list">
            {todos.map(todo => {
              // Check if this todo has been toggled in our app state
              const isCompleted = isTodoCompleted(todo.id);

              return (
                <div
                  key={todo.id}
                  className={`todo-item ${isCompleted ? 'completed' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {/* Checkbox visual indicator */}
                  <span className="todo-checkbox">
                    {isCompleted ? '✓' : '○'}
                  </span>
                  <span>{todo.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
