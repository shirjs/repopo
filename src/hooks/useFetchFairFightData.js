import { useState, useEffect } from 'react';
import useFetchUserBasicInfo from './useFetchUserBasicInfo';
import useFetchUserBattleStats from './useFetchUserBattleStats';
import { useUserApiKey } from './useUserApiKey';


const useFetchFairFightData = (isKeySubmitted) => {
  const apiKey = useUserApiKey();
  const userName = useFetchUserBasicInfo(apiKey);
  const attackerStats = useFetchUserBattleStats(apiKey);
  const [fairFightsData, setFairFightsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!isKeySubmitted) return;  // only fetch if the key is submitted

      try {
        const response = await fetch(`https://api.torn.com/user/?selections=attacks&limit=50&comment=TornAPI&key=${apiKey}`);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(JSON.stringify(data.error));
        }

        let attackerBattleStatScore;
        if (userName && attackerStats && Object.keys(attackerStats).length > 0) {
          attackerBattleStatScore =
            Math.sqrt(attackerStats.defense) +
            Math.sqrt(attackerStats.speed) +
            Math.sqrt(attackerStats.dexterity) +
            Math.sqrt(attackerStats.strength);
        }

        for (let attackId in data.attacks) {
          const attackData = data.attacks[attackId];
          if (attackData.modifiers && attackData.modifiers.fair_fight && userName === attackData.attacker_name) {
            let estimatedDefenderBattleStatScore = null;

            if (attackData.modifiers.fair_fight > 1 && attackData.modifiers.fair_fight < 3) {
              estimatedDefenderBattleStatScore =
                attackerBattleStatScore * (attackData.modifiers.fair_fight - 1) * (3 / 8);
            } else {
              estimatedDefenderBattleStatScore = "insufficient info";
            }
            
            setFairFightsData(prevData => ({
              ...prevData,
              [attackData.defender_name]: {
                fairFightMultiplier: attackData.modifiers.fair_fight,
                battlestatScore: estimatedDefenderBattleStatScore
              }
            }));
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userName, attackerStats, apiKey, isKeySubmitted]);

  return fairFightsData;
};

export default useFetchFairFightData;
