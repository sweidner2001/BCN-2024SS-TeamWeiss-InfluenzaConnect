import React from 'react';
import { Link } from 'react-router-dom';
import LoginDropDownMenu from '../login/DropdownMenu';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-800 to-blue-900 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-400 mr-4">Logo</div>
          <Link to="/" className="text-white text-xl font-bold">InfluenzaConnect</Link>
          <Link to="/about" className="ml-4 text-white hover:text-gray-400">About Us</Link>
        </div>
        <div className="flex items-center">
          <LoginDropDownMenu name="Login">
            <input className="w-full px-2 py-1 mb-2 bg-gray-700 rounded-md hover:bg-gray-600" type="text" placeholder="Username" />
            <input className="w-full px-2 py-1 mb-2 bg-gray-700 rounded-md hover:bg-gray-600" type="password" placeholder="Password" />
            <button className="w-full px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => console.log('Login button clicked')}>Login</button>
          </LoginDropDownMenu>
          <Link to="/signup" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</Link>
        </div>
      </nav>
      
      {/* Description Text */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to InfluenzaConnect</h1>
        <p className="text-xl text-gray-700 text-center">Your strategic partner in influencer marketing. Connecting brands with the right influencers seamlessly.</p>
        
        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4">
          <Link to="/homepage" className="bg-gradient-to-l from-blue-300 to-blue-600 shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold mb-4">Spectator</h2>
            <p className="text-gray-700">Explore content and stay updated with the latest trends.</p>
          </Link>
          <Link to="/signup" className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold mb-4">Influencer</h2>
            <p className="text-gray-700">Join our platform to showcase and analyze your influence.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
