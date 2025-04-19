import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

// Mock questions based on subject
const getQuestions = (subject, topic) => {
  const questionSets = {
    mathematics: [
      {
        id: 1,
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Solve for x: 2x + 5 = 13",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?",
        options: ["Scalene", "Isosceles", "Equilateral", "Right"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What is the area of a circle with radius 5?",
        options: ["25π", "10π", "15π", "20π"],
        correctAnswer: 0
      }
    ],
    science: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is the basic unit of life?",
        options: ["Tissue", "Cell", "Organ", "Molecule"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the process by which plants make their own food called?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Excretion"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which of these is NOT a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Energy"],
        correctAnswer: 3
      }
    ],
    english: [
      {
        id: 1,
        question: "What is the past tense of 'run'?",
        options: ["Ran", "Runned", "Running", "Runs"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which of these is a synonym for 'happy'?",
        options: ["Sad", "Angry", "Joyful", "Tired"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "Identify the noun in this sentence: 'The dog barked loudly.'",
        options: ["The", "Dog", "Barked", "Loudly"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which of these is a correctly spelled word?",
        options: ["Recieve", "Acheive", "Believe", "Yeild"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What is an antonym for 'brave'?",
        options: ["Courageous", "Fearful", "Bold", "Daring"],
        correctAnswer: 1
      }
    ],
    history: [
      {
        id: 1,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "Which civilization built the Machu Picchu?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "What event marked the beginning of World War I?",
        options: ["The bombing of Pearl Harbor", "The assassination of Archduke Franz Ferdinand", "The signing of the Treaty of Versailles", "The Russian Revolution"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which country was NOT part of the Allied Powers in World War II?",
        options: ["United States", "Soviet Union", "Japan", "United Kingdom"],
        correctAnswer: 2
      }
    ],
    'computer-science': [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which of these is NOT a programming language?",
        options: ["Java", "Python", "HTML", "C++"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is the brain of the computer called?",
        options: ["RAM", "CPU", "Hard Drive", "GPU"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which of these is a database management system?",
        options: ["Windows", "Linux", "MySQL", "Chrome"],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 2
      }
    ]
  };
  
  return questionSets[subject] || questionSets.mathematics;
};

const Exam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('subject') || 'mathematics';
  const topic = queryParams.get('topic') || '';
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const questions = getQuestions(subject, topic);
  
  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Calculate score
    let score = 0;
    let totalQuestions = questions.length;
    
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    
    // Navigate to results page with score
    navigate(`/results?score=${score}&total=${totalQuestions}&subject=${subject}`);
  };
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize">
          {subject.replace('-', ' ')} Test
        </h1>
        {topic && (
          <p className="text-gray-300 mb-4">
            Topic: {topic}
          </p>
        )}
      </motion.div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="flex items-center text-orange-400 bg-gray-800 px-4 py-2 rounded-md">
          <Clock size={18} className="mr-2" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <Card animate={false} className="mb-8">
        <div className="space-y-6">
          <h2 className="text-xl font-medium">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.98 }}
              >
                <label className={`
                  block p-4 border border-gray-700 rounded-md cursor-pointer
                  transition-colors duration-200
                  ${selectedAnswers[questions[currentQuestion].id] === index 
                    ? 'bg-primary-900 border-primary-500' 
                    : 'hover:bg-gray-800'}
                `}>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={index}
                      checked={selectedAnswers[questions[currentQuestion].id] === index}
                      onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 bg-gray-700"
                    />
                    <span className="ml-3">{option}</span>
                  </div>
                </label>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant={currentQuestion === 0 ? "ghost" : "outline"}
          icon={<ChevronLeft size={18} />}
        >
          Previous
        </Button>
        
        {currentQuestion < questions.length - 1 ? (
          <Button
            onClick={handleNext}
            icon={<ChevronRight size={18} />}
            iconPosition="right"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant="accent"
          >
            Submit Test
          </Button>
        )}
      </div>
      
      {/* Question navigation */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-colors duration-200
                ${currentQuestion === index 
                  ? 'bg-primary-600 text-white' 
                  : selectedAnswers[question.id] !== undefined 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-800 text-gray-400'}
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      
      {/* Warning for unanswered questions */}
      {Object.keys(selectedAnswers).length < questions.length && (
        <motion.div 
          className="mt-6 flex items-start p-4 bg-yellow-900/30 border border-yellow-800 rounded-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AlertCircle className="text-yellow-500 mr-3 mt-0.5" size={20} />
          <div>
            <p className="text-yellow-200 font-medium">You have unanswered questions</p>
            <p className="text-yellow-200/70 text-sm">
              Make sure to answer all questions before submitting your test.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Exam;