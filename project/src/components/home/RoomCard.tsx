import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

interface RoomCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  onClick 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        <span>{buttonText}</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default RoomCard;