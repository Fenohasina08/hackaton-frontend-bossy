import { useState, useCallback } from 'react';
import { quizApi } from '../services/api';
import toast from 'react-hot-toast';

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const startSession = useCallback(async (limit = 5, category = null, difficulty = null) => {
    setLoading(true);
    try {
      const response = await quizApi.startSession(limit, category, difficulty);
      if (response.data.success) {
        setSessionId(response.data.data.sessionId);
        setQuestions(response.data.data.questions);
        setCurrentIndex(0);
        setAnswers([]);
        setResult(null);
        return response.data.data;
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to start quiz';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const answerQuestion = useCallback((questionId, answer, points) => {
    setAnswers(prev => [...prev, { questionId, answer, points }]);
    
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  }, [currentIndex]);

  const submitQuiz = useCallback(async () => {
    setLoading(true);
    try {
      const response = await quizApi.submitQuiz(sessionId, answers);
      if (response.data.success) {
        setResult(response.data.data);
        toast.success('Quiz submitted successfully!');
        return response.data.data;
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to submit quiz';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [sessionId, answers]);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await quizApi.getHistory();
      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setSessionId(null);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
  }, []);

  return {
    questions,
    sessionId,
    currentIndex,
    answers,
    loading,
    result,
    history,
    currentQuestion: questions[currentIndex],
    isLastQuestion: currentIndex + 1 === questions.length,
    progress: questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0,
    startSession,
    answerQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
    loadHistory,
  };
};