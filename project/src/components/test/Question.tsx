import React from 'react';

export interface QuestionData {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionProps {
  question: QuestionData;
  selectedAnswer: number | null;
  onSelectAnswer: (answerId: number) => void;
  isReviewing: boolean;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  isReviewing 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Question {question.id}: {question.text}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;
          
          let optionClasses = "p-3 border rounded-md cursor-pointer transition-all duration-200 hover:bg-blue-50 flex items-center";
          
          if (isReviewing) {
            if (isCorrect) {
              optionClasses = "p-3 border rounded-md bg-green-50 border-green-500 text-green-700";
            } else if (isSelected && !isCorrect) {
              optionClasses = "p-3 border rounded-md bg-red-50 border-red-500 text-red-700";
            }
          } else if (isSelected) {
            optionClasses = "p-3 border rounded-md bg-blue-100 border-blue-500";
          }
          
          return (
            <div 
              key={index}
              className={optionClasses}
              onClick={() => !isReviewing && onSelectAnswer(index)}
            >
              <div className="mr-3 w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;