const fs = require('fs');
const path = require('path');

console.log('íº€ Starting data generation...');
console.log('Current directory:', __dirname);

// Create public/data directory
const dataDir = path.join(__dirname, 'public', 'data');
console.log('Creating directory:', dataDir);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('âœ… Created directory:', dataDir);
} else {
  console.log('í³ Directory already exists:', dataDir);
}

// Create 5 trip files with sample data
const trips = [
  { id: 'trip-1', name: 'Cross-Country Long Haul', eventCount: 100 },
  { id: 'trip-2', name: 'Urban Dense Delivery', eventCount: 50 },
  { id: 'trip-3', name: 'Mountain Route Cancelled', eventCount: 30 },
  { id: 'trip-4', name: 'Southern Technical Issues', eventCount: 80 },
  { id: 'trip-5', name: 'Regional Logistics', eventCount: 60 }
];

console.log('\ní³ Generating trip data...');

trips.forEach(trip => {
  const events = [];
  const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
  
  for (let i = 0; i < trip.eventCount; i++) {
    const eventTime = new Date(startTime.getTime() + i * 15 * 60000); // Every 15 minutes
    
    // Create event
    const event = {
      event_id: `event-${trip.id}-${i}`,
      event_type: i === 0 ? 'TRIP_STARTED' : 
                  i === trip.eventCount - 1 ? 'TRIP_ENDED' :
                  Math.random() > 0.3 ? 'LOCATION_UPDATE' : 'SPEED_UPDATE',
      timestamp: eventTime.toISOString(),
      trip_id: trip.id,
      vehicle_id: `vehicle-${trip.id}`,
      driver_id: `driver-${trip.id}`
    };
    
    // Add location and speed for non-start/end events
    if (i > 0 && i < trip.eventCount - 1) {
      event.location = {
        latitude: 40 + Math.random() * 10,
        longitude: -100 + Math.random() * 20,
        accuracy: 5 + Math.random() * 5
      };
      event.speed = 30 + Math.random() * 50;
      
      // Add some special events
      if (Math.random() < 0.1) {
        event.event_type = 'OVERSPEED_ALERT';
        event.speed = 75 + Math.random() * 15;
        event.speed_limit = 65;
      }
      
      if (Math.random() < 0.05) {
        event.event_type = 'FUEL_LEVEL_UPDATE';
        event.fuel_level = Math.random() * 100;
      }
    }
    
    events.push(event);
  }
  
  const filePath = path.join(dataDir, `${trip.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
  console.log(`âœ… Created ${trip.id}.json with ${events.length} events`);
  
  // Verify file was created
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`   File size: ${(stats.size / 1024).toFixed(2)} KB`);
  }
});

console.log('\ní¾‰ Data generation complete!');
console.log(`í³ Files saved in: ${dataDir}`);

// List created files
console.log('\ní³‹ Created files:');
const files = fs.readdirSync(dataDir);
files.forEach(file => {
  const filePath = path.join(dataDir, file);
  const stats = fs.statSync(filePath);
  console.log(`  - ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
});
