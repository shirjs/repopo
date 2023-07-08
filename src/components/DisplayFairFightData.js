import React, { useState, useEffect } from 'react';
import useFetchFairFightData from '../hooks/useFetchFairFightData';
import { supabase } from '../supabaseClient';
import { useUserId } from '../hooks/useUserId';

const DisplayFairFightData = () => {
  const [isKeySubmitted, setIsKeySubmitted] = useState(false);
  const userId = useUserId();

  const submitApiKey = event => {
    event.preventDefault();
    setIsKeySubmitted(true);
  };

  const fairFightsData = useFetchFairFightData(isKeySubmitted);

  const storeDataInDatabase = async (data) => {
    let { data: existingDefendersData, error } = await supabase
      .from('defender_stats')
      .select('*');

    if (error) {
      console.error('Error fetching defender data:', error);
      return;
    }

    // Create an object for quick access to existing defender data
    const existingDefenders = existingDefendersData.reduce((obj, item) => {
      obj[item.defender] = item;
      return obj;
    }, {});

    // Split new data into data to update and data to insert
    const dataToUpdate = [];
    const dataToInsert = [];

    Object.keys(data).forEach(defender => {
      let { fairFightMultiplier, battlestatScore } = data[defender];

      if (typeof battlestatScore === 'number') {
        if (existingDefenders[defender]) {
          dataToUpdate.push({
            ...existingDefenders[defender],
            fairfightmultiplier: fairFightMultiplier,
            battlestatscore: battlestatScore,
          });
        } else {
          dataToInsert.push({
            defender,
            fairfightmultiplier: fairFightMultiplier,
            battlestatscore: battlestatScore,
            attacker_id: userId,
          });
        }
      }
    });

    // Now update and insert data with a single request for each operation
    try {
      if (dataToUpdate.length > 0) {
        await supabase.from('defender_stats').upsert(dataToUpdate, { returning: 'minimal' });
      }

      if (dataToInsert.length > 0) {
        await supabase.from('defender_stats').insert(dataToInsert, { returning: 'minimal' });
      }
    } catch (error) {
      console.error('Error inserting/updating data:', error);
    }
  };

  useEffect(() => {
    if (isKeySubmitted && Object.keys(fairFightsData).length > 0) {
      storeDataInDatabase(fairFightsData);
    }
  }, [fairFightsData, isKeySubmitted]);

  return (
    <div>
      <button onClick={submitApiKey}>Fetch Data</button>

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
