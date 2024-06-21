// Imports React:
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Imports eigene components:
import Button from './components/Button';
import ButtonDB from './components/ButtonSend2DB';
import Signup from "./components/pages/Signup";
import Landing from "./components/pages/Landing";
import InfluencerOverview from "./components/pages/InfluencerOverview";


//######################### Components ############################
function Home() {
    return (

      <div className="App">
        <header className="App-header">
        <Button />
        <ButtonDB />
        <ButtonDB />

        </header>
      </div>
    );
}


//__________________ Routing _____________________
export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/findInfluencer" element={<InfluencerOverview />} />
            </Routes>
        </Router>
    );
}
