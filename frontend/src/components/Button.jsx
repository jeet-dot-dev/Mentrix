import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-2.5 px-5 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    accent: 'bg-accent-600 hover:bg-accent-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-800 text-gray-100',
    ghost: 'hover:bg-gray-800 text-gray-300 hover:text-white',
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`
        rounded-md font-medium transition-colors duration-200 
        flex items-center justify-center gap-2
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </motion.button>
  );
};

export default Button;