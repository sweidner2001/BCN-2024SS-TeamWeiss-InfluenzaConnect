import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginDialog from './login/LoginDialog';
import Logo from '../logo.svg';

const NavBar: React.FC = () => {
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
                        setUser({ firstName: userData.user.first_name });
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
        <div className="flex flex-col bg-gray-50">
            <nav
                className="bg-gradient-to-r from-gray-900 to-blue-900 text-white px-4 py-2 flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-20 h-20 animate-spin-slow hover:scale-105 transition-transform duration-150"
                    />
                    <Link to="/" className="text-white text-2xl font-bold ml-4">InfluenzaConnect</Link>
                    <Link to="/about" className="ml-4 text-white hover:text-gray-400">About Us</Link>
                    <Link to="/findInfluencer" className="ml-4 text-white hover:text-gray-400">Influencer Finden</Link>
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                    {user ? (
                        <>
                            <span className="ml-4 text-xl text-white">Welcome, {user.firstName}</span>
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Login
                            </button>
                            <Link to="/signup"
                                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign
                                Up</Link>
                        </>
                    )}
                </div>
            </nav>

            <LoginDialog
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}  // Pass the callback here
            />
        </div>
)
    ;
}

export default NavBar;
