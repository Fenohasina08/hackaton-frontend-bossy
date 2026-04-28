import { useState } from 'react';

export const QuizQuestion = ({ question, onAnswer, selectedValue, disabled }) => {
  const [selected, setSelected] = useState(selectedValue);

  const handleSelect = (value) => {
    if (disabled) return;
    setSelected(value);
    onAnswer(value);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {question.category}
          </span>
          <span className="text-sm text-gray-500">{question.points} points</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{question.text}</h3>
      </div>

      <div className="space-y-3">
        {question.answers?.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleSelect(answer.value)}
            disabled={disabled}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selected === answer.value
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <span className="text-gray-700">{answer.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};