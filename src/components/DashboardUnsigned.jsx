import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';

export default function DashboardUnsigned() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      else alert("You're signed in");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else alert("You're signed out");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
    <div><p>Welcome, {user.email}!</p>
    <button onClick={handleSignOut} disabled={loading}>
          Sign Out
        </button>
    
    </div>
    );
  }
  
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>
        <button onClick={handleSignIn} disabled={loading}>
          Sign In
        </button>
      </form>
    </div>
  );
}
