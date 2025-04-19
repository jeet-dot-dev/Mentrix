import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, BarChart3, Medal, Home } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const getResultMessage = (percentage) => {
  if (percentage >= 90) {
    return {
      title: "Excellent!",
      message: "Outstanding performance! You've demonstrated mastery of the subject material.",
      color: "text-green-400"
    };
  } else if (percentage >= 70) {
    return {
      title: "Good Job!",
      message: "Strong performance! You have a solid understanding of the material.",
      color: "text-blue-400"
    };
  } else if (percentage >= 50) {
    return {
      title: "Nice Effort!",
      message: "You're on the right track, but there's room for improvement.",
      color: "text-yellow-400"
    };
  } else {
    return {
      title: "Keep Practicing!",
      message: "This topic needs more attention. Review the material and try again.",
      color: "text-red-400"
    };
  }
};

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const score = parseInt(queryParams.get('score') || '0');
  const total = parseInt(queryParams.get('total') || '5');
  const subject = queryParams.get('subject') || 'general';
  
  const percentage = Math.round((score / total) * 100);
  const resultMessage = getResultMessage(percentage);
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF report
    alert('char chabannni ghore pe ambani mere lawre pe');
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
          Your Test Results
        </h1>
        <p className="text-xl text-gray-300 capitalize">
          {subject.replace('-', ' ')} Assessment
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card className="h-full flex flex-col">
            <h2 className={`text-2xl font-bold mb-3 ${resultMessage.color}`}>
              {resultMessage.title}
            </h2>
            <p className="text-gray-300 mb-6">
              {resultMessage.message}
            </p>
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-400 text-sm">Score</p>
                <p className="text-3xl font-bold">
                  {score}/{total}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-gray-400 text-sm">Percentage</p>
                <p className="text-3xl font-bold">
                  {percentage}%
                </p>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
              <motion.div 
                className={`h-4 rounded-full ${
                  percentage >= 90 ? 'bg-green-500' :
                  percentage >= 70 ? 'bg-blue-500' :
                  percentage >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            
            <div className="mt-auto">
              <Button 
                onClick={handleDownload} 
                className="w-full"
                icon={<Download size={18} />}
              >
                Download Results
              </Button>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-primary-500" size={24} />
              <h2 className="text-xl font-semibold">Performance</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Correct Answers</span>
                  <span className="text-green-400">{score}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="h-2 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score/total)*100}%` }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Incorrect Answers</span>
                  <span className="text-red-400">{total - score}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="h-2 rounded-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((total-score)/total)*100}%` }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Medal className="text-yellow-500" size={20} />
                  <span className="font-medium">Achievement</span>
                </div>
                <p className={`text-lg font-semibold ${
                  percentage >= 90 ? 'text-green-400' :
                  percentage >= 70 ? 'text-blue-400' :
                  percentage >= 50 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {
                    percentage >= 90 ? 'Master' :
                    percentage >= 70 ? 'Advanced' :
                    percentage >= 50 ? 'Intermediate' :
                    'Beginner'
                  }
                </p>
              </div>
            </div>
            
            <div className="mt-auto pt-6">
              <Link to="/test">
                <Button variant="outline" className="w-full">
                  Take Another Test
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <div className="flex justify-center">
        <Link to="/">
          <Button 
            variant="ghost" 
            icon={<Home size={18} />}
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Results;