"use client";

import { useState } from "react";
import { Activity, Users, AlertTriangle, ShieldAlert, Navigation, Crosshair, Cpu, Camera, CloudRain, Flame, Wifi } from "lucide-react";

export default function DashboardUI({ stadiumState }) {
  const [dispatchedAlerts, setDispatchedAlerts] = useState({});
  const [showHardware, setShowHardware] = useState(false);

  if (!stadiumState) return null;

  const handleDispatchSecurity = (zoneId, alertIdx) => {
    let team = stadiumState.securityTeams?.find(t => t.zone === zoneId && t.status === 'Available');
    if (!team) team = stadiumState.securityTeams?.find(t => t.status === 'Available');
    
    if (team) {
      setDispatchedAlerts(prev => ({ ...prev, [alertIdx]: `Dispatched: ${team.name} (from Zone ${team.zone})` }));
    } else {
      setDispatchedAlerts(prev => ({ ...prev, [alertIdx]: 'No security teams available!' }));
    }
  };

  const handleDispatchGateSecurity = (gateId) => {
    let team = stadiumState.securityTeams?.find(t => t.status === 'Available');
    if (team) {
      setDispatchedAlerts(prev => ({ ...prev, [`gate_${gateId}`]: `Dispatched: ${team.name}` }));
    } else {
      setDispatchedAlerts(prev => ({ ...prev, [`gate_${gateId}`]: 'No security available!' }));
    }
  };

  return (
    <div className="ui-layer">
      {/* Header */}
      <div className="header">
        <div className="header-title">
          <h1>STADIUM OS // DIGITAL TWIN</h1>
        </div>
        <div className="header-meta">
          <div className="meta-item">
            <span className="meta-label">Total Attendance</span>
            <span className="meta-value data-number">{stadiumState.totalPeople?.toLocaleString() || '0'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">System Status</span>
            <span className="meta-value" style={{ color: stadiumState.alerts.length > 0 ? 'var(--status-danger)' : 'var(--status-normal)' }}>
              {stadiumState.alerts.length > 0 ? 'ALERT' : 'ACTIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* Left Sidebar - Gates & Crowd Zones */}
      <div className="left-sidebar">
        <div className="glass-panel">
          <h2 className="panel-title"><Navigation size={16} style={{display:'inline', marginRight:'8px'}}/> Gate Traffic Analysis</h2>
          <div className="gate-list">
            {stadiumState.gates?.map((gate) => (
              <div key={gate.id} className="stat-card">
                <div>
                  <div className="stat-name">{gate.name}</div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${gate.flowRate}%`,
                        backgroundColor: gate.status === 'Normal' ? 'var(--status-normal)' : gate.status === 'Medium' ? 'var(--status-medium)' : 'var(--status-danger)'
                      }}
                    />
                  </div>
                </div>
                <div className={`badge ${gate.status.toLowerCase()}`}>
                  {gate.status}
                </div>
                {gate.status === 'Overloaded' && (
                  <div style={{ marginTop: '8px', textAlign: 'right', width: '100%' }}>
                    {dispatchedAlerts[`gate_${gate.id}`] ? (
                      <span style={{ fontSize: '12px', color: '#00ff88', fontWeight: 'bold' }}>{dispatchedAlerts[`gate_${gate.id}`]}</span>
                    ) : (
                      <button 
                        className="security-btn"
                        onClick={() => handleDispatchGateSecurity(gate.id)}
                        style={{
                          background: 'var(--status-danger)', border: 'none', color: '#fff', 
                          padding: '4px 8px', borderRadius: '4px', cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 'bold'
                        }}
                      >
                        <Crosshair size={10} /> Call Security
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel">
          <h2 className="panel-title"><Users size={16} style={{display:'inline', marginRight:'8px'}}/> Zone Density Map</h2>
          <div className="zone-list">
            {stadiumState.zones?.map((zone) => (
              <div key={zone.id} className="stat-card">
                <span className="stat-name">{zone.name} (Zone {zone.id})</span>
                <span className="data-number" style={{
                  color: zone.density < 60 ? 'var(--status-normal)' : zone.density < 85 ? 'var(--status-medium)' : 'var(--status-danger)'
                }}>
                  {zone.density}%
                </span>
              </div>
            ))}
          </div>
          <div className="heatmap-indicator">
            <span>Safe</span>
            <span>Overloaded</span>
          </div>
          <div className="heatmap-gradient" />
          <button 
            onClick={() => setShowHardware(true)}
            style={{
              width: '100%', padding: '10px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--accent-cyan)',
              color: 'var(--accent-cyan)', borderRadius: '6px', marginTop: '1rem', cursor: 'pointer', fontFamily: 'Orbitron',
              fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <Cpu size={16} /> VIEW HARDWARE TOPOLOGY
          </button>
        </div>
      </div>

      {/* Right Sidebar - AI Predictions & Alerts */}
      <div className="right-sidebar">
        <div className="glass-panel" style={{ flexGrow: 1 }}>
          <h2 className="panel-title"><Activity size={16} style={{display:'inline', marginRight:'8px'}}/> AI Predictive Alerts</h2>
          <div className="alerts-list">
            {stadiumState.alerts?.length === 0 ? (
              <div className="alert-item info" style={{ color: 'var(--text-muted)' }}>
                No active alerts. Crowd flow is optimal.
              </div>
            ) : (
              stadiumState.alerts?.map((alert, idx) => (
                <div key={idx} className={`alert-item ${alert.type.toLowerCase()}`}>
                  <div className="alert-icon">
                    {alert.type === 'CRITICAL' ? <ShieldAlert size={18} color="var(--status-danger)"/> : <AlertTriangle size={18} />}
                  </div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>{alert.type}</strong>
                    {alert.message}
                    {alert.type === 'CRITICAL' && (
                      <div style={{ marginTop: '8px' }}>
                        {dispatchedAlerts[idx] ? (
                          <span style={{ fontSize: '12px', color: '#00ff88', fontWeight: 'bold' }}>{dispatchedAlerts[idx]}</span>
                        ) : (
                          <button 
                            className="security-btn"
                            onClick={() => handleDispatchSecurity(alert.zoneId, idx)}
                            style={{
                              background: 'var(--status-danger)', border: 'none', color: '#fff', 
                              padding: '4px 8px', borderRadius: '4px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 'bold'
                            }}
                          >
                            <Crosshair size={12} /> Locate Nearest Security
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hardware Modal Overlay */}
      {showHardware && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'auto'
        }}>
          <div className="glass-panel" style={{ width: '900px', maxWidth: '95%', padding: '3rem', position: 'relative' }}>
            <button onClick={() => setShowHardware(false)} style={{
              position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', 
              color: 'var(--text-muted)', cursor: 'pointer', fontSize: '2rem', transition: 'color 0.2s'
            }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='var(--text-muted)'}>×</button>
            <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '3rem', textAlign: 'center', fontFamily: 'Orbitron', fontSize: '2rem', letterSpacing: '2px' }}>HARDWARE INTEGRATION</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><Camera size={30} color="var(--text-main)" /> <span style={{fontWeight:'bold'}}>AI CAMERAS</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><Users size={30} color="var(--text-main)" /> <span style={{fontWeight:'bold'}}>CROWD SENSORS</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><CloudRain size={30} color="var(--text-main)" /> <span style={{fontWeight:'bold'}}>WEATHER STATION</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><Flame size={30} color="var(--status-danger)" /> <span style={{fontWeight:'bold', color: 'var(--status-danger)'}}>EMERGENCY SENSORS</span></div>
              </div>

              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', width: '100%', height: '2px', background: 'var(--panel-border)', top: '50%', zIndex: -1, left: '-20%', right: '-20%' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0a0a14', padding: '2rem 3rem', borderRadius: '12px', border: '1px solid var(--accent-cyan)', boxShadow: 'var(--glow-shadow)' }}>
                  <Cpu size={60} color="var(--accent-cyan)" />
                  <span style={{ marginTop: '15px', fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-cyan)' }}>ESP32 / EDGE DEVICE</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                  <Wifi size={24} color="var(--accent-cyan)" /> Wi-Fi / 4G
                </div>
                <div style={{ background: '#000', border: '2px solid #333', width: '180px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'bold', letterSpacing: '1px' }}>LED DISPLAYS</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--panel-border)', paddingTop: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}><Activity size={16} color="var(--text-main)"/> Real-time Crowd Monitoring</div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}><Cpu size={16} color="var(--text-main)"/> AI Based Predictions</div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}><Camera size={16} color="var(--text-main)"/> Dynamic Content Management</div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}><ShieldAlert size={16} color="var(--text-main)"/> Emergency Automation</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
