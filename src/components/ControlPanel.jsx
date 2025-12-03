import React from 'react';
import { useSimulation } from '../hooks/useSimulation';
import '../styles/ControlPanel.css';

const ControlPanel = () => {
  const { isPlaying, play, pause, speed, setSpeed, currentTime } = useSimulation();

  return (
    <div className="control-panel">
      <div className="time-display">
        <strong>Simulation Time:</strong> 
        {currentTime ? currentTime.toLocaleString() : 'Loading...'}
      </div>
      
      <div className="controls">
        <button 
          onClick={isPlaying ? pause : play}
          className={`control-btn ${isPlaying ? 'pause' : 'play'}`}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="speed-select"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={5}>5x</option>
          <option value={10}>10x</option>
          <option value={50}>50x</option>
        </select>
        
        <span className="speed-indicator">{speed}x Speed</span>
      </div>
    </div>
  );
};

export default ControlPanel;