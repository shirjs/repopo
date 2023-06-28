import React, { useState, useEffect } from 'react';

const BattleStatsComponentMoreData = () => {
  const [userName, setUserName] = useState(null);
  const [attackerStats, setAttackerStats] = useState({});
  const [fairFightMultiplier, setFairFightMultiplier] = useState(0);
  const [fairFightsMultiplier, setFairFightsMultiplier] = useState({});
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
    // API request logic to fetch attacker's stats
    const fetchData = async () => {
      const response = await fetch("https://api.torn.com/user/?selections=basic&comment=TornAPI&key=d1c336ETaWaZtu22");
      const data = await response.json();
      setUserName(data.name);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // API request logic to fetch fair fight multiplier
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.torn.com/user/?selections=attacks&limit=5&comment=TornAPI&key=d1c336ETaWaZtu22");
        const data = await response.json();
    
        // Loop over the keys of 'attacks' and find the first 'fair_fight' value
        for (let attackId in data.attacks) {
          const attackData = data.attacks[attackId];
          if (attackData.modifiers && attackData.modifiers.fair_fight && userName == attackData.attacker_name) {
            console.log("check");
            const addFairFight = (defender, multiplier) => {
                console.log("check2");
                setFairFightsMultiplier(prevFairFightsMultiplier => ({
                    ...prevFairFightsMultiplier,
                    [defender]: multiplier
                }));
            }
            addFairFight(attackData.defender_name, attackData.modifiers.fair_fight )
            // setFairFightMultiplier(attackData.modifiers.fair_fight);
            // console.log(attackData.modifiers.fair_fight);
            // break;  // Once we find a 'fair_fight', we stop searching 
            //TODO find all fair fights and put them in an array
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData()
    // Set the fetched fair fight multiplier using setFairFightMultiplier(responseData)
    console.log(fairFightsMultiplier);
  }, [userName]);

  useEffect(() => {
    if (attackerStats && fairFightMultiplier) {

      const attackerBattleStatScore =
        Math.sqrt(attackerStats.defense) +
        Math.sqrt(attackerStats.speed) +
        Math.sqrt(attackerStats.dexterity) +
        Math.sqrt(attackerStats.strength);
      if(fairFightMultiplier > 1 && fairFightMultiplier < 3){
        const estimatedDefenderBattleStatScore =
          attackerBattleStatScore * (fairFightMultiplier -1) * (3/8);
          setDefenderBattleStatScore(estimatedDefenderBattleStatScore);
      }else {
        setDefenderBattleStatScore("insufficiant info");
      }

      
    }
  }, [attackerStats, fairFightMultiplier]);

  return (
    <div>
      {/* Display some data if it's loaded */}
      {attackerStats && attackerStats.strength && fairFightMultiplier && defenderBattleStatScore && (
        <div>
          <h1>Battle Stats:</h1>
          {/* Assuming "strength" is one of the properties in the data */}
          <p>Strength: {attackerStats.strength}</p>
          <p>Fair fight: {fairFightMultiplier}</p>
          <p>Defender Battle Stat Score: {defenderBattleStatScore}</p>
        </div>
      )}

      {/* Display fair fights multiplier if it's loaded */}
      {fairFightsMultiplier && (
        <div>
          <h1>Fair Fights Multiplier:</h1>
          {Object.entries(fairFightsMultiplier).map(([defender, multiplier]) => (
            <p key={defender}>{defender}: {multiplier}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BattleStatsComponentMoreData;
