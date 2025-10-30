import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { TodosProvider } from './context/TodosContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import UserDetail from './pages/UserDetail';
import NotesPage from './pages/NotesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import WeatherPage from './pages/WeatherPage';
import './App.css';

// Create a React Query client for managing server state
// This handles caching, background updates, and more
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 1000 * 60 * 5,
      // Keep unused data in cache for 10 minutes
      cacheTime: 1000 * 60 * 10,
    },
  },
});

// Main App component that sets up routing and providers
function App() {
  return (
    // Provide React Query client to entire app
    <QueryClientProvider client={queryClient}>
      {/* Provide authentication state to entire app */}
      <AuthProvider>
        {/* Provide notes state to entire app */}
        <NotesProvider>
          {/* Provide todos state to entire app */}
          <TodosProvider>
            {/* Set up routing */}
            <BrowserRouter>
              <Routes>
                {/* Public route: Login page at root path */}
                <Route path="/" element={<Login />} />

                {/* Protected routes: require authentication */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <UsersPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/users/:id"
                  element={
                    <ProtectedRoute>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/notes"
                  element={
                    <ProtectedRoute>
                      <NotesPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <AnalyticsPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/weather"
                  element={
                    <ProtectedRoute>
                      <WeatherPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route: redirect unknown paths to login */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TodosProvider>
        </NotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
