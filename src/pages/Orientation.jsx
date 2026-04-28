// src/pages/Orientation.jsx
import { useState } from 'react';
import { QuizHome } from '../components/quiz/QuizHome';
import { QuizSession } from '../components/quiz/QuizSession';
import { QuizResult } from '../components/quiz/QuizResult';

// Données mockées pour le développement
const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "Quel type de problèmes aimez-vous résoudre ?",
    category: "Personnalité",
    difficulty: "medium",
    points: 10,
    answers: [
      { text: "Problèmes techniques et logiques", value: "tech" },
      { text: "Problèmes sociaux et humains", value: "social" },
      { text: "Problèmes créatifs et artistiques", value: "creative" },
      { text: "Problèmes scientifiques", value: "science" }
    ]
  },
  {
    id: 2,
    text: "Comment préférez-vous travailler ?",
    category: "Méthode",
    difficulty: "easy",
    points: 10,
    answers: [
      { text: "En équipe, en collaborant", value: "team" },
      { text: "Seul, en autonomie", value: "alone" },
      { text: "En contact direct avec les clients", value: "client" },
      { text: "En recherche et analyse", value: "research" }
    ]
  },
  {
    id: 3,
    text: "Quelle matière vous a le plus intéressé au lycée ?",
    category: "Intérêts",
    difficulty: "easy",
    points: 10,
    answers: [
      { text: "Mathématiques", value: "math" },
      { text: "Sciences de la vie", value: "biology" },
      { text: "Littérature", value: "literature" },
      { text: "Histoire-Géographie", value: "history" }
    ]
  },
  {
    id: 4,
    text: "Quel est votre objectif professionnel ?",
    category: "Ambition",
    difficulty: "medium",
    points: 15,
    answers: [
      { text: "Devenir expert technique", value: "expert" },
      { text: "Créer ma propre entreprise", value: "entrepreneur" },
      { text: "Avoir un poste à responsabilités", value: "manager" },
      { text: "Aider les autres", value: "helper" }
    ]
  },
  {
    id: 5,
    text: "Quel environnement de travail vous attire ?",
    category: "Environnement",
    difficulty: "easy",
    points: 10,
    answers: [
      { text: "Bureau moderne et dynamique", value: "modern" },
      { text: "Laboratoire de recherche", value: "lab" },
      { text: "Terrain et extérieur", value: "field" },
      { text: "Créatif et artistique", value: "creative" }
    ]
  }
];

const MOCK_RESULT = {
  score: 75,
  maxScore: 100,
  percentile: 85,
  recommendedCareers: [
    { title: 'Développeur Fullstack', match: 92, icon: '💻' },
    { title: 'Data Scientist', match: 88, icon: '📊' },
    { title: 'Chef de Projet IT', match: 75, icon: '🚀' }
  ],
  strengths: ['Logique mathématique', 'Résolution de problèmes', 'Créativité'],
  weaknesses: ['Communication', 'Travail d\'équipe']
};

export const Orientation = () => {
  const [step, setStep] = useState('home'); // home, session, result
  const [quizData, setQuizData] = useState({
    questions: [],
    answers: [],
    result: null
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleStart = () => {
    setQuizData(prev => ({ ...prev, questions: MOCK_QUESTIONS }));
    setStep('session');
  };

  const handleAnswer = (questionId, answer, points) => {
    setUserAnswers(prev => [...prev, { questionId, answer, points }]);
    
    if (currentIndex + 1 < MOCK_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleNext = () => {
    // Fonction appelée après chaque question
    if (currentIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUserAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleComplete = () => {
    setQuizData(prev => ({ 
      ...prev, 
      result: MOCK_RESULT,
      answers: userAnswers 
    }));
    setStep('result');
  };

  const handleRestart = () => {
    setStep('home');
    setCurrentIndex(0);
    setUserAnswers([]);
    setQuizData({ questions: [], answers: [], result: null });
  };

  const handleShare = () => {
    // Logique de partage
    alert('Fonctionnalité de partage à venir');
  };

  if (step === 'home') {
    return <QuizHome onStart={handleStart} />;
  }

  if (step === 'session') {
    return (
      <QuizSession
        questions={MOCK_QUESTIONS}
        currentQuestionIndex={currentIndex}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onComplete={handleComplete}
        userAnswers={userAnswers}
      />
    );
  }

  if (step === 'result') {
    return (
      <QuizResult
        result={quizData.result}
        onRestart={handleRestart}
        onShare={handleShare}
      />
    );
  }

  return null;
};