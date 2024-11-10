import React, { useState } from 'react';
import './Registerpage.css';

function Registerpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(value.endsWith('@buffalo.edu'));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Handle successful registration
      } else {
        alert(result.message); // Handle failed registration
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1><span className="highlight"> Spot<span className="ampersand">&</span>Park</span></h1>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!passwordMatch && <p className="error-text">Passwords do not match</p>}
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
