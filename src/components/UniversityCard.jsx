// src/components/UniversityCard.jsx
import React, { useState } from 'react';
import { MapPin, DollarSign, Star, Heart, Share2, BookOpen, Award, Users, X, Clock, Globe, Phone, Mail, CheckCircle } from 'lucide-react';
import Logo from '../assets/fodfn.png';

export default function UniversityCard({ university }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  // Ouvrir le modal
  const handleViewDetails = () => {
    setShowModal(true);
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Partager l'université
  const handleShare = async (e) => {
    e.stopPropagation();
    const shareData = {
      title: university.name,
      text: `Découvrez ${university.name} à ${university.location}`,
      url: `${window.location.origin}/universities/${university.id}`,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Erreur de partage:', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Lien copié dans le presse-papier !');
    }
  };

  // Like
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <>
      {/* Carte principale */}
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewDetails}
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
          onClick={handleLike}
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
                <img src={Logo} alt={university.name} className="w-12 h-12 object-contain" />
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
            <button 
              onClick={handleViewDetails}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              Voir les détails
            </button>
            <button 
              onClick={handleShare}
              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Hover Overlay Effect */}
        <div className={`absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermeture */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              {/* Header avec image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-4 left-6 flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                    {university.logo ? (
                      <img src={Logo} alt={university.name} className="w-16 h-16 object-contain" />
                    ) : (
                      <BookOpen className="w-10 h-10 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{university.name}</h2>
                    <p className="text-blue-100">{university.location}</p>
                  </div>
                </div>
              </div>

              {/* Description détaillée */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {university.description}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Informations clés</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Frais de scolarité</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {university.tuitionRangeMin.toLocaleString()} - {university.tuitionRangeMax.toLocaleString()} Ar/an
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Note moyenne</span>
                      <div className="flex items-center gap-2">
                        {renderStars(university.averageRating)}
                        <span className="font-semibold text-gray-800 dark:text-white">{university.averageRating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Domaine</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">{university.field}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formations proposées */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Formations proposées</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">Licence Informatique</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">Master Data Science</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">Doctorat</span>
                </div>
              </div>

              {/* Avis récents */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Avis récents</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">JD</span>
                        </div>
                        <span className="font-medium text-gray-800 dark:text-white">Jean Dupont</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(4.5)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Excellente université, très bon encadrement et formation de qualité.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={handleShare}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Partager
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}