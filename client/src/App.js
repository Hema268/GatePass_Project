// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import GatePassList from './components/GatePassList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard/>} />
        <Route path="/gatepass-list" element={<GatePassList />} /> {/* New route for GatePassList */}
      </Routes>
    </Router>
    
  );
}

export default App;
