import apiClient from './client';

export const authAPI = {
  // Inscription
  register: (data) => apiClient.post('/auth/register', data),
  
  // Connexion
  login: (data) => apiClient.post('/auth/login', data),
  
  // Connexion Google
  googleAuth: (token) => apiClient.post('/auth/google', { googleToken: token }),
  
  // Profil utilisateur
  getMe: () => apiClient.get('/me'),
  
  // Mettre à jour les préférences
  updatePreferences: (preferences) => apiClient.put('/me/preferences', preferences),
  
  // Historique des avis
  getMyReviews: (page = 1, limit = 10) => 
    apiClient.get(`/me/reviews?page=${page}&limit=${limit}`),
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};