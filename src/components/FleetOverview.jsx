import React from 'react';
import { useSimulation } from '../hooks/useSimulation';
import '../styles/FleetOverview.css';

const FleetOverview = () => {
  const { events, tripData } = useSimulation();
  
  const calculateTripProgress = (tripId) => {
    const tripEvents = events.filter(e => e.tripId === tripId);
    if (tripEvents.length === 0) return 0;
    
    const locationUpdates = tripEvents.filter(e => e.event_type === 'LOCATION_UPDATE');
    return Math.min((locationUpdates.length / 100) * 100, 100);
  };

  const getTripStatus = (tripId) => {
    const tripEvents = events.filter(e => e.tripId === tripId);
    const lastEvent = tripEvents[tripEvents.length - 1];
    
    if (!lastEvent) return 'Not Started';
    if (lastEvent.event_type === 'TRIP_ENDED') return 'Completed';
    if (lastEvent.event_type === 'TRIP_CANCELLED') return 'Cancelled';
    return 'In Progress';
  };

  const trips = [
    { id: 'trip-1', name: 'Cross-Country Long Haul', color: '#3b82f6' },
    { id: 'trip-2', name: 'Urban Dense Delivery', color: '#ef4444' },
    { id: 'trip-3', name: 'Mountain Route Cancelled', color: '#f59e0b' },
    { id: 'trip-4', name: 'Southern Technical Issues', color: '#10b981' },
    { id: 'trip-5', name: 'Regional Logistics', color: '#8b5cf6' }
  ];

  return (
    <div className="fleet-overview">
      <h2>Fleet Overview</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Active Trips</h3>
          <div className="metric-value">
            {trips.filter(t => getTripStatus(t.id) === 'In Progress').length}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Completed</h3>
          <div className="metric-value">
            {trips.filter(t => getTripStatus(t.id) === 'Completed').length}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Alerts</h3>
          <div className="metric-value alert">
            {events.filter(e => 
              e.event_type.includes('ALERT') || 
              e.event_type.includes('ISSUE')
            ).length}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Total Distance</h3>
          <div className="metric-value">1,247 mi</div>
        </div>
      </div>

      <div className="trips-progress">
        <h3>Trip Progress</h3>
        {trips.map(trip => {
          const progress = calculateTripProgress(trip.id);
          const status = getTripStatus(trip.id);
          
          return (
            <div key={trip.id} className="trip-progress-item">
              <div className="trip-info">
                <span className="trip-name">{trip.name}</span>
                <span className={`trip-status ${status.toLowerCase().replace(' ', '-')}`}>
                  {status}
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: trip.color
                  }}
                />
              </div>
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FleetOverview;