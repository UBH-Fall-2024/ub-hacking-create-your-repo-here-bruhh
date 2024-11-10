import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registerpage.css';

function Registerpage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('student'); 
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setIsEmailValid(emailInput.endsWith('@buffalo.edu'));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);

    try {
      const response = await fetch('http://10.84.101.26/SpotNPark/include/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, status }),
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage(''); 
        setSuccessMessage(result.message); 
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setErrorMessage(result.message);
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
        <h1>Welcome to <span className="highlight">Spot&Park</span></h1>
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
          {successMessage && <p className="success-text">{successMessage}</p>}
          {errorMessage && <p className="error-text">{errorMessage}</p>} 
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;
