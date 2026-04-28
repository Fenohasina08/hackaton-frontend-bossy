import apiClient from './client';

export const universitiesAPI = {
  // Routes publiques
  getAll: (params = {}) => {
    const { page = 1, limit = 10, search, location, minTuition, maxTuition } = params;
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (search) queryParams.append('search', search);
    if (location) queryParams.append('location', location);
    if (minTuition) queryParams.append('minTuition', minTuition);
    if (maxTuition) queryParams.append('maxTuition', maxTuition);
    
    return apiClient.get(`/universities?${queryParams.toString()}`);
  },
  
  getById: (id) => apiClient.get(`/universities/${id}`),
  
  // Routes protégées (auth requise)
  getFullDetails: (id) => apiClient.get(`/universities/${id}/details`),
  
  filter: (filters) => {
    const queryParams = new URLSearchParams(filters);
    return apiClient.get(`/universities/filter?${queryParams.toString()}`);
  },
  
  addReview: (id, data) => apiClient.post(`/universities/${id}/review`, data),
  
  // Routes admin
  adminGetAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return apiClient.get(`/admin/universities?${queryParams.toString()}`);
  },
  
  adminGetById: (id) => apiClient.get(`/admin/universities/${id}`),
  
  adminCreate: (data) => apiClient.post('/admin/universities', data),
  
  adminUpdate: (id, data) => apiClient.put(`/admin/universities/${id}`, data),
  
  adminDelete: (id) => apiClient.delete(`/admin/universities/${id}`),
  
  adminBoostRating: (id, boostedNote) => 
    apiClient.post(`/admin/universities/${id}/boost-note`, { boostedNote }),
};