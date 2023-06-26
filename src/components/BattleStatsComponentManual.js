import React, { useState } from 'react';

const BattleStatsComponentManual = () => {
  const [attackerStats, setAttackerStats] = useState({
    defense: '',
    speed: '',
    dexterity:'' ,
    strength: '',
  });

  const [fairFightMultiplier, setFairFightMultiplier] = useState(0);
  const [defenderBattleStatScore, setDefenderBattleStatScore] = useState(0);
  const [attackerBattleStatScore, setattackerBattleStatScore] = useState(0);


  const calculateDefenderBattleStatScore = () => {
    const estimatedAttackerBattleStatScore =
      Math.sqrt(attackerStats.defense) +
      Math.sqrt(attackerStats.speed) +
      Math.sqrt(attackerStats.dexterity) +
      Math.sqrt(attackerStats.strength);

      setattackerBattleStatScore(estimatedAttackerBattleStatScore);

    const estimatedDefenderBattleStatScore =
      estimatedAttackerBattleStatScore * (fairFightMultiplier -1) * (3/8);

    setDefenderBattleStatScore(estimatedDefenderBattleStatScore);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name.startsWith('attacker')) {
      const statName = name.substring(8); // Remove 'attacker' prefix from name
      setAttackerStats((prevStats) => ({
        ...prevStats,
        [statName]: parseInt(value, 10),
      }));
    } else if (name === 'fairFightMultiplier') {
      setFairFightMultiplier(parseFloat(value));
    }
  };
  
  

  return (
    <div>
      <h2>Battle Stats Component</h2>
      <div>
  <label>
    Attacker Defense:
    <input
      type="number"
      name="attackerdefense"
      value={attackerStats.defense}
      onChange={handleInputChange}
    />
  </label>
</div>
<div>
  <label>
    Attacker Speed:
    <input
      type="number"
      name="attackerspeed"
      value={attackerStats.speed}
      onChange={handleInputChange}
    />
  </label>
</div>
<div>
  <label>
    Attacker Dexterity:
    <input
      type="number"
      name="attackerdexterity"
      value={attackerStats.dexterity}
      onChange={handleInputChange}
    />
  </label>
</div>
<div>
  <label>
    Attacker Strength:
    <input
      type="number"
      name="attackerstrength"
      value={attackerStats.strength}
      onChange={handleInputChange}
    />
  </label>
</div>

      <div>
        <label>
          Fair Fight Multiplier:
          <input
            type="number"
            step="0.01"
            name="fairFightMultiplier"
            value={fairFightMultiplier || ''}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={calculateDefenderBattleStatScore}>Calculate</button>
      <p>Estimated Defender's Battle Stat Score: {defenderBattleStatScore}</p>
      <p>Estimated Attacker's Battle Stat Score: {attackerBattleStatScore}</p>
    </div>
  );
};

export default BattleStatsComponentManual;
