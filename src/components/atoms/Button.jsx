import { motion } from 'framer-motion';

      const Button = ({ children, className = '', onClick, type = 'button', disabled, ...props }) => {
        return (
          <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center space-x-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
            {...props}
          >
            {children}
          </motion.button>
        );
      };

      export default Button;