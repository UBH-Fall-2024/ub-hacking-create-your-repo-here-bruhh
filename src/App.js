// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Landingpage from './pages/Landingpage';
import Homepage from './pages/Homepage';
import JarvisB from './pages/JarvisB';
import JarvisA from './pages/JarvisA';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/Jarvis-b" element={<JarvisB />} />
          <Route path="/jarvis-a" element={<JarvisA />} /> {/* Add JarvisA route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
