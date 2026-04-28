import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/admin.service';
import { 
  Building2, Users, Star, TrendingUp, 
  DollarSign, GraduationCap, Calendar, 
  Award, Eye, Clock 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Universités',
      value: stats?.totalUniversities || 0,
      subValue: `${stats?.activeUniversities || 0} actives`,
      icon: <Building2 className="w-8 h-8" />,
      color: 'bg-blue-500',
      subColor: 'text-blue-300'
    },
    {
      title: 'Utilisateurs',
      value: stats?.totalUsers || 0,
      subValue: `${stats?.newUsersThisMonth || 0} nouveaux ce mois`,
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-500',
      subColor: 'text-green-300'
    },
    {
      title: 'Avis',
      value: stats?.totalReviews || 0,
      subValue: `Note moyenne: ${stats?.averageGlobalRating?.toFixed(1) || 0}⭐`,
      icon: <Star className="w-8 h-8" />,
      color: 'bg-yellow-500',
      subColor: 'text-yellow-300'
    },
    {
      title: 'Quiz',
      value: stats?.quizStats?.totalTaken || 0,
      subValue: `${stats?.quizStats?.averageRecommendations || 0} recommandations moy.`,
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'bg-purple-500',
      subColor: 'text-purple-300'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-white">Dashboard Admin</h1>
        <p className="text-neutral-light mt-1">Vue d'ensemble de la plateforme</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color} bg-opacity-20`}>
                {card.icon}
              </div>
              <span className="text-3xl font-bold text-neutral-white">{card.value}</span>
            </div>
            <h3 className="text-neutral-light mb-1">{card.title}</h3>
            <p className={`text-sm ${card.subColor}`}>{card.subValue}</p>
          </div>
        ))}
      </div>

      {/* Top Universities */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-neutral-white">Meilleures Universités</h2>
        </div>
        <div className="space-y-4">
          {stats?.topUniversities?.map((uni, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-neutral-white/5 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-secondary">
                  #{index + 1}
                </span>
                <div>
                  <p className="font-medium text-neutral-white">{uni.name}</p>
                  <p className="text-sm text-neutral-light">{uni.reviews} avis</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-bold text-neutral-white">{uni.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue & Quiz Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-neutral-white">Revenus</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-light">Total</span>
              <span className="text-2xl font-bold text-neutral-white">
                {stats?.revenue?.total || 0} {stats?.revenue?.currency || 'EUR'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-light">Ce mois</span>
              <span className="text-lg font-semibold text-green-500">
                +{stats?.revenue?.thisMonth || 0} {stats?.revenue?.currency || 'EUR'}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-neutral-white">Expirations</h2>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold text-orange-500 mb-2">
              {stats?.expiringUniversities || 0}
            </p>
            <p className="text-neutral-light">universités expirent dans 30 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}