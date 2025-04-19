import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ListChecks, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Test = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!subject) {
      setError('Please select a subject');
      return;
    }
    
    // In a real app, we would send this data to the backend
    // For now, we'll just navigate to the exam page with query params
    navigate(`/exam?subject=${subject}&topic=${encodeURIComponent(topic)}`);
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
          Take a Test
        </h1>
        <p className="text-xl text-gray-300">
          Select a subject and optionally specify topics you want to be tested on
        </p>
      </motion.div>
      
      <Card animate={false} className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setError('');
              }}
              className="form-input bg-gray-800"
            >
              <option value="">Select a subject</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="history">History</option>
              <option value="computer-science">Computer Science</option>
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
              Topics of Interest (Optional)
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter specific topics you're interested in (e.g., Algebra, Quantum Physics)"
              className="form-input bg-gray-800 h-32"
            />
            <p className="mt-1 text-sm text-gray-400">
              Separate multiple topics with commas
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Start Test
          </Button>
        </form>
      </Card>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <div className="flex items-start mb-4">
              <div className="text-primary-500 mr-4">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Wide Range of Subjects</h3>
                <p className="text-gray-400">
                  Our test platform covers a comprehensive range of academic subjects to meet diverse learning needs.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <div className="flex items-start mb-4">
              <div className="text-primary-500 mr-4">
                <ListChecks size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Customizable Tests</h3>
                <p className="text-gray-400">
                  Specify exactly what topics you want to be tested on to target your specific learning objectives.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Test;