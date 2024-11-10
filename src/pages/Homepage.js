// pages/Homepage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();
  const [selectedLot, setSelectedLot] = useState('');

  const handleGo = () => {
    if (selectedLot === 'jarvisB') {
      navigate('/jarvis-b');
    }
  };

  return (
    <div className="homepage-container">
      <div className="content-background">
        <h1 className="title">
          Spot<span className="and-symbol">&</span>Park
        </h1>
        <div className="dropdown-container">
          <select
            className="parking-dropdown"
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
          >
            <option value="" disabled>Select a Parking Lot</option>
            <option value="jarvisB">Jarvis B Lot</option>
          </select>
          <button className="go-button" onClick={handleGo}>Go</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
