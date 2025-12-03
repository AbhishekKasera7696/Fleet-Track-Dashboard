import React, { useState } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import '../styles/TripDetails.css';

const TripDetails = () => {
  const { events } = useSimulation();
  const [selectedTrip, setSelectedTrip] = useState('trip-1');

  const getTripEvents = (tripId) => {
    return events
      .filter(event => event.tripId === tripId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10); // Show last 10 events
  };

  const getEventIcon = (eventType) => {
    const icons = {
      'LOCATION_UPDATE': '📍',
      'SPEED_UPDATE': '🚗',
      'FUEL_LEVEL_UPDATE': '⛽',
      'HARD_ACCELERATION': '⚡',
      'HARD_BRAKING': '🛑',
      'OVERSPEED_ALERT': '🚨',
      'MAINTENANCE_ALERT': '🔧',
      'WEATHER_ALERT': '🌧️',
      'DEVICE_DISCONNECTED': '📱',
      'TRIP_STARTED': '🚀',
      'TRIP_ENDED': '🏁',
      'TRIP_CANCELLED': '❌'
    };
    
    return icons[eventType] || '📋';
  };

  const tripEvents = getTripEvents(selectedTrip);

  return (
    <div className="trip-details">
      <div className="trip-selector">
        <h3>Trip Details</h3>
        <select 
          value={selectedTrip} 
          onChange={(e) => setSelectedTrip(e.target.value)}
        >
          <option value="trip-1">Cross-Country Long Haul</option>
          <option value="trip-2">Urban Dense Delivery</option>
          <option value="trip-3">Mountain Route Cancelled</option>
          <option value="trip-4">Southern Technical Issues</option>
          <option value="trip-5">Regional Logistics</option>
        </select>
      </div>

      <div className="events-list">
        {tripEvents.length === 0 ? (
          <div className="no-events">No events yet for this trip</div>
        ) : (
          tripEvents.map((event, index) => (
            <div key={index} className={`event-item ${event.event_type.toLowerCase()}`}>
              <div className="event-icon">
                {getEventIcon(event.event_type)}
              </div>
              <div className="event-details">
                <div className="event-type">{event.event_type.replace(/_/g, ' ')}</div>
                <div className="event-time">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
                {event.location && (
                  <div className="event-location">
                    {event.location.latitude.toFixed(4)}, {event.location.longitude.toFixed(4)}
                  </div>
                )}
                {event.speed && (
                  <div className="event-speed">Speed: {Math.round(event.speed)} mph</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TripDetails;