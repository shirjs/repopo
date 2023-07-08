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
    const defenders = Object.keys(data);

    try {
      for (const defender of defenders) {
        let { fairFightMultiplier, battlestatScore } = data[defender];

        if (typeof battlestatScore === 'number') {
          const { data: existingDefender, error } = await supabase
            .from('defender_stats')
            .select()
            .eq('defender', defender)
            .single();

          if (existingDefender) {
            await supabase
              .from('defender_stats')
              .update({
                fairfightmultiplier: fairFightMultiplier,
                battlestatscore: battlestatScore,
              })
              .eq('defender', defender);
          } else {
            await supabase
              .from('defender_stats')
              .insert([
                {
                  defender,
                  fairfightmultiplier: fairFightMultiplier,
                  battlestatscore: battlestatScore,
                  attacker_id: userId,
                },
              ]);
          }
        }
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
