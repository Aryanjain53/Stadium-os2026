"use client";

import { Car, Navigation, MapPin } from "lucide-react";

export default function ParkingPage() {
  const parkingZones = [
    { id: 'P1', name: 'VIP North', total: 500, filled: 480 },
    { id: 'P2', name: 'General South', total: 2000, filled: 1850 },
    { id: 'P3', name: 'East Overflow', total: 1000, filled: 400 },
    { id: 'P4', name: 'Staff West', total: 200, filled: 190 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>SMART PARKING // VEHICLE TRACKING</h1>
        <p className="page-subtitle">Real-time parking slot availability and traffic congestion tracking.</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel parking-map-container">
          <h2 className="panel-title">Parking Grid Heatmap</h2>
          <div className="parking-grid">
            {/* Simulate a grid of parking spots for P2 (General South) */}
            {Array.from({ length: 150 }).map((_, i) => {
              // 90% chance a spot is taken
              const isTaken = Math.random() < 0.9;
              return (
                <div 
                  key={i} 
                  className={`parking-spot ${isTaken ? 'taken' : 'free'}`}
                  title={isTaken ? 'Occupied' : 'Available'}
                ></div>
              );
            })}
          </div>
          <div className="legend">
             <div className="legend-item"><div className="spot-demo free"></div> Available (Green)</div>
             <div className="legend-item"><div className="spot-demo taken"></div> Occupied (Red)</div>
          </div>
        </div>

        <div className="side-panels">
          <div className="glass-panel">
            <h2 className="panel-title">Zone Capacity</h2>
            <div className="zone-list">
              {parkingZones.map((zone) => {
                const percent = (zone.filled / zone.total) * 100;
                let statusClass = "normal";
                if (percent > 85) statusClass = "medium";
                if (percent > 95) statusClass = "overloaded";
                
                return (
                  <div key={zone.id} className="stat-card">
                    <div>
                      <div className="stat-name">{zone.name} ({zone.id})</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {zone.total - zone.filled} slots available
                      </div>
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ 
                            width: `${percent}%`,
                            backgroundColor: `var(--status-${statusClass === 'overloaded' ? 'danger' : statusClass})`
                          }}
                        />
                      </div>
                    </div>
                    <span className="data-number">{Math.round(percent)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel" style={{ flexGrow: 1 }}>
            <h2 className="panel-title"><Navigation size={16} style={{display:'inline', marginRight:'8px'}}/> Auto-Routing Status</h2>
            <div className="routing-status">
              <div className="status-message">
                <MapPin size={24} color="var(--status-medium)" />
                <p><strong>P1 and P2 nearing capacity.</strong><br/>Digital signboards updated to redirect incoming traffic to P3 (East Overflow).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          padding: 2rem;
          height: 100vh;
          overflow-y: auto;
          background: radial-gradient(circle at bottom left, rgba(0,240,255,0.05) 0%, #05050a 70%);
        }
        .page-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--panel-border);
          padding-bottom: 1rem;
        }
        .page-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          height: calc(100vh - 150px);
        }
        .side-panels {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .parking-map-container {
          display: flex;
          flex-direction: column;
        }
        .parking-grid {
          display: grid;
          grid-template-columns: repeat(15, 1fr);
          gap: 4px;
          flex-grow: 1;
          margin-top: 1rem;
          background: rgba(0,0,0,0.5);
          padding: 1rem;
          border-radius: 8px;
        }
        .parking-spot {
          border-radius: 2px;
          transition: all 0.5s ease;
        }
        .parking-spot.taken {
          background: rgba(255,51,102,0.6);
          border: 1px solid rgba(255,51,102,0.8);
        }
        .parking-spot.free {
          background: rgba(0,255,136,0.6);
          border: 1px solid rgba(0,255,136,0.8);
          box-shadow: 0 0 10px rgba(0,255,136,0.4);
        }
        .legend {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .spot-demo {
          width: 15px; height: 15px; border-radius: 2px;
        }
        .routing-status {
          background: rgba(255,215,0,0.1);
          border-left: 3px solid var(--status-medium);
          padding: 1rem;
          border-radius: 8px;
          height: 100%;
        }
        .status-message {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
