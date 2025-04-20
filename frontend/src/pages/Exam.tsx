import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LocationState {
  questions: Question[];
  subject: string;
  topic: string;
}

const Exam = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  if (!state?.questions) {
    // If no questions are provided, redirect back to test page
    navigate('/test');
    return <div>Redirecting...</div>;
  }
  
  const { questions, subject, topic } = state;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleAnswerSelect = (questionIndex: number, answerIndex: number): void => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };
  
  const handlePrevious = (): void => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = (): void => {
    setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1));
  };
  
  const handleSubmit = (): void => {
    setIsSubmitting(true);
    
    // Calculate score
    const score = questions.reduce((total, question, index) => {
      const userAnswer = selectedAnswers[index];
      return total + (userAnswer !== undefined && userAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
    
    // Navigate to results page with the score and answers
    navigate('/results', {
      state: {
        score,
        totalQuestions: questions.length,
        questions,
        selectedAnswers,
        subject,
        topic,
      },
    });
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center text-gray-300">
          <Clock className="mr-2" size={20} />
          <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
        </div>
        <div className="text-gray-300">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
      
      <Card className="mb-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full text-left p-4 rounded-md transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          icon={<ChevronLeft size={18} />}
        >
          Previous
        </Button>
        
        {currentQuestion === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant="primary"
            icon={<AlertCircle size={18} />}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            icon={<ChevronRight size={18} />}
            iconPosition="right"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Exam; 