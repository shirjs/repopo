import { useState, useEffect } from 'react';

const useFetchUserBattleStats = (apiKey) => {
  const [attackerStats, setAttackerStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey) return;
      try {
        const responseUserStats = await fetch(`https://api.torn.com/user/?selections=battlestats&comment=TornAPI&key=${apiKey}`);
        const dataUserStats = await responseUserStats.json();
        
        // Check for error in the API response and throw it as a string
        if (dataUserStats.error) {
          throw new Error(JSON.stringify(dataUserStats.error));
        }
  
        setAttackerStats(dataUserStats);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
  }, [apiKey]);
  
  

  return attackerStats;
};

export default useFetchUserBattleStats;
