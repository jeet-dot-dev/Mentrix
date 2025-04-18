import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Mentrix</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/') ? 'border-blue-500' : 'border-transparent'} ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/test" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/test') ? 'border-blue-500' : 'border-transparent'} ${isActive('/test')}`}>
                Test
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 rounded-md"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200">
              Login
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around pt-2 pb-3 space-y-1">
          <Link to="/" className={`${isActive('/')} block px-3 py-2 rounded-md text-base font-medium`}>
            Home
          </Link>
          <Link to="/test" className={`${isActive('/test')} block px-3 py-2 rounded-md text-base font-medium`}>
            Test
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;