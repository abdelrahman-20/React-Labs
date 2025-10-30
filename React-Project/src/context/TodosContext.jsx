import { createContext, useState, useContext } from 'react';

// Context for managing todo completion states
const TodosContext = createContext(null);

// Provider that tracks which todos are marked as complete
export function TodosProvider({ children }) {
  // State object: keys are todo IDs, values are boolean (completed or not)
  // Example: { '1': true, '2': false, '3': true }
  const [completedTodos, setCompletedTodos] = useState({});

  // Toggle a todo's completed state
  const toggleTodo = (todoId) => {
    setCompletedTodos(prev => ({
      ...prev,
      // If todo exists, flip its value; if not, set to true
      [todoId]: !prev[todoId]
    }));
  };

  // Check if a specific todo is completed
  const isTodoCompleted = (todoId) => {
    return completedTodos[todoId] || false;
  };

  return (
    <TodosContext.Provider value={{ toggleTodo, isTodoCompleted }}>
      {children}
    </TodosContext.Provider>
  );
}

// Custom hook to access todos context
export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within TodosProvider');
  }
  return context;
}
