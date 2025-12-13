import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');

// Turf APIs
export const getAllTurfs = (params) => api.get('/turfs', { params });
export const getTurf = (id) => api.get(`/turfs/${id}`);
export const getTurfAvailability = (id, date) => api.get(`/turfs/${id}/availability`, { params: { date } });

// Booking APIs
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getMyBookings = () => api.get('/bookings/my-bookings');
export const cancelBooking = (id, reason) => api.put(`/bookings/${id}/cancel`, { reason });

// Weather API
export const getWeather = (city) => api.get('/weather/current', { params: { city } });

export default api;