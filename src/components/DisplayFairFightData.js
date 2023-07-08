// DisplayFairFightData.js
import React, { useState } from 'react';
import useFetchFairFightData from '../hooks/useFetchFairFightData';

const DisplayFairFightData = () => {
  const [isKeySubmitted, setIsKeySubmitted] = useState(false);

  const submitApiKey = event => {
    event.preventDefault();
    setIsKeySubmitted(true);
  };

  const fairFightsData = useFetchFairFightData(isKeySubmitted);

  return (
    <div>
      <button onClick={submitApiKey}>Fetch Data</button>

      {isKeySubmitted && Object.keys(fairFightsData).length > 0 && (
        <div>
          <h1>Fair Fights Data:</h1>
          {Object.entries(fairFightsData).map(([defender, data]) => (
            <p key={defender}>
              {defender}: fairFightMultiplier - {data.fairFightMultiplier}, Battlestat Score - {data.battlestatScore}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayFairFightData;
