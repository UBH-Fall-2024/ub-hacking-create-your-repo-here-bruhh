// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Landingpage from './pages/Landingpage';
import Homepage from './pages/Homepage';
import JarvisB from './pages/JarvisB'; // Import JarvisB

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} /> {/* Default landing page */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/jarvis-b" element={<JarvisB />} /> {/* Add JarvisB route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

