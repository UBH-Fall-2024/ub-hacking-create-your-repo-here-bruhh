// pages/Landingpage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landingpage.css';

function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1>Welcome to <span className="highlight">Spot<span className="ampersand">&</span>Park</span></h1>
        <div className="button-container">
          <button className="landing-button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="landing-button" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
