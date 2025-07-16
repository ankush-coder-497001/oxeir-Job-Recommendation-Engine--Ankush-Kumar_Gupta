import axios from 'axios';
const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: status => status >= 200 && status < 300,
});


// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Handle different error status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear storage and redirect to login
          localStorage.clear();
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }

      // Return error message from the server if available
      throw new Error(
        error.response.data.message || 'An unexpected error occurred'
      );
    }

    throw error;
  }
);

export default api;
