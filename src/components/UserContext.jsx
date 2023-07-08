import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../supabaseClient';

// create a context
export const UserContext = createContext();

// create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionUser = supabase.auth.getUser();
    setUser(sessionUser);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, sessionUser) => {
        setUser(sessionUser);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// use this hook in your components to access user state
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
