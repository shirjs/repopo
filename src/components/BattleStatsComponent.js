import React, { useState, useEffect } from 'react';

const BattleStatsComponent = () => {
  const [attackerStats, setAttackerStats] = useState({});
  const [fairFightMultiplier, setFairFightMultiplier] = useState(0);
  const [defenderBattleStatScore, setDefenderBattleStatScore] = useState(0);

  useEffect(() => {
    // API request logic to fetch attacker's stats
    const fetchData = async () => {
      const response = await fetch("https://api.torn.com/user/2080313?selections=battlestats&comment=TornAPI&key=d1c336ETaWaZtu22");
      const data = await response.json();
      setAttackerStats(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // API request logic to fetch fair fight multiplier
    // Set the fetched fair fight multiplier using setFairFightMultiplier(responseData)
  }, []);

  useEffect(() => {
    if (attackerStats && fairFightMultiplier) {
      const attackerBattleStatScore =
        Math.sqrt(attackerStats.defense) +
        Math.sqrt(attackerStats.speed) +
        Math.sqrt(attackerStats.dexterity) +
        Math.sqrt(attackerStats.strength);

      const estimatedDefenderBattleStatScore =
        attackerBattleStatScore * fairFightMultiplier;

      setDefenderBattleStatScore(estimatedDefenderBattleStatScore);
    }
  }, [attackerStats, fairFightMultiplier]);

  return (
    <div>
      {/* Display some data if it's loaded */}
      {attackerStats && attackerStats.strength && (
        <div>
          <h1>Battle Stats:</h1>
          {/* Assuming "strength" is one of the properties in the data */}
          <p>Strength: {attackerStats.strength}</p>
        </div>
      )}
    </div>
  );
};

export default BattleStatsComponent;
