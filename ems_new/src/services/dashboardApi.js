// src/services/dashboardApi.js
import api from './api';

export const fetchDashboardStats = () => api.get('/dashboard/stats');
export const fetchUpcomingTasks = () => api.get('/dashboard/tasks');
export const fetchAnnouncements = () => api.get('/dashboard/announcements');
export const fetchUsersList = () => api.get('/dashboard/users');
