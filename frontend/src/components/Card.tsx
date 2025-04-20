import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const Card = ({ children, className = '', animate = true }: CardProps) => {
  return (
    <motion.div
      className={`bg-background-card rounded-lg shadow-lg p-6 ${className}`}
      whileHover={animate ? { y: -5, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default Card; 