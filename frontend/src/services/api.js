import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || err.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const detectDisease = (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return api.post('/api/disease-detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const sendChatMessage = (question) =>
  api.post('/api/chat', { question });

export const getWeather = (city) =>
  api.get('/api/weather', { params: { city } });

export const getRecentReports = (limit = 5) =>
  api.get('/api/reports', { params: { limit } });

export const getChatHistory = (limit = 10) =>
  api.get('/api/chat/history', { params: { limit } });

export const getStats = () => api.get('/api/stats');

export const imageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = API_BASE || '';
  return `${base}${path}`;
};

export default api;
