// src/components/quiz/QuizHome.jsx
import { motion } from 'framer-motion';
import { Brain, Target, Rocket, Award, ChevronRight, Clock, BarChart3 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export const QuizHome = ({ onStart }) => {
  const features = [
    { icon: Brain, title: 'Test Psychométrique', description: 'Évaluez vos aptitudes et compétences' },
    { icon: Target, title: 'Recommandations', description: 'Découvrez les filières qui vous correspondent' },
    { icon: Rocket, title: 'Rapide & Efficace', description: 'Quiz de 5 à 20 questions seulement' },
    { icon: Award, title: 'Certificat', description: 'Obtenez un bilan personnalisé' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quiz d'Orientation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez votre voie idéale grâce à notre test intelligent basé sur vos intérêts et compétences
          </p>
        </div>

        {/* Configuration Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Prêt à découvrir votre voie ?
          </h2>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-3">✨ Ce qui vous attend :</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                Recommandations personnalisées de filières
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                Identification de vos points forts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                Analyse de vos intérêts professionnels
              </li>
            </ul>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>Commencer le quiz</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};