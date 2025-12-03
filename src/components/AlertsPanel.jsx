import React from 'react';
import { useSimulation } from '../hooks/useSimulation';
import '../styles/AlertsPanel.css';

const AlertsPanel = () => {
  const { events } = useSimulation();

  const alertEvents = events.filter(event => 
    event.event_type.includes('ALERT') || 
    event.event_type.includes('ISSUE') ||
    event.event_type === 'DEVICE_DISCONNECTED' ||
    event.event_type === 'HARD_ACCELERATION' ||
    event.event_type === 'HARD_BRAKING' ||
    event.event_type === 'OVERSPEED_ALERT'
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
   .slice(0, 5); // Show last 5 alerts

  const getAlertLevel = (eventType) => {
    if (eventType === 'EMERGENCY_STOP' || eventType === 'DEVICE_DISCONNECTED') {
      return 'high';
    }
    if (eventType.includes('ALERT') || eventType === 'OVERSPEED_ALERT') {
      return 'medium';
    }
    return 'low';
  };

  const getAlertIcon = (eventType) => {
    switch (getAlertLevel(eventType)) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className="alerts-panel">
      <h3>Recent Alerts</h3>
      
      {alertEvents.length === 0 ? (
        <div className="no-alerts">No alerts at this time</div>
      ) : (
        <div className="alerts-list">
          {alertEvents.map((alert, index) => (
            <div key={index} className={`alert-item ${getAlertLevel(alert.event_type)}`}>
              <div className="alert-icon">
                {getAlertIcon(alert.event_type)}
              </div>
              <div className="alert-content">
                <div className="alert-title">
                  {alert.event_type.replace(/_/g, ' ')}
                </div>
                <div className="alert-trip">Trip: {alert.tripId}</div>
                <div className="alert-time">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
                {alert.speed && (
                  <div className="alert-detail">Speed: {Math.round(alert.speed)} mph</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;