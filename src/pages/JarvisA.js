// pages/JarvisA.js
import React, { useState } from 'react';
import './JarvisA.css';

function JarvisA() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [unavailableSpots, setUnavailableSpots] = useState(new Set());

  const rows = 10;
  const columns = 38;
  const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const layout = Array.from({ length: rows }, (_, rowIndex) => {
    const excludedIndices = new Set();
    let rowColumns = columns;

    if (rowIndex === 0) {
      rowColumns = 38;
    } else if (rowIndex === 1 || rowIndex === 2) {
      excludedIndices.add(0).add(1).add(36).add(37);
      rowColumns = 34;
    } else if (rowIndex >= 3 && rowIndex <= 8) {
      excludedIndices.add(1).add(36).add(37);
      rowColumns = 35;
    } else if (rowIndex === 9) {
      rowColumns = 37;
    }

    return Array.from({ length: columns }, (_, colIndex) => {
      if (excludedIndices.has(colIndex)) return 'space';

      const adjustedIndex = colIndex - [...excludedIndices].filter(index => index < colIndex).length + 1;
      const spotLabel = `spot-${adjustedIndex}${rowLabels[rowIndex]}`;
      return spotLabel;
    });
  });

  const handleSpotClick = (spot) => {

    if (spot === '38J') return;

    setSelectedSpot(spot);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setUnavailableSpots((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(selectedSpot)) {
        newSet.delete(selectedSpot);
      } else {
        newSet.add(selectedSpot);
      }
      return newSet;
    });
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="parking-lot-container-jarvisA">
      <div className="legend-jarvisA">
        <div className="legend-left-jarvisA">
          <div className="legend-item-jarvisA">
            <div className="legend-box-jarvisA available-jarvisA"></div>
            <span>- Available</span>
          </div>
          <div className="legend-item-jarvisA">
            <div className="legend-box-jarvisA unavailable-jarvisA"></div>
            <span>- Unavailable</span>
          </div>
        </div>
        <h1 className="lot-heading-jarvisA">Jarvis A Lot</h1>
        <div className="legend-right-jarvisA">
          <div className="legend-item-jarvisA">
            <div className="legend-box-jarvisA sa-reserved-jarvisA"></div>
            <span>- SA Reserved</span>
          </div>
          <div className="legend-item-jarvisA">
            <div className="legend-box-jarvisA handicapped-jarvisA"></div>
            <span>- Handicapped</span>
          </div>
        </div>
      </div>

      <div className="parking-lot-jarvisA">
        <div className="lee-rd-label-jarvisA">Jarvis A→</div>
        <div className="jarvis-b-label-jarvisA">← Hamilton Rd</div>
        <div className="new-jarvis-a-label-jarvisA">Jarvis A→</div> 
        {layout.map((row, rowIndex) => (
          <div className={`parking-row-jarvisA ${rowIndex % 2 === 0 ? 'row-spacing-jarvisA' : ''}`} key={`row-${rowIndex}`}>
            {row.map((slot, colIndex) => {
              const spotLabel = slot.split('-')[1];
              const isYellowSpot = spotLabel === '38J'; 

              return (
                <button
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className={`parking-slot-jarvisA ${
                    slot === 'space'
                      ? 'empty-space-jarvisA'
                      : unavailableSpots.has(spotLabel)
                      ? 'unavailable-spot-jarvisA'
                      : isYellowSpot
                      ? 'yellow-spot-jarvisA'
                      : 'parking-spot-jarvisA'
                  }`}
                  onClick={() => slot !== 'space' && handleSpotClick(spotLabel)}
                  disabled={slot === 'space'}
                >
                  {slot !== 'space' ? spotLabel : ''}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-jarvisA">
          <div className="popup-content-jarvisA">
            <p>
              {unavailableSpots.has(selectedSpot)
                ? `Mark ${selectedSpot} as available?`
                : `Mark ${selectedSpot} as unavailable?`}
            </p>
            <div className="popup-buttons-jarvisA">
              <button className="confirm-button-jarvisA" onClick={handleConfirm}>✔</button>
              <button className="cancel-button-jarvisA" onClick={handleCancel}>✘</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JarvisA;
