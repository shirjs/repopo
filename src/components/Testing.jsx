import React from 'react';
import { useUserApiKey } from '../hooks/useUserApiKey';

function Testing() {
  const apiKey = useUserApiKey();

  return (
    <div>
      {apiKey ? <h1>User API Key: {apiKey}</h1> : <h1>Loading...</h1>}
    </div>
  );
}

export default Testing;
