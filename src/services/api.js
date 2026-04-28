import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const quizApi = {
  getRandomQuestions: (limit = 5, category = null, difficulty = null) => {
    let url = `/quiz/questions/random?limit=${limit}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    return api.get(url);
  },
  
  startSession: (limit = 5, category = null, difficulty = null) => {
    return api.post('/quiz/session/start', { limit, category, difficulty });
  },
  
  submitQuiz: (sessionId, answers) => {
    return api.post('/quiz/session/submit', { sessionId, answers });
  },
  
  getHistory: () => {
    return api.get('/quiz/history');
  },
  
  getResult: (resultId) => {
    return api.get(`/quiz/results/${resultId}`);
  },
};

export default api;