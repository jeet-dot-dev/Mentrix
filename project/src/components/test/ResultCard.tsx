import React from 'react';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import { generatePDF } from '../../utils/pdfGenerator';
import { QuestionData } from './Question';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  questions: QuestionData[];
  timeSpent: string;
  onRetry: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  score, 
  totalQuestions, 
  answers, 
  questions,
  timeSpent,
  onRetry
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let resultMessage = "Excellent! You've mastered this topic.";
  let resultClass = "text-green-600";
  
  if (percentage < 40) {
    resultMessage = "Keep practicing. You'll improve with time.";
    resultClass = "text-red-600";
  } else if (percentage < 70) {
    resultMessage = "Good effort, but there's room for improvement.";
    resultClass = "text-yellow-600";
  }

  const handleDownloadPDF = () => {
    generatePDF({
      score,
      totalQuestions,
      answers,
      questions,
      timeSpent,
      percentage,
      resultMessage
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Test Results</h2>
        <p className={`text-lg ${resultClass} font-medium`}>{resultMessage}</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
          </div>
          <svg className="absolute top-0 left-0" width="160" height="160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="12"
              strokeDasharray={`${percentage * 4.4} 440`}
              transform="rotate(-90 80 80)"
            />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-lg font-semibold text-blue-600">{score}/{totalQuestions}</div>
          <div className="text-sm text-gray-600">Correct Answers</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-lg font-semibold text-purple-600">{timeSpent}</div>
          <div className="text-sm text-gray-600">Time Spent</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Question Summary</h3>
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm truncate max-w-md">
                  {question.text.length > 40 ? `${question.text.substring(0, 40)}...` : question.text}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {answers[index] !== null ? (
                  answers[index] === question.correctAnswer ? (
                    <span className="text-green-600">Correct</span>
                  ) : (
                    <span className="text-red-600">
                      Incorrect (Ans: {String.fromCharCode(65 + question.correctAnswer)})
                    </span>
                  )
                ) : (
                  <span className="text-gray-500">Not answered</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
        <button
          onClick={onRetry}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultCard;