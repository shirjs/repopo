import React, { useState } from 'react';
import useFetchFairFightData from '../hooks/useFetchFairFightData';
import useInput from '../hooks/useInput';

const DisplayFairFightData = () => {
  const { value: apiKey, bind: bindApiKey } = useInput('');
  const [isKeySubmitted, setIsKeySubmitted] = useState(false);

  const submitApiKey = event => {
    event.preventDefault();
    setIsKeySubmitted(true);
  };

  const fairFightsData = useFetchFairFightData(apiKey, isKeySubmitted);

  return (
    <div>
      <form onSubmit={submitApiKey}>
        <label>
          API Key:
          <input type="text" {...bindApiKey} />
        </label>
        <input type="submit" value="Submit" />
      </form>

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
