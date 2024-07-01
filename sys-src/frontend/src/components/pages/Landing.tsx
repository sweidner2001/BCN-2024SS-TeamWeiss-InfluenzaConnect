import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginDialog from '../login/LoginDialog';
import Logo from '../../logo.svg';
import NavBar from "../NavBar";

const LandingPage: React.FC = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState<{ firstName: string } | null>(null);
    const navigate = useNavigate();

    const logoVariants = {
        hidden: { scale: 1 },
        visible: { scale: [1, 1.3, 1], transition: { duration: 2, repeat: Infinity } },
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5001/get_session_email', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    const userResponse = await fetch('http://localhost:5001/profileView', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: data.email }),
                        credentials: 'include'
                    });
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUser({ firstName: userData.first_name });
                    }
                }
            } catch (error) {
                console.error('Failed to check session:', error);
            }
        };

        checkSession();
    }, []);

    const handleLoginSuccess = (userData: { firstName: string }) => {
        setUser(userData);
        setIsLoginOpen(false);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5001/remove_session', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null);
                navigate('/landing');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (

        <>
            <NavBar/>

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
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    <motion.div 
                        className="bg-gradient-to-l from-blue-700 to-blue-900 shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-150"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to="/findInfluencer">
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
        </>
    );
}

export default LandingPage;
