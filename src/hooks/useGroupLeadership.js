// hooks/useGroupLeadership.js

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useUserId } from './useUserId';

const useGroupLeadership = () => {
  const userId = useUserId();
  const [groupName, setGroupName] = useState(null);

  useEffect(() => {
    fetchGroupLeadership();
  }, [userId]);

  const fetchGroupLeadership = async () => {
    if (userId) {
      const { data, error } = await supabase
        .from('user_group')
        .select('group_name')
        .eq('leader_id', userId);

      if (error) {
        console.log('Error fetching group leadership: ', error);
      } else if (data.length > 0) {
        setGroupName(data[0].group_name);
      } else {
        setGroupName(null);
      }
    }
  };

  return groupName;
};

export default useGroupLeadership;
