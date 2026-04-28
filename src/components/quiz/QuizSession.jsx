// src/components/quiz/QuizSession.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, Clock, Zap, CheckCircle } from 'lucide-react';

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const QuestionCard = ({ question, onAnswer, selected, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        {question.category}
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <Zap className="w-4 h-4 text-yellow-500" />
        {question.points} points
      </span>
    </div>
    
    <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
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
              : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              selected === answer.value
                ? 'bg-white/20 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
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
      if (isLastQuestion) {
        onComplete();
      } else {
        onNext();
        setSelectedAnswer(null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      onPrevious();
      setSelectedAnswer(null);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progression</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 inline mr-1" />
                Question {currentQuestionIndex + 1}/{questions.length}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Points: {currentQuestion.points}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestionIndex}
              question={currentQuestion}
              onAnswer={handleAnswer}
              selected={selectedAnswer}
              index={currentQuestionIndex}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </button>
          
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
              !selectedAnswer
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isLastQuestion ? 'Terminer' : 'Suivant'}
            {isLastQuestion ? <Send className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};