import { useUserId } from './useUserId';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const useUserApiKey = () => {
  const userId = useUserId();
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchApiKey = async () => {
        try {
          let { data, error } = await supabase
            .from('UserApiKey')
            .select('api_key')
            .eq('user_id', userId)
            .single();
  
          if (error) {
            console.error('Error fetching API key: ', error);
            return;
          }
          
          if (data) {
            setApiKey(data.api_key);
          }
        } catch (err) {
          console.error('Error: ', err);
        }
      };

      fetchApiKey();
    }
  }, [userId]);

  return apiKey;
}
