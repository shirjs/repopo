import React, { useEffect } from 'react';
import { useUser } from './UserContext';

function Testing() {
  const { user } = useUser();

  useEffect(() => {
    if (user && user.user) {
      console.log(user.user.id); // you can check the structure of the user object in the console
    }
  }, [user]);
  

  return (
    <div>
      {user ? <h1>User ID: {user.id}</h1> : <h1>No user signed in</h1>}
    </div>
  );
}

export default Testing;
