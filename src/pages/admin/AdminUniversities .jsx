import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/admin.service';
import { 
  Plus, Edit2, Trash2, Search, Sparkles, 
  X, Check, Eye, EyeOff 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [boostModal, setBoostModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    tuitionRangeMin: '',
    tuitionRangeMax: '',
    experience: '',
    website: '',
    facebookLink: '',
    linkedinLink: '',
    documentsNeeded: [],
    subscriptionEnd: '',
    levels: [],
    diplomas: [],
    professions: []
  });

  const levelsOptions = ['L1', 'L2', 'L3', 'M1', 'M2'];

  useEffect(() => {
    fetchUniversities();
  }, [showInactive]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUniversities(showInactive);
      setUniversities(response.data.data?.universities || response.data.data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
      toast.error('Erreur lors du chargement des universités');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUniversity) {
        await adminAPI.updateUniversity(editingUniversity.id, formData);
        toast.success('Université mise à jour avec succès');
      } else {
        await adminAPI.createUniversity(formData);
        toast.success('Université créée avec succès');
      }
      setShowModal(false);
      resetForm();
      fetchUniversities();
    } catch (error) {
      console.error('Error saving university:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette université ?')) {
      try {
        await adminAPI.deleteUniversity(id);
        toast.success('Université supprimée avec succès');
        fetchUniversities();
      } catch (error) {
        console.error('Error deleting university:', error);
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleBoost = async (id) => {
    const boostAmount = parseFloat(prompt('Montant du boost (0.1 à 2.0):', '0.5'));
    if (boostAmount && boostAmount >= 0.1 && boostAmount <= 2.0) {
      try {
        await adminAPI.boostUniversityNote(id, boostAmount);
        toast.success(`Note boostée de +${boostAmount} ⭐`);
        fetchUniversities();
      } catch (error) {
        console.error('Error boosting note:', error);
        toast.error('Erreur lors du boost de la note');
      }
    } else if (boostAmount) {
      toast.error('Le boost doit être entre 0.1 et 2.0');
    }
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData({
      name: university.name,
      location: university.location,
      description: university.description,
      tuitionRangeMin: university.tuitionRangeMin,
      tuitionRangeMax: university.tuitionRangeMax,
      experience: university.experience,
      website: university.website || '',
      facebookLink: university.facebookLink || '',
      linkedinLink: university.linkedinLink || '',
      documentsNeeded: university.documentsNeeded || [],
      subscriptionEnd: university.subscriptionEnd?.split('T')[0] || '',
      levels: university.levels?.map(l => l.level) || [],
      diplomas: university.diplomas?.map(d => d.diplomaName) || [],
      professions: university.professions?.map(p => p.profession) || []
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingUniversity(null);
    setFormData({
      name: '',
      location: '',
      description: '',
      tuitionRangeMin: '',
      tuitionRangeMax: '',
      experience: '',
      website: '',
      facebookLink: '',
      linkedinLink: '',
      documentsNeeded: [],
      subscriptionEnd: '',
      levels: [],
      diplomas: [],
      professions: []
    });
  };

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-neutral-white">Universités</h1>
          <p className="text-neutral-light mt-1">Gestion des universités partenaires</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter une université
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-light" />
          <input
            type="text"
            placeholder="Rechercher une université..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white placeholder-neutral-light focus:outline-none focus:border-secondary"
          />
        </div>
        <button
          onClick={() => setShowInactive(!showInactive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showInactive 
              ? 'bg-yellow-600 text-white' 
              : 'bg-neutral-white/10 text-neutral-light hover:bg-neutral-white/20'
          }`}
        >
          {showInactive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          {showInactive ? 'Voir actives' : 'Inclure inactives'}
        </button>
      </div>

      {/* Universities Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-light">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-light">Lieu</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-light">Frais/mois</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-light">Note</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-light">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-light">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-white/10">
              {filteredUniversities.map((uni) => (
                <tr key={uni.id} className="hover:bg-neutral-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-white">{uni.name}</td>
                  <td className="px-6 py-4 text-neutral-light">{uni.location}</td>
                  <td className="px-6 py-4 text-neutral-light">
                    {uni.tuitionRangeMin.toLocaleString()} - {uni.tuitionRangeMax.toLocaleString()} Ar
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-neutral-white">
                        {(uni.averageRating + (uni.boostedNote || 0)).toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      uni.isActive 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {uni.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(uni)}
                        className="p-1 hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleBoost(uni.id)}
                        className="p-1 hover:bg-purple-500/20 rounded-lg transition-colors"
                        title="Booster la note"
                      >
                        <Sparkles className="w-5 h-5 text-purple-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(uni.id)}
                        className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 p-6 border-b border-neutral-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-neutral-white">
                {editingUniversity ? 'Modifier l\'université' : 'Ajouter une université'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-neutral-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Nom *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Lieu *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
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
                  <label className="block text-sm font-medium text-neutral-light mb-1">Frais min (Ar) *</label>
                  <input
                    type="number"
                    required
                    value={formData.tuitionRangeMin}
                    onChange={(e) => setFormData({...formData, tuitionRangeMin: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Frais max (Ar) *</label>
                  <input
                    type="number"
                    required
                    value={formData.tuitionRangeMax}
                    onChange={(e) => setFormData({...formData, tuitionRangeMax: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Expérience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-light mb-1">Fin d'abonnement *</label>
                  <input
                    type="date"
                    required
                    value={formData.subscriptionEnd}
                    onChange={(e) => setFormData({...formData, subscriptionEnd: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-white/10 border border-neutral-white/20 rounded-lg text-neutral-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-light mb-1">Niveaux</label>
                <div className="flex flex-wrap gap-2">
                  {levelsOptions.map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        const newLevels = formData.levels.includes(level)
                          ? formData.levels.filter(l => l !== level)
                          : [...formData.levels, level];
                        setFormData({...formData, levels: newLevels});
                      }}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        formData.levels.includes(level)
                          ? 'bg-secondary text-white'
                          : 'bg-neutral-white/10 text-neutral-light hover:bg-neutral-white/20'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
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
                  {editingUniversity ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}