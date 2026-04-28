// pages/admin/AdminScholarships.jsx
import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/admin.service';
import { Plus, Edit2, Trash2, Search, X, ExternalLink, Calendar, DollarSign, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    eligibility: '',
    deadline: '',
    link: ''
  });

  useEffect(() => {
    fetchScholarships();
    fetchStats();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllScholarships();
      setScholarships(response.data.data?.scholarships || response.data.data || []);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast.error('Erreur lors du chargement des bourses');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getScholarshipStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingScholarship) {
        await adminAPI.updateScholarship(editingScholarship.id, formData);
        toast.success('Bourse mise à jour avec succès');
      } else {
        await adminAPI.createScholarship(formData);
        toast.success('Bourse créée avec succès');
      }
      setShowModal(false);
      resetForm();
      fetchScholarships();
      fetchStats();
    } catch (error) {
      console.error('Error saving scholarship:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette bourse ?')) {
      try {
        await adminAPI.deleteScholarship(id);
        toast.success('Bourse supprimée avec succès');
        fetchScholarships();
        fetchStats();
      } catch (error) {
        console.error('Error deleting scholarship:', error);
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      title: scholarship.title,
      description: scholarship.description,
      amount: scholarship.amount,
      eligibility: scholarship.eligibility,
      deadline: scholarship.deadline.split('T')[0],
      link: scholarship.link
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingScholarship(null);
    setFormData({
      title: '',
      description: '',
      amount: '',
      eligibility: '',
      deadline: '',
      link: ''
    });
  };

  const filteredScholarships = scholarships.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-white">Bourses d'études</h1>
          <p className="text-neutral-light mt-1">Gestion des bourses disponibles</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter une bourse
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-light text-sm">Total bourses</p>
                <p className="text-3xl font-bold text-neutral-white">{stats.total}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-light text-sm">Total vues</p>
                <p className="text-3xl font-bold text-neutral-white">{stats.totalViews || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-light text-sm">Prochaines échéances</p>
                <p className="text-3xl font-bold text-neutral-white">{stats.upcomingDeadlines || 0}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-light" />
        <input
          type="text"
          placeholder="Rechercher une bourse..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white placeholder-neutral-light focus:outline-none focus:border-secondary"
        />
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((scholarship) => (
          <div key={scholarship.id} className="glass-card rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-neutral-white">{scholarship.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(scholarship)}
                  className="p-1 hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(scholarship.id)}
                  className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <p className="text-neutral-light text-sm mb-3 line-clamp-2">{scholarship.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-neutral-white">{scholarship.amount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-neutral-light">
                  Date limite: {new Date(scholarship.deadline).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-secondary hover:text-secondary/80 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Voir le site
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 p-6 border-b border-neutral-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-neutral-white">
                {editingScholarship ? 'Modifier la bourse' : 'Ajouter une bourse'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-neutral-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">Titre *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">Description *</label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Montant *</label>
                  <input
                    type="text"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="ex: 500€/mois ou 150 000 Ar/mois"
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Date limite *</label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">Éligibilité *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                  placeholder="Critères d'éligibilité..."
                  className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">Lien d'inscription *</label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-neutral-white/10 text-neutral-light rounded-lg hover:bg-neutral-white/20"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80"
                >
                  {editingScholarship ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}