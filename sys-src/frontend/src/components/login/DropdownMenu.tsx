import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginDropdown from './DropdownItem';

interface DropDownMenuProps {
  name: string;
  direction?: 'right' | 'bottom';
  children: React.ReactNode;
}

const LoginDropDownMenu: React.FC<DropDownMenuProps> = ({ name, direction = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Password: password
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        alert('Anmeldung erfolgreich');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Fehler bei der Anmeldung:', error);
    }
  };

  const dropdownClasses = direction === 'right'
    ? 'absolute right-full top-0 bg-gray-800 text-white py-2 mt-2 rounded-md w-64 transition ease-in duration-200 transform origin-top-right'
    : 'absolute right-0 bg-gray-900 text-white py-2 mt-2 rounded-md w-64 transition ease-in duration-200 transform origin-top-right';

  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="text-gray-300 mx-3 hover:text-white cursor-pointer">
        {name}
      </button>
      <div className="relative -mt-2 h-2"></div> {/* Invisible border */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownClasses}
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <LoginDropdown>
              <input className="w-full px-2 py-1 mb-2 bg-gray-700 rounded-md hover:bg-gray-600" type="text" placeholder="Email" value={email} />
              <input className="w-full px-2 py-1 mb-2 bg-gray-700 rounded-md hover:bg-gray-600" type="password" placeholder="Password" value={password}/>
              <button className="w-full px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleLogin}>Login</button>
            </LoginDropdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginDropDownMenu;