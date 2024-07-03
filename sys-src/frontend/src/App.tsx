// Imports React:
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Imports eigene components:
import Signup from "./components/pages/Signup";
import Landing from "./components/pages/Landing";
import InfluencerOverview from "./components/pages/InfluencerOverview";

import ProfileView from "./components/pages/ProfileView";



//__________________ Routing _____________________
export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<Landing />} />
                <Route path="/findInfluencer" element={<InfluencerOverview />} />
                <Route path="/profileView" element={<ProfileView />} />
            </Routes>
        </Router>
    );
}
