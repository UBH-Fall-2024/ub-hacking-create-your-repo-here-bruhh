import React, { useState } from 'react';
import './Loginpage.css';

function Loginpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),  // using state variables here
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Handle successful login
      } else {
        alert(result.message); // Handle failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Spot&ParkBG.jpg" alt="Background" className="background-image" />
      </div>
      <div className="right-side">
        <h1><span className="highlight"> Spot<span className="ampersand">&</span>Park</span></h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Update username state
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password state
          />
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
