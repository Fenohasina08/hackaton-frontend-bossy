import apiClient from './client';

export const scholarshipsAPI = {
  // Routes utilisateur
  getAll: (params = {}) => {
    const { page = 1, limit = 20, search } = params;
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (search) queryParams.append('search', search);
    
    return apiClient.get(`/scholarships?${queryParams.toString()}`);
  },
  
  getById: (id) => apiClient.get(`/scholarships/${id}`),
  
  // Routes admin
  adminGetAll: (params = {}) => {
    const { page = 1, limit = 50, search } = params;
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (search) queryParams.append('search', search);
    
    return apiClient.get(`/admin/scholarships?${queryParams.toString()}`);
  },
  
  adminGetStats: () => apiClient.get('/admin/scholarships/stats'),
  
  adminCreate: (data) => apiClient.post('/admin/scholarships', data),
  
  adminUpdate: (id, data) => apiClient.put(`/admin/scholarships/${id}`, data),
  
  adminDelete: (id) => apiClient.delete(`/admin/scholarships/${id}`),
};