// src/pages/UniversitiesPage.jsx
import React, { useState } from "react";
import UniversityCard from "../components/UniversityCard";
import { Search, Filter, MapPin, GraduationCap, DollarSign, Star } from 'lucide-react';

const universities = [
  {
    id: 1,
    name: "HEI Madagascar",
    location: "Antananarivo",
    description: "Haute École d'Informatique de Madagascar",
    tuitionRangeMin: 500000,
    tuitionRangeMax: 2000000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "II J 161 R Ambodivoanjo Ivandry Antananarivo, 101",
    field: "Informatique"
  },
  {
    id: 2,
    name: "ISPM",
    location: "Antananarivo",
    description: "Institut Supérieur Polytechnique de Madagascar",
    tuitionRangeMin: 300000,
    tuitionRangeMax: 1500000,
    averageRating: 4.2,
    logo: "https://via.placeholder.com/50",
    address: "3HM8+CQH, Antananarivo",
    field: "Ingénierie"
  },
  {
    id: 3,
    name: "Université d’Antananarivo",
    location: "Antananarivo",
    description: "Université publique principale de Madagascar",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 500000,
    averageRating: 4.0,
    logo: "https://via.placeholder.com/50",
    address: "Ankatso, Antananarivo",
    field: "Général"
  },
  {
    id: 4,
    name: "INSCAE",
    location: "Antananarivo",
    description: "Institut National des Sciences Comptables et Administration",
    tuitionRangeMin: 600000,
    tuitionRangeMax: 2500000,
    averageRating: 4.6,
    logo: "https://via.placeholder.com/50",
    address: "Route d'Andoharanofotsy, Antananarivo",
    field: "Gestion / Finance"
  },
  {
    id: 5,
    name: "CNTEMAD",
    location: "Antananarivo",
    description: "Centre National de Télé-Enseignement de Madagascar",
    tuitionRangeMin: 150000,
    tuitionRangeMax: 800000,
    averageRating: 3.8,
    logo: "https://via.placeholder.com/50",
    address: "Ankatso, Antananarivo",
    field: "Distance Learning"
  },
  {
    id: 6,
    name: "Université de Fianarantsoa",
    location: "Fianarantsoa",
    description: "Université publique régionale",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 400000,
    averageRating: 3.9,
    logo: "https://via.placeholder.com/50",
    address: "Fianarantsoa centre",
    field: "Général"
  },
  {
    id: 7,
    name: "Université de Toamasina",
    location: "Toamasina",
    description: "Université publique de l'Est de Madagascar",
    tuitionRangeMin: 120000,
    tuitionRangeMax: 500000,
    averageRating: 3.8,
    logo: "https://via.placeholder.com/50",
    address: "Toamasina II",
    field: "Général"
  },
  {
    id: 8,
    name: "Université de Mahajanga",
    location: "Mahajanga",
    description: "Université publique de la région Boeny",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 450000,
    averageRating: 3.7,
    logo: "https://via.placeholder.com/50",
    address: "Mahajanga centre",
    field: "Général"
  },
  {
    id: 9,
    name: "Université de Toliara",
    location: "Toliara",
    description: "Université publique du sud-ouest",
    tuitionRangeMin: 100000,
    tuitionRangeMax: 400000,
    averageRating: 3.6,
    logo: "https://via.placeholder.com/50",
    address: "Toliara I",
    field: "Général"
  },
  {
    id: 10,
    name: "ESPA Vontovorona",
    location: "Antananarivo",
    description: "École Supérieure Polytechnique d’Antananarivo",
    tuitionRangeMin: 400000,
    tuitionRangeMax: 1800000,
    averageRating: 4.3,
    logo: "https://via.placeholder.com/50",
    address: "Vontovorona",
    field: "Ingénierie"
  },
  {
    id: 11,
    name: "ISCAM",
    location: "Antananarivo",
    description: "Institut Supérieur de la Communication et Management",
    tuitionRangeMin: 700000,
    tuitionRangeMax: 3000000,
    averageRating: 4.4,
    logo: "https://via.placeholder.com/50",
    address: "Ankorondrano, Antananarivo",
    field: "Marketing / Communication"
  },
  {
    id: 12,
    name: "E-Media",
    location: "Antananarivo",
    description: "École des métiers du digital et multimédia",
    tuitionRangeMin: 800000,
    tuitionRangeMax: 3500000,
    averageRating: 4.5,
    logo: "https://via.placeholder.com/50",
    address: "Andraharo, Antananarivo",
    field: "Digital / Design"
  },
  {
    id: 13,
    name: "Faculté de Médecine Ankatso",
    location: "Antananarivo",
    description: "Formation en médecine et sciences de la santé",
    tuitionRangeMin: 200000,
    tuitionRangeMax: 1000000,
    averageRating: 4.2,
    logo: "https://via.placeholder.com/50",
    address: "CHU Ankatso",
    field: "Médecine"
  },
  {
    id: 14,
    name: "CNTEMAD Antsiranana",
    location: "Antsiranana",
    description: "Centre de formation à distance du Nord",
    tuitionRangeMin: 120000,
    tuitionRangeMax: 600000,
    averageRating: 3.9,
    logo: "https://via.placeholder.com/50",
    address: "Antsiranana centre",
    field: "Distance Learning"
  }
];

// Extraction des filtres uniques
const locations = [...new Set(universities.map(u => u.location))];
const fields = [...new Set(universities.map(u => u.field))];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les universités
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          uni.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || uni.location === selectedLocation;
    const matchesField = !selectedField || uni.field === selectedField;
    const matchesPrice = uni.tuitionRangeMin <= priceRange[1] && 
                         uni.tuitionRangeMax >= priceRange[0];
    
    return matchesSearch && matchesLocation && matchesField && matchesPrice;
  });

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
        {filteredUniversities.length === 0 ? (
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