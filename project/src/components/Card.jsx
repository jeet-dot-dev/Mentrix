import { motion } from 'framer-motion';

const Card = ({ children, className = '', animate = true, ...props }) => {
  if (animate) {
    return (
      <motion.div
        className={`bg-background-card rounded-lg shadow-lg p-6 ${className}`}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div 
      className={`bg-background-card rounded-lg shadow-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;