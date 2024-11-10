// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Landingpage from './pages/Landingpage'; // Import Landingpage

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} /> {/* Default landing page */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
