// src/components/quiz/QuizResult.jsx
import { motion } from 'framer-motion';
import { Trophy, Target, RefreshCw, Share2, CheckCircle, TrendingUp, Briefcase } from 'lucide-react';

export const QuizResult = ({ result, onRestart, onShare }) => {
  const percentage = (result.score / result.maxScore) * 100;
  
  let gradeText = 'Excellent !';
  let gradeColor = 'from-green-500 to-emerald-600';
  
  if (percentage >= 80) {
    gradeText = 'Excellent !';
    gradeColor = 'from-green-500 to-emerald-600';
  } else if (percentage >= 60) {
    gradeText = 'Très bien !';
    gradeColor = 'from-blue-500 to-indigo-600';
  } else if (percentage >= 40) {
    gradeText = 'Pas mal';
    gradeColor = 'from-yellow-500 to-orange-600';
  } else {
    gradeText = 'À explorer';
    gradeColor = 'from-purple-500 to-pink-600';
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Quiz Terminé !
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Voici vos résultats personnalisés
          </p>
        </div>

        {/* Score Card */}
        <div className={`bg-gradient-to-r ${gradeColor} rounded-2xl shadow-xl p-8 mb-8 text-white`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{gradeText}</h2>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={onRestart}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refaire
                </button>
                <button
                  onClick={onShare}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{Math.round(percentage)}%</div>
              <div className="text-white/80">Score global</div>
              <div className="text-sm text-white/70 mt-2">
                {result.score} / {result.maxScore} points
              </div>
            </div>
          </div>
        </div>

        {/* Careers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Filières recommandées
          </h3>
          <div className="space-y-3">
            {result.recommendedCareers.map((career, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{career.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{career.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{career.match}% match</p>
                  </div>
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Points forts
            </h3>
            <div className="space-y-2">
              {result.strengths.map((strength, idx) => (
                <div key={idx} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <span className="text-green-800 dark:text-green-300">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Axes d'amélioration
            </h3>
            <div className="space-y-2">
              {result.weaknesses.map((weakness, idx) => (
                <div key={idx} className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                  <span className="text-orange-800 dark:text-orange-300">{weakness}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};