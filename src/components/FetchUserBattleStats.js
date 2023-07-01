// FetchUserBattleStats.js
import { useState, useEffect } from 'react';

const FetchUserBattleStats = (apiKey) => {
  const [attackerStats, setAttackerStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUserStats = await fetch(`https://api.torn.com/user/2080313?selections=battlestats&comment=TornAPI&key=${apiKey}`);
        const dataUserStats = await responseUserStats.json();
        setAttackerStats(dataUserStats);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [apiKey]);

  return attackerStats;
};

export default FetchUserBattleStats;
