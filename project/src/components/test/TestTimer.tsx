import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  initialTime?: number; // time in seconds
  onTimeUp?: () => void;
  isPaused?: boolean;
}

const TestTimer: React.FC<TestTimerProps> = ({ 
  initialTime = 1800, // default 30 minutes
  onTimeUp, 
  isPaused = false
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    let timerId: number;
    
    if (!isPaused && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && onTimeUp) {
      onTimeUp();
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timeLeft, isPaused, onTimeUp]);
  
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    
    setFormattedTime(`${formattedMin}:${formattedSec}`);
  }, [timeLeft]);
  
  // Calculate percentage for progress indicator
  const percentage = (timeLeft / initialTime) * 100;
  
  let timerColor = 'text-green-600';
  if (percentage < 50) timerColor = 'text-yellow-600';
  if (percentage < 25) timerColor = 'text-red-600';

  return (
    <div className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
      <Clock className={`h-5 w-5 ${timerColor}`} />
      <span className={`font-mono text-lg font-semibold ${timerColor}`}>
        {formattedTime}
      </span>
      <div className="w-full bg-gray-200 rounded-full h-2 hidden md:block">
        <div 
          className={`h-2 rounded-full ${
            percentage > 50 ? 'bg-green-500' : percentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
          }`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TestTimer;