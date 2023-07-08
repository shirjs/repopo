// ApiKeyForm.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useUserId } from '../hooks/useUserId';

const ApiKeyForm = () => {
  const [apiKey, setApiKey] = useState('');
  const userId = useUserId();
  
  useEffect(() => {
    fetchApiKey();
  }, [userId]);

  const fetchApiKey = async () => {
    if (userId) {
      const { data } = await supabase
        .from('UserApiKey')
        .select('api_key')
        .eq('user_id', userId)
        .single();
          
      if (data) {
        setApiKey(data.api_key);
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!userId) {
      console.log("User is not authenticated.");
      return;
    }

    const { data, error } = await supabase
      .from('UserApiKey')
      .upsert([
        { user_id: userId, api_key: apiKey },
      ], { returning: 'minimal' }); // 'minimal' will not return any data after insert/update

    if (error) {
      console.log("Error updating/inserting API Key: ", error.message);
    } else if (data) {
      setApiKey(data.api_key);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Key:
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </label>
      <input type="submit" value="Save API Key" />
    </form>
  );
};

export default ApiKeyForm;
