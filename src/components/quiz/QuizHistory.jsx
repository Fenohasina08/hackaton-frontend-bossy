import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/useQuiz';
import { LoadingSpinner } from './LoadingSpinner';

export const QuizHistory = () => {
  const { history, loading, loadHistory } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Historique des quiz</h1>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Nouveau quiz
          </button>
        </div>

        {!history || history.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucun quiz effectué
            </h3>
            <p className="text-gray-600 mb-4">
              Commencez votre premier quiz pour découvrir des recommandations !
            </p>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Commencer
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/quiz/results/${item.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {Math.round(item.percentage)}%
                      </span>
                      <span className="text-gray-600">
                        Score: {item.score} / {item.session?.maxScore || 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap gap-2 justify-end mb-2">
                      {item.recommendedCareers?.slice(0, 2).map((career, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">Cliquer pour détails →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};