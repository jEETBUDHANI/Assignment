import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks } from '../api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (filter !== 'all') {
        params.status = filter;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getTasks(params);
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [isAuthenticated, navigate, fetchTasks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  const completedCount = tasks.filter(task => task.status === 'completed').length;
  const pendingCount = tasks.filter(task => task.status === 'pending').length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Management</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="task-stats">
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p className="stat-number">{tasks.length}</p>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <p className="stat-number completed">{completedCount}</p>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p className="stat-number pending">{pendingCount}</p>
            </div>
          </div>

          <div className="task-section">
            <TaskForm onTaskAdded={handleTaskAdded} />

            <div className="task-filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All Tasks
                </button>
                <button
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks found. Create one to get started!</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
