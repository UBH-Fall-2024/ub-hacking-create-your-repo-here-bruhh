// pages/Registerpage.js
import React, { useState } from 'react';
import './Registerpage.css';

function Registerpage() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(value.endsWith('@buffalo.edu'));
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1><span className="highlight"> Spot<span className="ampersand">&</span>Park</span></h1>
        <form className="register-form">
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />
          <input 
            type="email" 
            placeholder="Email" 
            className={`input-field ${isEmailValid ? '' : 'invalid'}`} 
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && <p className="error-text">Email must end with "@buffalo.edu"</p>}
          <button type="submit" className="register-button">REGISTER</button>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;
