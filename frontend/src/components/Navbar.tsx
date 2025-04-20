import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  
  const toggleMenu = (): void => setIsOpen(!isOpen);
  
  const isActive = (path: string): string => {
    return location.pathname === path ? 'text-primary-400 font-semibold' : 'text-gray-300 hover:text-white';
  };

  return (
    <header className="bg-background-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://i.imgur.com/iNGXZD0.png" alt="" className='h-[30px]' />
            <span className="text-xl font-bold text-white">Merntix</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/test" className={`${isActive('/test')} transition-colors duration-200`}>
              Test
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-gray-900"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              to="/" 
              className={`${isActive('/')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/test" 
              className={`${isActive('/test')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Test
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 