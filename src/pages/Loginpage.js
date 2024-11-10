// pages/Loginpage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

function Loginpage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/homepage');
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1><span className="highlight"> Spot<span className="ampersand">&</span>Park</span></h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
