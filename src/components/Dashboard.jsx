import React from 'react';
import ControlPanel from './ControlPanel';
import FleetOverview from './FleetOverview';
import TripDetails from './TripDetails';
import LiveMap from './LiveMap';
import AlertsPanel from './AlertsPanel';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <ControlPanel />
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-left">
          <FleetOverview />
          <TripDetails />
        </div>
        
        <div className="dashboard-right">
          <LiveMap />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;