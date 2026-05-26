"use client";

import { ShieldAlert, Megaphone, DoorOpen, Flame } from "lucide-react";

export default function EmergencyPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 style={{ color: 'var(--status-danger)' }}>CRITICAL // EMERGENCY MANAGEMENT</h1>
        <p className="page-subtitle">Stadium-wide evacuation and hazard control system.</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel main-map">
          <h2 className="panel-title">Evacuation Routing Map</h2>
          <div className="evacuation-map">
            {/* Simple CSS diagram of stadium evacuation routes */}
            <div className="stadium-outline">
               <div className="pitch-outline"></div>
               {/* Arrows indicating exit paths */}
               <div className="exit-arrow north">↑ EXIT N</div>
               <div className="exit-arrow south">↓ EXIT S</div>
               <div className="exit-arrow east">→ EXIT E</div>
               <div className="exit-arrow west">← EXIT W</div>
               
               {/* Hazard Zone */}
               <div className="hazard-zone">
                  <Flame color="#fff" size={24} />
                  <span>FIRE DETECTED</span>
               </div>
            </div>
          </div>
        </div>

        <div className="side-panels">
          <div className="glass-panel" style={{ borderColor: 'var(--status-danger)' }}>
            <h2 className="panel-title" style={{ color: 'var(--status-danger)' }}>Active Threats</h2>
            <div className="alerts-list">
              <div className="alert-item critical">
                <ShieldAlert size={18} />
                <div>
                  <strong>FIRE WARNING - SECTOR B</strong>
                  Smoke detected in South Concourse food court. Evacuation protocol initiated.
                </div>
              </div>
              <div className="alert-item warning">
                <ShieldAlert size={18} />
                <div>
                  <strong>CROWD CRUSH RISK - GATE 4</strong>
                  Density exceeding 90%. Security teams dispatched.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <h2 className="panel-title">System Overrides</h2>
            <div className="action-grid">
              <button className="action-btn danger">
                <Megaphone size={20} />
                <span>SOUND ALARMS</span>
              </button>
              <button className="action-btn warning">
                <DoorOpen size={20} />
                <span>OPEN ALL GATES</span>
              </button>
              <button className="action-btn normal">
                <ShieldAlert size={20} />
                <span>DISPATCH EMS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          padding: 2rem;
          height: 100vh;
          overflow-y: auto;
          background: radial-gradient(circle at top right, rgba(255,51,102,0.1) 0%, #05050a 70%);
        }
        .page-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255,51,102,0.3);
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
        .evacuation-map {
          width: 100%;
          height: 90%;
          background: rgba(0,0,0,0.5);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .stadium-outline {
          width: 60%;
          height: 80%;
          border: 4px solid var(--panel-border);
          border-radius: 50%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pitch-outline {
          width: 40%;
          height: 60%;
          border: 2px solid rgba(0, 255, 136, 0.3);
          border-radius: 10px;
        }
        .exit-arrow {
          position: absolute;
          color: var(--status-normal);
          font-weight: bold;
          font-family: 'Orbitron', sans-serif;
          animation: blink 1s infinite;
        }
        .north { top: -30px; left: 50%; transform: translateX(-50%); }
        .south { bottom: -30px; left: 50%; transform: translateX(-50%); }
        .east { right: -60px; top: 50%; transform: translateY(-50%); }
        .west { left: -60px; top: 50%; transform: translateY(-50%); }
        
        .hazard-zone {
          position: absolute;
          bottom: 20%;
          right: 20%;
          background: rgba(255,51,102,0.8);
          padding: 10px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 0 20px rgba(255,51,102,0.6);
          animation: pulse 1s infinite;
        }
        .hazard-zone span {
          font-size: 0.5rem;
          font-weight: bold;
          margin-top: 5px;
        }

        .action-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .action-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--panel-border);
          color: #fff;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-family: 'Orbitron', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .action-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        .action-btn.danger {
          border-color: var(--status-danger);
          color: var(--status-danger);
        }
        .action-btn.danger:hover {
          background: rgba(255,51,102,0.2);
        }
        .action-btn.warning {
          border-color: var(--status-medium);
          color: var(--status-medium);
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
