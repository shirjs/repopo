import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import StockApp from './components/StockApp';
import BattleStatsComponentManual from './components/BattleStatsComponentManual';
import DisplayFairFightData from './components/DisplayFairFightData';
import DashboardUnsigned from './components/DashboardUnsigned';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stock-app" element={<StockApp />} />
        <Route path="/aa" element={<BattleStatsComponentManual />} />
        <Route path="/automatMore" element={<DisplayFairFightData />} />
        <Route path="/" element={<DashboardUnsigned />} />
        {/* More <Route> components go here for other paths */}
      </Routes>

    </Router>
  );
}

export default App;
