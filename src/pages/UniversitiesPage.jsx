// src/pages/UniversitiesPage.jsx
import React, { useState, useEffect } from "react";
import UniversityCard from "../components/UniversityCard";
import { Search, Filter, MapPin, GraduationCap, DollarSign, Star } from 'lucide-react';
import { universitiesAPI } from "../services/universities";

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);

  // Charger les universités depuis l'API
  useEffect(() => {
    fetchUniversities();
    fetchFiltersOptions();
  }, [searchTerm, selectedLocation, selectedField, priceRange]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: 1,
        limit: 50,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedLocation && { location: selectedLocation }),
        ...(selectedField && { field: selectedField }),
        ...(priceRange[0] > 0 && { minTuition: priceRange[0].toString() }),
        ...(priceRange[1] < 4000000 && { maxTuition: priceRange[1].toString() })
      };
      
      const response = await universitiesAPI.getAll(params);
      
      // Transformer les données au format attendu par UniversityCard
      const formattedUniversities = response.data.data.universities.map(uni => ({
        id: uni.id,
        name: uni.name,
        location: uni.location,
        description: uni.description,
        tuitionRangeMin: uni.tuitionRangeMin,
        tuitionRangeMax: uni.tuitionRangeMax,
        averageRating: uni.averageRating,
        logo: uni.logo || "https://via.placeholder.com/50",
        address: uni.location,
        field: uni.professions?.[0]?.profession || "Général"
      }));
      
      setUniversities(formattedUniversities);
    } catch (err) {
      console.error("Erreur:", err);
      setError("Impossible de charger les universités");
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiltersOptions = async () => {
    try {
      const response = await universitiesAPI.getAll({ limit: 100 });
      const allUniversities = response.data.data.universities;
      
      const uniqueLocations = [...new Set(allUniversities.map(u => u.location).filter(Boolean))];
      const uniqueFields = [...new Set(allUniversities.map(u => u.professions?.[0]?.profession).filter(Boolean))];
      
      setLocations(uniqueLocations);
      setFields(uniqueFields);
    } catch (err) {
      console.error("Erreur chargement filtres:", err);
    }
  };

  // Filtrer les universités (maintenant juste pour l'affichage côté front)
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = searchTerm === '' || 
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || uni.location === selectedLocation;
    const matchesField = !selectedField || uni.field === selectedField;
    const matchesPrice = uni.tuitionRangeMin <= priceRange[1] && 
                         uni.tuitionRangeMax >= priceRange[0];
    
    return matchesSearch && matchesLocation && matchesField && matchesPrice;
  });

  if (loading && universities.length === 0) {
    return (
      <div className="min-h-screen w-[89vw] rounded-3xl bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-24 pb-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[89vw] rounded-3xl bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Trouve Ton Avenir Universitaire
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore, compare et choisis l'université qui correspond à ton parcours.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une université..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Localisation
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Toutes les localisations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <GraduationCap className="inline w-4 h-4 mr-1" />
                Domaine
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les domaines</option>
                {fields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Budget max (Ar)
              </label>
              <input
                type="range"
                min="0"
                max="4000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>0 Ar</span>
                <span>{priceRange[1].toLocaleString()} Ar</span>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredUniversities.length} université(s) trouvée(s)
          </p>
        </div>

        {/* Universities Grid */}
        {filteredUniversities.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Aucune université trouvée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUniversities.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}