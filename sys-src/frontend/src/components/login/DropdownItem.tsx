import React from 'react';
import { motion } from 'framer-motion';

interface DropdownItemProps {
  children: React.ReactNode;
}

const LoginDropdown: React.FC<DropdownItemProps> = ({ children }) => {
  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      className="px-4 py-1 cursor-pointer transition ease-in duration-200"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default LoginDropdown;