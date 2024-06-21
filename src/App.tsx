import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; // Example dashboard component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/callback" element={<Auth />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
