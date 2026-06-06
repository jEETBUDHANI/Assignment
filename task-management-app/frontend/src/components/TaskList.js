import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskEditForm from './TaskEditForm';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTask(null);
  };

  const handleEditComplete = () => {
    setEditingTaskId(null);
    setEditingTask(null);
    onTaskUpdated();
  };

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id}>
            {editingTaskId === task._id ? (
              <TaskEditForm
                task={editingTask}
                onComplete={handleEditComplete}
                onCancel={handleCancelEdit}
              />
            ) : (
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
