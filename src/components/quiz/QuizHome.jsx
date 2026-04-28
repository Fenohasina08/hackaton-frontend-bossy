// src/components/quiz/QuizHome.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Brain, Target, Rocket, Award, Clock, Users, BarChart3 } from 'lucide-react';

export const QuizHome = ({ onStart }) => {
  const [selectedLevel, setSelectedLevel] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);

  const levels = [
    { id: 'easy', name: 'Débutant', color: 'from-green-500 to-emerald-600' },
    { id: 'medium', name: 'Intermédiaire', color: 'from-blue-500 to-indigo-600' },
    { id: 'hard', name: 'Expert', color: 'from-purple-500 to-pink-600' },
  ];

  const features = [
    { icon: Brain, title: 'Test Psychométrique', description: 'Évaluez vos aptitudes et compétences' },
    { icon: Target, title: 'Recommandations', description: 'Découvrez les filières qui vous correspondent' },
    { icon: Rocket, title: 'Rapide & Efficace', description: 'Quiz de 5 à 20 questions seulement' },
    { icon: Award, title: 'Certificat', description: 'Obtenez un bilan personnalisé' },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl">🎯</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quiz d'Orientation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez votre voie idéale grâce à notre test intelligent basé sur vos intérêts et compétences
          </p>
        </div>

        {/* Configuration Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Configurez votre quiz
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Niveau de difficulté */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Niveau de difficulté
              </label>
              <div className="flex gap-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
                      selectedLevel === level.id
                        ? `bg-gradient-to-r ${level.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Nombre de questions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Nombre de questions
              </label>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                      questionCount === num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onStart({ level: selectedLevel, count: questionCount })}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>Commencer le quiz</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};