import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { SimulationProvider } from './hooks/useSimulation';
import './styles/App.css';

function App() {
  return (
    <SimulationProvider>
      <div className="App">
        <header className="app-header">
          <h1>Real-Time Fleet Tracking Dashboard</h1>
          <p>Monitoring 5 simultaneous vehicle trips across the United States</p>
        </header>
        <Dashboard />
      </div>
    </SimulationProvider>
  );
}

export default App;