import React, { useState, useEffect } from 'react';
import Question, { QuestionData } from '../components/test/Question';
import TestTimer from '../components/test/TestTimer';
import ResultCard from '../components/test/ResultCard';
import { ChevronLeft, ChevronRight, Send, BookOpen } from 'lucide-react';
import { mockQuestions } from '../utils/mockData';

const Test: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [startTime] = useState(new Date());
  const [timeSpent, setTimeSpent] = useState('00:00');
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [isTestStarted, setIsTestStarted] = useState(false);
  
  const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'computer', label: 'Computer Science' }
  ];

  const startTest = () => {
    if (!selectedSubject) {
      alert('Please select a subject to start the test');
      return;
    }
    setQuestions(mockQuestions);
    setAnswers(Array(mockQuestions.length).fill(null));
    setIsTestStarted(true);
  };
  
  // Calculate score when test is completed
  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };
  
  // Calculate time spent on the test
  useEffect(() => {
    if (isTestCompleted) {
      const endTime = new Date();
      const diffInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const minutes = Math.floor(diffInSeconds / 60);
      const seconds = diffInSeconds % 60;
      setTimeSpent(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [isTestCompleted, startTime]);
  
  const handleSelectAnswer = (answerId: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerId;
    setAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitTest = () => {
    setIsTestCompleted(true);
  };
  
  const handleRetryTest = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setIsTestCompleted(false);
    setIsReviewing(false);
    setIsTestStarted(false);
    setSelectedSubject('');
    setTopics('');
  };
  
  const handleReviewTest = () => {
    setIsReviewing(true);
    setIsTestCompleted(false);
    setCurrentQuestionIndex(0);
  };
  
  const unansweredCount = answers.filter(a => a === null).length;
  
  if (isTestCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResultCard 
          score={calculateScore()}
          totalQuestions={questions.length}
          answers={answers}
          questions={questions}
          timeSpent={timeSpent}
          onRetry={handleRetryTest}
        />
      </div>
    );
  }

  if (!isTestStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Start Your Test
          </h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Subject *
              </label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Choose a subject</option>
                {subjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="topics" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specific Topics (Optional)
              </label>
              <textarea
                id="topics"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder="Enter specific topics you want to be tested on (comma separated)"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32 resize-none"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Leave blank to include all topics from the selected subject
              </p>
            </div>
            
            <button
              onClick={startTest}
              disabled={!selectedSubject}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                selectedSubject
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
            >
              Start Test
              <Send className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isReviewing ? "Review Test" : subjects.find(s => s.value === selectedSubject)?.label}
          </h1>
          {topics && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Topics: {topics}
            </p>
          )}
        </div>
        {!isReviewing && (
          <TestTimer 
            initialTime={1800} // 30 minutes
            onTimeUp={handleSubmitTest}
            isPaused={isTestCompleted}
          />
        )}
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        
        {!isReviewing && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} unanswered
          </span>
        )}
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-700 h-2 rounded-full mb-8">
        <div
          className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      <Question
        question={questions[currentQuestionIndex]}
        selectedAnswer={answers[currentQuestionIndex]}
        onSelectAnswer={handleSelectAnswer}
        isReviewing={isReviewing}
      />
      
      <div className="flex flex-col md:flex-row justify-between mt-6">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 flex items-center justify-center rounded-md ${
            currentQuestionIndex === 0
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          } mb-2 md:mb-0`}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </button>
        
        <div className="flex space-x-2">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={goToNextQuestion}
              className="px-4 py-2 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          ) : (
            !isReviewing && (
              <button
                onClick={handleSubmitTest}
                className="px-4 py-2 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-md"
              >
                Submit Test
                <Send className="h-5 w-5 ml-1" />
              </button>
            )
          )}
          
          {isReviewing && currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={handleRetryTest}
              className="px-4 py-2 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-md"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
      
      {!isReviewing && (
        <div className="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium 
                ${currentQuestionIndex === index ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800' : ''}
                ${
                  answers[index] !== null
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;