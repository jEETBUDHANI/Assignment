import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => {
  return axiosInstance.post('/users/register', userData);
};

export const loginUser = (userData) => {
  return axiosInstance.post('/users/login', userData);
};

export const createTask = (taskData) => {
  return axiosInstance.post('/tasks', taskData);
};

export const getTasks = (filters = {}) => {
  return axiosInstance.get('/tasks', { params: filters });
};

export const getTaskById = (taskId) => {
  return axiosInstance.get(`/tasks/${taskId}`);
};

export const updateTask = (taskId, taskData) => {
  return axiosInstance.put(`/tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
  return axiosInstance.delete(`/tasks/${taskId}`);
};

export const toggleTaskStatus = (taskId) => {
  return axiosInstance.patch(`/tasks/${taskId}/toggle`);
};

export default axiosInstance;
