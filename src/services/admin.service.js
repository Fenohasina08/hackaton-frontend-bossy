import apiClient from './api';

export const adminAPI = {
  // Stats
  getStats: () => apiClient.get('/admin/stats'),
  
  // Universities
  getAllUniversities: (includeInactive = false) => 
    apiClient.get(`/admin/universities?includeInactive=${includeInactive}`),
  createUniversity: (data) => apiClient.post('/admin/universities', data),
  updateUniversity: (id, data) => apiClient.put(`/admin/universities/${id}`, data),
  deleteUniversity: (id) => apiClient.delete(`/admin/universities/${id}`),
  boostUniversityNote: (id, boostAmount) => 
    apiClient.post(`/admin/universities/${id}/boost-note`, { boostAmount }),
  
  // Scholarships
  getAllScholarships: () => apiClient.get('/admin/scholarships'),
  getScholarshipStats: () => apiClient.get('/admin/scholarships/stats'),
  createScholarship: (data) => apiClient.post('/admin/scholarships', data),
  updateScholarship: (id, data) => apiClient.put(`/admin/scholarships/${id}`, data),
  deleteScholarship: (id) => apiClient.delete(`/admin/scholarships/${id}`),
};