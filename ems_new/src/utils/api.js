import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Change if your backend URL is different
});

// Add JWT token to Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assumes token is stored as 'token'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
