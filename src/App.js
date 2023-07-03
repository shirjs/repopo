import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import StockApp from './components/StockApp';
import BattleStatsComponentManual from './components/BattleStatsComponentManual';
import BattleStatsComponent from './components/BattleStatsComponent';
import DisplayFairFightData from './components/DisplayFairFightData';

// Create Supabase client
const supabase = createClient("https://soqmgkirxrhuaarmulfi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvcW1na2lyeHJodWFhcm11bGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzNzMzMDUsImV4cCI6MjAwMzk0OTMwNX0.T1Jj5ucgrtZTx2bIZGGGzZwI-o0NGRlyc-cNrXRYub4");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <Router>
      <Routes>
        <Route path="/stock-app" element={<StockApp />} />
        <Route path="/" element={<BattleStatsComponentManual />} />
        <Route path="/automat" element={<BattleStatsComponent />} />
        <Route path="/automatMore" element={<DisplayFairFightData />} />
        {/* More <Route> components go here for other paths */}
      </Routes>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </Router>
  );
}

export default App;
