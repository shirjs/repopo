// useFetchFairFightData.js
import { useState, useEffect } from 'react';
import FetchUserBasicInfo from '../components/FetchUserBasicInfo';
import FetchUserBattleStats from '../components/FetchUserBattleStats';

const useFetchFairFightData = (apiKey, isKeySubmitted) => {
  const userName = FetchUserBasicInfo();
  const [fairFightsData, setFairFightsData] = useState({});
  const attackerStats = FetchUserBattleStats();

  const addFairFight = (defender, fairFightMultiplier, battlestatScore) => {
    setFairFightsData(prevData => ({
      ...prevData,
      [defender]: {
        fairFightMultiplier: fairFightMultiplier,
        battlestatScore: battlestatScore
      }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isKeySubmitted) return;  // only fetch if the key is submitted

      try {
        const response = await fetch(`https://api.torn.com/user/?selections=attacks&limit=100&comment=TornAPI&key=${apiKey}`);
        // rest of your code...
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userName, attackerStats, apiKey, isKeySubmitted]);

  return fairFightsData;
};

export default useFetchFairFightData;
