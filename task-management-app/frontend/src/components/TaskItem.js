import React, { useState } from 'react';
import { toggleTaskStatus, deleteTask } from '../api';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onEdit, onTaskUpdated, onTaskDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleStatus = async () => {
    setLoading(true);
    setError('');

    try {
      await toggleTaskStatus(task._id);
      onTaskUpdated();
    } catch (err) {
      setError('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      setError('');

      try {
        await deleteTask(task._id);
        onTaskDeleted();
      } catch (err) {
        setError('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const createdDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <div className="task-header">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={handleToggleStatus}
            disabled={loading}
            className="task-checkbox"
          />
          <h3 className={task.status === 'completed' ? 'completed' : ''}>
            {task.title}
          </h3>
          <span className={`status-badge ${task.status}`}>
            {task.status}
          </span>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <p className="task-date">Created: {createdDate}</p>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn btn-secondary"
          disabled={loading}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
