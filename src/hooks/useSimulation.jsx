import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SimulationContext = createContext();

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

// Mock data for fallback
const generateMockData = () => {
  console.log('📊 Generating mock data for testing...');
  
  const trips = {};
  const tripNames = ['trip-1', 'trip-2', 'trip-3', 'trip-4', 'trip-5'];
  const startTime = new Date(Date.now() - 12 * 60 * 60 * 1000); // 12 hours ago
  
  tripNames.forEach((tripId, index) => {
    const eventCount = [100, 50, 30, 80, 60][index]; // Different counts for each trip
    const events = [];
    
    for (let i = 0; i < eventCount; i++) {
      const eventTime = new Date(startTime.getTime() + i * 15 * 60000);
      
      const event = {
        event_id: `event-${tripId}-${i}`,
        event_type: i === 0 ? 'TRIP_STARTED' : 
                    i === eventCount - 1 ? 'TRIP_ENDED' :
                    Math.random() > 0.3 ? 'LOCATION_UPDATE' : 'SPEED_UPDATE',
        timestamp: eventTime.toISOString(),
        trip_id: tripId,
        vehicle_id: `vehicle-${tripId}`,
        driver_id: `driver-${tripId}`
      };
      
      if (i > 0 && i < eventCount - 1) {
        event.location = {
          latitude: 40 + Math.random() * 10,
          longitude: -100 + Math.random() * 20,
          accuracy: 5 + Math.random() * 5
        };
        event.speed = 30 + Math.random() * 50;
        
        // Add some alerts
        if (Math.random() < 0.1) {
          event.event_type = 'OVERSPEED_ALERT';
          event.speed = 75 + Math.random() * 15;
          event.speed_limit = 65;
        }
        
        if (Math.random() < 0.05 && tripId === 'trip-4') {
          event.event_type = 'DEVICE_DISCONNECTED';
        }
        
        if (Math.random() < 0.05 && tripId === 'trip-3') {
          event.event_type = 'WEATHER_ALERT';
        }
      }
      
      events.push(event);
    }
    
    trips[tripId] = events;
  });
  
  return trips;
};

export const SimulationProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(null);
  const [events, setEvents] = useState([]);
  const [tripData, setTripData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load trip data
  useEffect(() => {
    const loadTripData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading trip data...');
        
        const trips = ['trip-1', 'trip-2', 'trip-3', 'trip-4', 'trip-5'];
        const loadedData = {};
        let filesLoaded = 0;
        
        for (const tripId of trips) {
          try {
            const response = await fetch(`./data/${tripId}.json`);
            
            if (response.ok) {
              const text = await response.text();
              
              if (text.trim().startsWith('[') || text.trim().startsWith('{')) {
                const data = JSON.parse(text);
                loadedData[tripId] = data;
                filesLoaded++;
                console.log(`Loaded ${tripId}.json (${data.length} events)`);
              } else {
                console.warn(`${tripId}.json is not valid JSON`);
                throw new Error('Not valid JSON');
              }
            } else {
              console.warn(`${tripId}.json not found (status: ${response.status})`);
              throw new Error('File not found');
            }
          } catch (err) {
            console.warn(`Using mock data for ${tripId}:`, err.message);
          }
        }
        
        // If no files were loaded, use complete mock data
        if (filesLoaded === 0) {
          console.log('No data files found, using mock data');
          setTripData(generateMockData());
        } else {
          // If some files loaded, fill missing ones with mock data
          trips.forEach(tripId => {
            if (!loadedData[tripId]) {
              console.log(`Generating mock data for ${tripId}`);
              // Create mock data for this trip
              const mockTrips = generateMockData();
              loadedData[tripId] = mockTrips[tripId];
            }
          });
          setTripData(loadedData);
        }
        
        // Setting initial simulation time
        const now = new Date();
        const initialTime = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago
        setCurrentTime(initialTime);
        
        console.log('Data loading complete');
        
      } catch (error) {
        console.error('Error in data loading:', error);
        setError(error.message);
        
        setTripData(generateMockData());
        setCurrentTime(new Date(Date.now() - 6 * 60 * 60 * 1000));
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, []);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const setSimulationSpeed = useCallback((newSpeed) => setSpeed(newSpeed), []);

  // Simulation timer
  useEffect(() => {
    if (!isPlaying || !currentTime || Object.keys(tripData).length === 0) return;

    const interval = setInterval(() => {
      setCurrentTime(prevTime => {
        const newTime = new Date(prevTime.getTime() + (1000 * speed));
        
        // Finding events that should be active at this time
        const newActiveEvents = [];
        Object.entries(tripData).forEach(([tripId, tripEvents]) => {
          tripEvents.forEach(event => {
            const eventTime = new Date(event.timestamp);
            if (eventTime <= newTime && eventTime > prevTime) {
              newActiveEvents.push({ ...event, tripId });
            }
          });
        });

        if (newActiveEvents.length > 0) {
          setEvents(prev => [...prev.slice(-100), ...newActiveEvents]);
        }

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speed, currentTime, tripData]);

  const value = {
    isPlaying,
    currentTime,
    speed,
    events,
    tripData,
    loading,
    error,
    play,
    pause,
    setSpeed: setSimulationSpeed,
    setCurrentTime
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};