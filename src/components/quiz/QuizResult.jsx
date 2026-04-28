// src/components/quiz/QuizResult.jsx
import { motion } from 'framer-motion';
import { Trophy, Target, RefreshCw, Share2, CheckCircle, Briefcase } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Quiz Terminé !
          </h1>
          <p className="text-gray-600 text-lg">
            Voici vos résultats personnalisés
          </p>
        </div>

        {/* Main Score Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`bg-gradient-to-r ${gradeColor} rounded-2xl shadow-2xl p-8 mb-8 text-white`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{gradeText}</h2>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={onRestart}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refaire le test
                </button>
                <button
                  onClick={onShare}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2 transition"
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
        </motion.div>

        {/* Careers Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Filières recommandées pour vous
          </h3>
          <div className="space-y-3">
            {result.recommendedCareers?.map((career, idx) => (
              <div key={idx} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {career.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{career.title}</h4>
                    <p className="text-sm text-gray-500">{career.match}% match</p>
                  </div>
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Vos points forts
            </h3>
            <div className="space-y-2">
              {result.strengths?.map((strength, idx) => (
                <div key={idx} className="bg-green-50 rounded-xl p-3 border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-800">{strength}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-600" />
              Axes d'amélioration
            </h3>
            <div className="space-y-2">
              {result.weaknesses?.map((item, idx) => (
                <div key={idx} className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-orange-800">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            Explorer les universités
          </button>
        </div>
      </div>
    </div>
  );
};