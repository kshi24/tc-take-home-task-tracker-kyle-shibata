import React, { useEffect, useState } from 'react';

function App() {
  // Tasks fetched from the backend
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks on first render
    const loadTasks = async () => {
      try {
        const response = await fetch('/tasks_request');
        const data = await response.json();
        // Backend returns { tasks: [...] } — normalize just in case
        const list = Array.isArray(data) ? data : data.tasks || [];
        setTasks(list);
      } catch (err) {
        // Keep it simple: log the error so we can debug in the console
        console.error('Failed to fetch tasks:', err);
      }
    };

    loadTasks();
  }, []);

  // Minimal render: show a basic list or a simple empty state
  if (tasks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.status}
        </li>
      ))}
    </ul>
  );
}

export default App;