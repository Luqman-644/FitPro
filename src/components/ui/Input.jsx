import { motion } from 'framer-motion';

const Input = ({ 
  className = '', 
  ...props 
}) => {
  const classes = `input-orange rounded-lg px-4 py-3 w-full focus:outline-none ${className}`;
  
  return (
    <motion.input
      className={classes}
      whileFocus={{ scale: 1.02 }}
      {...props}
    />
  );
};

export default Input;