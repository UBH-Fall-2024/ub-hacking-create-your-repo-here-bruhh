// pages/JarvisB.js
import React, { useState } from 'react';
import './JarvisB.css';

function JarvisB() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [unavailableSpots, setUnavailableSpots] = useState(new Set());

  const rows = 10;
  const columns = 35;
  const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const blueSlots = new Set(['1J', '2J', '3J', '4J', '30J', '31J', '32J', '33J']); // List of dark blue spots

  const layout = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => {
      if (rowIndex >= 1 && rowIndex <= 8) {
        const excludedIndices = [0, 1, 31, 32, 33];
        if (excludedIndices.includes(colIndex)) return 'space';

        const adjustedIndex = colIndex - excludedIndices.filter(index => index < colIndex).length + 1;
        return `spot-${adjustedIndex > 31 ? 32 : adjustedIndex}${rowLabels[rowIndex]}`;
      }
      if (rowIndex === 9) {
        const excludedIndices = [0, 34];
        if (excludedIndices.includes(colIndex)) return 'space';

        const adjustedIndex = colIndex - excludedIndices.filter(index => index < colIndex).length + 1;
        return `spot-${adjustedIndex}J`;
      }
      return `spot-${colIndex + 1}${rowLabels[rowIndex]}`;
    })
  );

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setUnavailableSpots((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(selectedSpot)) {
        newSet.delete(selectedSpot); // Mark spot as available (green)
      } else {
        newSet.add(selectedSpot); // Mark spot as unavailable (red)
      }
      return newSet;
    });
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="parking-lot-container">
      <div className="legend">
        <div className="legend-left">
          <div className="legend-item">
            <div className="legend-box available"></div>
            <span>- Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-box unavailable"></div>
            <span>- Unavailable</span>
          </div>
        </div>
        <h1 className="lot-heading">Jarvis B Lot</h1>
        <div className="legend-right">
          <div className="legend-item">
            <div className="legend-box sa-reserved"></div>
            <span>- SA Reserved</span>
          </div>
          <div className="legend-item">
            <div className="legend-box handicapped"></div>
            <span>- Handicapped</span>
          </div>
        </div>
      </div>

      <div className="parking-lot">
        <div className="lee-rd-label">Lee Rd →</div>
        <div className="jarvis-a-label">← Jarvis A</div>
        {layout.map((row, rowIndex) => (
          <div className={`parking-row ${rowIndex % 2 === 0 ? 'row-spacing' : ''}`} key={`row-${rowIndex}`}>
            {row.map((slot, colIndex) => {
              const spotLabel = slot.split('-')[1];
              const isBlueSpot = blueSlots.has(spotLabel);

              return (
                <button
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className={`parking-slot ${
                    slot === 'space'
                      ? 'empty-space'
                      : unavailableSpots.has(spotLabel)
                      ? 'unavailable-spot'
                      : isBlueSpot
                      ? 'blue-spot'
                      : 'parking-spot'
                  }`}
                  onClick={() => !isBlueSpot && slot !== 'space' && handleSpotClick(spotLabel)}
                  disabled={slot === 'space' || isBlueSpot} // Disable button if it is a space or blue spot
                >
                  {slot !== 'space' ? spotLabel : ''}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              {unavailableSpots.has(selectedSpot)
                ? `Mark ${selectedSpot} as available?`
                : `Mark ${selectedSpot} as unavailable?`}
            </p>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleConfirm}>✔</button>
              <button className="cancel-button" onClick={handleCancel}>✘</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JarvisB;
