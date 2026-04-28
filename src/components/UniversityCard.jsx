// src/components/UniversityCard.jsx
import React, { useState } from 'react';
import { MapPin, DollarSign, Star, Heart, Share2, BookOpen, Award, Users } from 'lucide-react';
import Logo from '../assets/fodfn.png';

export default function UniversityCard({ university }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calcul du prix moyen
  const avgPrice = (university.tuitionRangeMin + university.tuitionRangeMax) / 2;
  
  // Format des prix
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} Mio Ar`;
    }
    return `${(price / 1000).toFixed(0)}k Ar`;
  };

  // Étoiles de notation
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de note */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-300 ${
          university.averageRating >= 4.5 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
          university.averageRating >= 4.0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
          'bg-gray-600 text-white'
        }`}>
          {university.averageRating} ★
        </div>
      </div>

      {/* Bouton like */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 left-4 z-10 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
      </button>

      {/* Image/Logo Header */}
      <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
        <div className="absolute -bottom-6 left-4">
          <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
            {university.logo ? (
              <img src={Logo} alt={Logo} className="w-12 h-12 object-contain" />
            ) : (
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        {/* University Name */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {university.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {university.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1 mb-2 text-xs text-gray-500 dark:text-gray-400">
          <MapPin className="w-3 h-3" />
          <span>{university.location}</span>
        </div>

        {/* Field / Domaine */}
        <div className="flex items-center gap-1 mb-3">
          <Award className="w-3 h-3 text-purple-500" />
          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            {university.field}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Frais de scolarité</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {formatPrice(avgPrice)}/an
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Note moyenne</p>
            <div className="flex items-center gap-1">
              {renderStars(university.averageRating)}
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">
                ({university.averageRating})
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between gap-2 mb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Users className="w-3 h-3" />
            <span>1200+ étudiants</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Award className="w-3 h-3" />
            <span>15 formations</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
            Voir les détails
          </button>
          <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className={`absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none transition-all duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}