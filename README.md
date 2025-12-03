 Real-Time Fleet Tracking Dashboard
📋 Overview
A comprehensive real-time fleet tracking dashboard that visualizes vehicle movements, metrics, and operational insights across 5 simultaneous trips. Built with React, Leaflet maps, and real-time simulation capabilities.

https://img.shields.io/badge/Status-Deployed-success
https://img.shields.io/badge/React-18.2-blue
https://img.shields.io/badge/Vite-5.0-purple
https://img.shields.io/badge/License-MIT-green

🌐 Live Demo
🔗 Live Application: [https://fleet-track-dashboard.vercel.app/]

🎯 Features
📊 Real-Time Simulation
Live Event Processing: Simulates real-time fleet tracking using timestamped events

Playback Controls: Play, pause, and speed controls (0.5x to 50x)

Time-based Processing: Events processed chronologically as if happening "now"

🗺️ Interactive Map Visualization
Live Vehicle Locations: Real-time markers for all 5 vehicles

Route Tracing: Visual path of completed routes

Map Controls: Zoom, pan, and marker interactions

Trip Differentiation: Color-coded markers for each trip

📈 Comprehensive Metrics Dashboard
Fleet Overview:

Active trips count

Completed trips

Alert notifications

Total distance covered

Trip Progress Tracking:

Individual progress bars for each trip

Status indicators (Not Started, In Progress, Completed, Cancelled)

Real-time percentage updates

⚡ Advanced Features
Real-time Alerts Panel: Categorized alerts (High/Medium/Low priority)

Trip Details Viewer: Event-by-event breakdown for each trip

Responsive Design: Works seamlessly on desktop, tablet, and mobile

Performance Optimized: Efficiently handles 10,000+ events

##  Architecture
Tech Stack
Frontend Framework: React 18 with Hooks

Build Tool: Vite 5.0

Mapping: Leaflet + React-Leaflet

Charts: Chart.js + React-Chartjs-2

Styling: CSS Modules + Responsive Design

Deployment: Vercel (Static Hosting)


##Project Structure
fleet-tracking-dashboard/
├── public/
│   ├── data/                    # JSON data files (5 trips)
│   │   ├── trip-1.json         # Cross-Country Long Haul
│   │   ├── trip-2.json         # Urban Dense Delivery
│   │   ├── trip-3.json         # Mountain Route Cancelled
│   │   ├── trip-4.json         # Southern Technical Issues
│   │   └── trip-5.json         # Regional Logistics
│   └── index.html              # Main HTML entry point
├── src/
│   ├── components/             # React components
│   │   ├── Dashboard.jsx      # Main dashboard layout
│   │   ├── ControlPanel.jsx   # Simulation controls
│   │   ├── FleetOverview.jsx  # Fleet metrics
│   │   ├── LiveMap.jsx        # Interactive map
│   │   ├── TripDetails.jsx    # Trip-specific events
│   │   └── AlertsPanel.jsx    # Alert notifications
│   ├── hooks/
│   │   └── useSimulation.jsx  # Real-time simulation logic
│   ├── styles/                # CSS stylesheets
│   └── App.jsx                # Root component
├── package.json               # Dependencies and scripts
├── vite.config.js             # Build configuration
└── README.md                  # This file



##Start development server
npm run dev

🎮 How to Use the Dashboard
Starting the Simulation
Click the ▶️ Play button in the Control Panel

Watch the simulation time start updating

Observe trips changing from "Not Started" to "In Progress"

Controlling Simulation Speed
Use the dropdown to select simulation speed (0.5x to 50x)

Higher speeds process events faster for quick overviews

Lower speeds allow detailed observation

Viewing Trip Details
Select a trip from the dropdown in Trip Details section

View real-time events for that specific trip

See location coordinates, speed, and event types

Monitoring Alerts
High Priority (🔴): Device disconnections, emergency stops

Medium Priority (🟡): Overspeed alerts, maintenance warnings

Low Priority (🔵): Fuel updates, routine notifications


Using the Map
Zoom: Mouse wheel or +/- buttons

Pan: Click and drag

Marker Info: Click markers for trip details

Route Lines: Colored paths show completed routes


📊 Metrics Display
Real-time Metrics
Active Trips: Count of trips currently in progress

Completed Trips: Trips that have reached destination

Total Alerts: All alerts generated during simulation

Distance Covered: Approximate total miles traveled

Trip-specific Metrics
Progress Percentage: Based on location events

Current Status: Not Started, In Progress, Completed, Cancelled

Event Count: Number of events processed

Last Update: Most recent event timestamp
















