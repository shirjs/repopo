import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import StockApp from './components/StockApp';
import BattleStatsComponentManual from './components/BattleStatsComponentManual';
import BattleStatsComponent from './components/BattleStatsComponent';
import DisplayFairFightData from './components/DisplayFairFightData';

// just an edit to tirgger an update

// Create Supabase client
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

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
