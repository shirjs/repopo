// ApiKeyForm.js
import React from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from './UserContext';

const ApiKeyForm = ({ user }) => {
  const { apiKey, setApiKey } = useUser();
  const [newApiKey, setNewApiKey] = React.useState(apiKey || '');

  const handleSubmit = async event => {
    event.preventDefault();
    
    // insert or update API key in the UserApiKey table
    const { data, error } = await supabase
      .from('UserApiKey')
      .upsert([
        { user_id: user.id, api_key: newApiKey },
      ], { returning: 'minimal' }); // minimal will return only the count of inserted/updated rows

    if (error) {
      console.log("Error saving API Key: ", error.message);
    } else {
      // update API key in the context
      setApiKey(newApiKey);
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
