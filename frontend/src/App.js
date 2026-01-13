import React, { useEffect, useState } from 'react';

function App() {
  // Tasks fetched from the backend
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks on first render
    const loadTasks = async () => {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        // Backend returns { tasks: [...] } — normalize just in case
        const list = Array.isArray(data) ? data : data.tasks || [];
        setTasks(list);
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