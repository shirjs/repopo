import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockApp from './components/StockApp';
import BattleStatsComponentManual from './components/BattleStatsComponentManual';
import DisplayFairFightData from './components/DisplayFairFightData';
import DashboardUnsigned from './components/DashboardUnsigned';
import { UserProvider } from './components/UserContext';
import Testing from './components/Testing';
import GroupPage from './components/GroupPage';
import RequestToJoinGroup from './components/RequestToJoinGroup';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/stock-app" element={<StockApp />} />
          <Route path="/aa" element={<BattleStatsComponentManual />} />
          <Route path="/automatMore" element={<DisplayFairFightData />} />
          <Route path="/" element={<DashboardUnsigned />} />
          <Route path="/Testing" element={<Testing />} />
          <Route path="/Group" element={<GroupPage />} />
          <Route path="/request-to-join-group" element={<RequestToJoinGroup />} />
          {/* More <Route> components go here for other paths */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
