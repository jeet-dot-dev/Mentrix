import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import jsPDF from 'jspdf';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LocationState {
  score: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: Record<number, number>;
  subject: string;
  topic: string;
}

const Results = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  if (!state) {
    navigate('/test');
    return <div>Redirecting...</div>;
  }
  
  const { score, totalQuestions, questions, selectedAnswers, subject, topic } = state;
  const percentage = (score / totalQuestions) * 100;
  
  const generatePdf = (): void => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(22);
    doc.text(`${subject} Exam Results`, 105, 20, { align: 'center' });
    
    // Add score summary
    doc.setFontSize(14);
    doc.text(`Score: ${score} out of ${totalQuestions}`, 105, 35, { align: 'center' });
    doc.text(`Percentage: ${percentage.toFixed(2)}%`, 105, 45, { align: 'center' });
    
    let yPosition = 60;
    
    // Add questions and answers
    questions.forEach((question, index) => {
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      const questionNumber = index + 1;
      doc.setFontSize(12);
      
      // Wrap question text if needed
      const questionText = `Question ${questionNumber}: ${question.question}`;
      const splitQuestion = doc.splitTextToSize(questionText, 180);
      doc.text(splitQuestion, 15, yPosition);
      
      yPosition += splitQuestion.length * 7;
      
      // Display options
      question.options.forEach((option, optIndex) => {
        const optionLabel = ['A', 'B', 'C', 'D'][optIndex];
        let optionText = `${optionLabel}. ${option}`;
        
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Mark correct and user answers
        if (optIndex === question.correctAnswer && optIndex === selectedAnswers[index]) {
          doc.setTextColor(0, 128, 0); // Green
          optionText += ' ✓ (Your answer - Correct)';
        } else if (optIndex === question.correctAnswer) {
          doc.setTextColor(0, 128, 0); // Green
          optionText += ' ✓ (Correct answer)';
        } else if (optIndex === selectedAnswers[index]) {
          doc.setTextColor(255, 0, 0); // Red
          optionText += ' × (Your answer - Incorrect)';
        } else {
          doc.setTextColor(0, 0, 0); // Black
        }
        
        // Wrap option text if needed
        const splitOption = doc.splitTextToSize(optionText, 170);
        doc.setFontSize(10);
        doc.text(splitOption, 20, yPosition);
        
        yPosition += splitOption.length * 6;
        doc.setTextColor(0, 0, 0); // Reset text color
      });
      
      yPosition += 10; // Add space after each question
    });
    
    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, yPosition + 10, { align: 'center' });
    
    // Save PDF
    doc.save(`${subject}-exam-results.pdf`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Exam Results
        </h1>
        <p className="text-xl text-gray-300">
          {subject} {topic && `- ${topic}`}
        </p>
      </motion.div>
      
      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Score</h3>
            <p className="text-3xl font-bold text-primary-500">
              {score} / {totalQuestions}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Percentage</h3>
            <p className="text-3xl font-bold text-primary-500">
              {percentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Detailed Results</h2>
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="border-b border-gray-700 pb-6 last:border-b-0">
              <h3 className="text-lg font-medium mb-4">
                Question {index + 1}: {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => {
                  const isCorrect = optIndex === question.correctAnswer;
                  const isUserAnswer = optIndex === selectedAnswers[index];
                  
                  return (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-md ${
                        isCorrect && isUserAnswer
                          ? 'bg-green-900/50 text-green-300'
                          : isCorrect
                          ? 'bg-green-900/30 text-green-300'
                          : isUserAnswer
                          ? 'bg-red-900/50 text-red-300'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      <span className="font-medium">{['A', 'B', 'C', 'D'][optIndex]}. </span>
                      {option}
                      {isCorrect && isUserAnswer && ' ✓ (Your answer - Correct)'}
                      {isCorrect && !isUserAnswer && ' ✓ (Correct answer)'}
                      {!isCorrect && isUserAnswer && ' × (Your answer - Incorrect)'}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          onClick={generatePdf}
          icon={<Download size={18} />}
          iconPosition="right"
        >
          Download Results as PDF
        </Button>
        <Button
          onClick={() => navigate('/test')}
          variant="outline"
          icon={<ArrowLeft size={18} />}
        >
          Take Another Test
        </Button>
      </div>
    </div>
  );
};

export default Results; 