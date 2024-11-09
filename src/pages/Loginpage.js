// pages/Loginpage.js
import React from 'react';
import './Loginpage.css';

function Loginpage() {
  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1><span className="highlight"> Spot<span className="ampersand">&</span>Park</span></h1>
        <form className="login-form">
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;