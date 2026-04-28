// src/components/quiz/QuizSession.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, Clock, Zap, CheckCircle } from 'lucide-react';

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const QuestionCard = ({ question, onAnswer, selected, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
          {question.category}
        </span>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Zap className="w-4 h-4 text-yellow-500" />
          {question.points} points
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
        {question.text}
      </h3>
      
      <div className="space-y-3 mt-8">
        {question.answers?.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(answer.value)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
              selected === answer.value
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                selected === answer.value
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="flex-1">{answer.text}</span>
              {selected === answer.value && (
                <CheckCircle className="w-5 h-5 text-white/80" />
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export const QuizSession = ({ 
  questions, 
  currentQuestionIndex, 
  onAnswer, 
  onNext, 
  onPrevious, 
  onComplete,
  userAnswers 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex + 1 === questions.length;

  const handleAnswer = (value) => {
    setSelectedAnswer(value);
    onAnswer(currentQuestion.id, value, currentQuestion.points);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      onNext();
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    onPrevious();
    setSelectedAnswer(null);
  };

  const handleComplete = () => {
    if (selectedAnswer) {
      onComplete();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span className="font-semibold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="text-sm text-gray-500">
              Points: {currentQuestion.points}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <QuestionCard
            key={currentQuestionIndex}
            question={currentQuestion}
            onAnswer={handleAnswer}
            selected={selectedAnswer}
            index={currentQuestionIndex}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleComplete}
              disabled={!selectedAnswer}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                !selectedAnswer
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              Terminer
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                !selectedAnswer
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};