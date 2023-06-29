import React, { useState, useEffect } from 'react';

const FairFightData = () => {
  const [userName, setUserName] = useState(null);
  const [fairFightsData, setFairFightsData] = useState({});
  const [attackerStats, setAttackerStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const responseUserName = await fetch("https://api.torn.com/user/?selections=basic&comment=TornAPI&key=d1c336ETaWaZtu22");
      const dataUserName = await responseUserName.json();
      setUserName(dataUserName.name);

      const responseUserStats = await fetch("https://api.torn.com/user/2080313?selections=battlestats&comment=TornAPI&key=d1c336ETaWaZtu22");
      const dataUserStats = await responseUserStats.json();
      setAttackerStats(dataUserStats);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let attackerBattleStatScore;
    if (userName && attackerStats && Object.keys(attackerStats).length > 0) {
      attackerBattleStatScore =
        Math.sqrt(attackerStats.defense) +
        Math.sqrt(attackerStats.speed) +
        Math.sqrt(attackerStats.dexterity) +
        Math.sqrt(attackerStats.strength);
    }
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.torn.com/user/?selections=attacks&limit=5&comment=TornAPI&key=d1c336ETaWaZtu22");
        const data = await response.json();

        for (let attackId in data.attacks) {
          const attackData = data.attacks[attackId];
          if (attackData.modifiers && attackData.modifiers.fair_fight && userName === attackData.attacker_name) {
            console.log("check");
            let estimatedDefenderBattleStatScore = null; // Declare the variable with a default value
            

            if (attackData.modifiers.fair_fight > 1 && attackData.modifiers.fair_fight < 3) {
              estimatedDefenderBattleStatScore =
                attackerBattleStatScore * (attackData.modifiers.fair_fight - 1) * (3 / 8);
            } else {
              estimatedDefenderBattleStatScore = "insufficient info";
            }
            const addFairFight = (defender, fairFightMultiplier, battlestatScore) => {
              console.log("check2");
              setFairFightsData(prevData => ({
                ...prevData,
                [defender]: {
                  fairFightMultiplier: fairFightMultiplier,
                  battlestatScore: battlestatScore
                }
              }));
            }
            addFairFight(attackData.defender_name, attackData.modifiers.fair_fight, estimatedDefenderBattleStatScore);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
    console.log(fairFightsData);
  }, [userName, attackerStats]);

  return (
    <div>
      {/* Display fair fights data if it's loaded */}
      {Object.keys(fairFightsData).length > 0 && (
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

export default FairFightData;
