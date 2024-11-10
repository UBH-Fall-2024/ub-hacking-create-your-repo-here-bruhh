// pages/Registerpage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Registerpage.css';

function Registerpage() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here if needed

    // Navigate to login page after registration
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1>Welcome to <span className="highlight">Spot&Park</span></h1>
        <form className="register-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;
