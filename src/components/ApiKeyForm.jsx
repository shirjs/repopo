import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function ApiKeyForm({ user }) {  // accept the user prop
  const [apiKey, setApiKey] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    const { data, error } = await supabase
      .from("UserApiKey")
      .upsert([
        { 
          user_id: user.user.id, 
          api_key: apiKey 
        },
      ]);

    if (error) {
      console.error('Error adding API key: ', error);
    } else {
      console.log('API key added: ', data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Key:
        <input
          type="text"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ApiKeyForm;
