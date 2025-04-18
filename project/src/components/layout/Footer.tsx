import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm">
              Made with 
            </p>
            <Heart className="h-4 w-4 text-red-500 mx-1" />
            <p className="text-gray-500 text-sm">
              Char Chabanni Ghore pe Ambani mere lawre pe!
            </p>
          </div>
          <p className="mt-2 text-gray-400 text-xs">
            © {new Date().getFullYear()} Mentrix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;