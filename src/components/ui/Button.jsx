import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-orange-500 text-black hover:bg-orange-600 shadow-lg shadow-orange-500/20', // Enhanced visibility
    secondary: 'border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black',
    ghost: 'text-orange-500 hover:bg-orange-500/10',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;