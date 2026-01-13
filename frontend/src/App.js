import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Tasks fetched from the backend
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    // Load tasks on first render
    const loadTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.tasks || [];
        setTasks(list);
        setError('');
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    try {
      setSubmitting(true);
      const resp = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const created = await resp.json();
      setTasks((prev) => [...prev, created]);
      setNewTitle('');
      setError('');
    } catch (err) {
      console.error('Add task failed:', err);
      setError('Could not add task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (task) => {
    const next = task.status === 'completed' ? 'pending' : 'completed';
    try {
      setUpdatingId(task.id);
      const resp = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const updated = await resp.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setError('');
    } catch (err) {
      console.error('Toggle status failed:', err);
      setError('Could not update task. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  // UI states
  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container error"><p>{error}</p></div>;

  return (
    <div className="container">
      <header className="header">
        <h1>Task Tracker</h1>
        <span className="count">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
      </header>

      <form className="add-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting || !newTitle.trim()}>
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty">No tasks yet.</div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className="title">{task.title}</span>
              <div className="actions">
                <span className={`status-badge ${task.status === 'completed' ? 'completed' : 'pending'}`}>
                  {task.status}
                </span>
                <button
                  className="btn"
                  onClick={() => handleToggleStatus(task)}
                  disabled={updatingId === task.id}
                >
                  {updatingId === task.id
                    ? 'Updating...'
                    : task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;