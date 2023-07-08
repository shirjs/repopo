// ApiKeyForm.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useUserId } from '../hooks/useUserId';

const ApiKeyForm = () => {
  const userId = useUserId();
  const [newApiKey, setNewApiKey] = useState(''); // Maintain the apiKey inside the component state.
  
  useEffect(() => {
    // Fetch the existing API key when the userId changes
    const fetchApiKey = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from('UserApiKey')
          .select('api_key')
          .eq('user_id', userId)
          .single();

        if (error) {
          console.error('Error fetching API key:', error.message);
        } else {
          setNewApiKey(data?.api_key || '');
        }
      }
    };

    fetchApiKey();
  }, [userId]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (userId === null) {
      console.log("User is not authenticated.");
      return;
    }

    // Try to update the existing row first
    let { count, error } = await supabase
      .from('UserApiKey')
      .update({ api_key: newApiKey })
      .eq('user_id', userId);

    // If no rows were updated (i.e., the row does not exist), then insert a new one
    if (count === 0) {
      const { error } = await supabase
        .from('UserApiKey')
        .insert([
          { user_id: userId, api_key: newApiKey },
        ]);

      if (error) {
        console.log("Error inserting API Key: ", error.message);
      }
    } else if (error) {
      console.log("Error updating API Key: ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Key:
        <input type="text" value={newApiKey} onChange={(e) => setNewApiKey(e.target.value)} />
      </label>
      <input type="submit" value="Save API Key" />
    </form>
  );
};

export default ApiKeyForm;
