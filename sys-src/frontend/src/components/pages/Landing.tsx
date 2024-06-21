// LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginDropDownMenu from '../login/DropdownMenu';
import Logo from '../../logo.svg';

const LandingPage: React.FC = () => {
    const logoVariants = {
        hidden: { scale: 1 },
        visible: { scale: [1, 1.3, 1], transition: { duration: 2, repeat: Infinity } },
    };
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-gray-900 to-blue-900 text-white px-4 py-2 flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="w-20 h-20 animate-spin-slow hover:scale-105 transition-transform duration-150"
                    />
                    <Link to="/" className="text-white text-2xl font-bold ml-4">InfluenzaConnect</Link>
                    <Link to="/about" className="ml-4 text-white hover:text-gray-400">About Us</Link>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                    <LoginDropDownMenu name="Login">
                        <input className="w-full px-2 py-1 mb-2 bg-gray-700 rounded-md hover:bg-gray-600" type="text" placeholder="Username" />
                        <input className="w-full px-2 py-1 mb-2 bg-gray-700 rounded-md hover:bg-gray-600" type="password" placeholder="Password" />
                        <button className="w-full px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => console.log('Login button clicked')}>Login</button>
                    </LoginDropDownMenu>
                    <Link to="/signup" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</Link>
                </div>
            </nav>
            
            {/* Description Text */}
            <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
                <motion.img 
                    src={Logo} 
                    alt="InfluenzaConnect Logo" 
                    className="w-40 h-40 mb-8 hidden md:block"
                    initial="hidden"
                    animate="visible"
                    variants={logoVariants}
                />

                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-900">Welcome to InfluenzaConnect</h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8">Your strategic partner in influencer marketing. Connecting brands with the right influencers seamlessly.</p>
                
                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    <motion.div 
                        className="bg-gradient-to-l from-blue-700 to-blue-900 shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-150"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to="/homepage">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Spectator</h2>
                            <p className="text-lg md:text-xl text-gray-100 mb-4">Explore content and stay updated with the latest trends.</p>
                            <p className="text-sm text-gray-200">InfluenzaConnect is a web application that automates and modernizes influencer marketing for businesses. It provides a convenient platform for influencers to showcase themselves on the web.</p>
                        </Link>
                    </motion.div>
                    <motion.div 
                        className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-150"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to="/profileView">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Influencer</h2>
                            <p className="text-lg md:text-xl text-gray-100 mb-4">Join our platform to showcase and analyze your influence.</p>
                            <p className="text-sm text-gray-200">The uniqueness of InfluenzaConnect lies in the automated analysis of the influencer's social media profile through web scraping, as well as a user-friendly interface and a scalable backend architecture.</p>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
