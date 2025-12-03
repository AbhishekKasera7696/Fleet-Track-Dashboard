import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useSimulation } from '../hooks/useSimulation';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/LiveMap.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LiveMap = () => {
  const { events } = useSimulation();

  const getLastLocation = (tripId) => {
    const tripEvents = events
      .filter(e => e.tripId === tripId && e.location)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return tripEvents[0]?.location;
  };

  const getTripPath = (tripId) => {
    return events
      .filter(e => e.tripId === tripId && e.location)
      .map(event => [event.location.latitude, event.location.longitude]);
  };

  const tripConfigs = {
    'trip-1': { name: 'Cross-Country Long Haul', color: 'blue' },
    'trip-2': { name: 'Urban Dense Delivery', color: 'red' },
    'trip-3': { name: 'Mountain Route Cancelled', color: 'orange' },
    'trip-4': { name: 'Southern Technical Issues', color: 'green' },
    'trip-5': { name: 'Regional Logistics', color: 'purple' }
  };

  return (
    <div className="live-map">
      <h2>Live Vehicle Locations</h2>
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={4} 
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {Object.entries(tripConfigs).map(([tripId, config]) => {
          const location = getLastLocation(tripId);
          const path = getTripPath(tripId);
          
          if (!location) return null;
          
          return (
            <React.Fragment key={tripId}>
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                  <strong>{config.name}</strong><br />
                  Last Update: {new Date().toLocaleTimeString()}<br />
                  Position: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </Popup>
              </Marker>
              
              {path.length > 1 && (
                <Polyline
                  positions={path}
                  color={config.color}
                  weight={4}
                  opacity={0.7}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LiveMap;