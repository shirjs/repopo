import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockApp from './components/StockApp';
import BattleStatsComponentManual from './components/BattleStatsComponentManual';
import BattleStatsComponent from './components/BattleStatsComponent';
import DisplayFairFightData from './components/DisplayFairFightData';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stock-app" element={<StockApp />} />
        <Route path="/" element={<BattleStatsComponentManual />} />
        <Route path="/automat" element={<BattleStatsComponent />} />
        <Route path="/automatMore" element={<DisplayFairFightData />} />
        {/* More <Route> components go here for other paths */}
      </Routes>
    </Router>
  );
}

export default App;
