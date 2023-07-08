import { useUser } from '../components/UserContext';
import { useState, useEffect } from 'react';

export const useUserId = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user && user.user) {
      setUserId(user.user.id);
    }
  }, [user]);

  return userId;
}
