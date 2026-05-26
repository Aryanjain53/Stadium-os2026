"use client";

import { Navigation, ShieldAlert, Car, MapPin, ArrowLeft } from "lucide-react";

export default function UserDashboardUI({ stadiumState, selectedZone, onBack, targetPOI, setTargetPOI }) {
  if (!stadiumState) return null;

  // Find info specifically for the selected zone
  const zoneInfo = stadiumState.zones?.find(z => z.id === selectedZone) || { name: `Zone ${selectedZone}` };
  
  // Approximate nearest gate logic (simulated for realism)
  const gateMap = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 };
  const nearestGateId = gateMap[selectedZone] || 1;
  const nearestGate = stadiumState.gates?.find(g => g.id === nearestGateId);
  
  const nearestSecurity = stadiumState.securityTeams?.filter(s => s.zone === selectedZone) || [];
  
  // Simulated Parking data (since it's not in backend yet)
  const parkingStatus = selectedZone === 'A' || selectedZone === 'B' ? '85% Full' : '40% Full';

  return (
    <div className="ui-layer" style={{ gridTemplateColumns: 'minmax(280px, 320px) 1fr' }}>
      {/* Left Sidebar - Personalized Fan Information */}
      <div className="left-sidebar" style={{ background: 'var(--panel-bg)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--glow-shadow)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <ArrowLeft size={24} />
          </button>
          <h2 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', margin: 0 }}>{zoneInfo.name}</h2>
        </div>

        <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={18} /> Nearest Gate ({nearestGate?.name})
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-main)' }}>Traffic Status</span>
            <span className={`badge ${nearestGate?.status.toLowerCase()}`}>{nearestGate?.status}</span>
          </div>
        </div>

        <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} /> Point of Interest Guide
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Entrance', 'Emergency Exit', 'Toilets', 'Food / Concessions', 'Security'].map(poi => (
              <button 
                key={poi} 
                onClick={() => setTargetPOI(poi)}
                style={{
                  padding: '10px', background: targetPOI === poi ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0,0,0,0.3)',
                  border: `1px solid ${targetPOI === poi ? 'var(--accent-cyan)' : 'var(--panel-border)'}`,
                  color: targetPOI === poi ? '#fff' : 'var(--text-main)',
                  borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', transition: 'all 0.2s'
                }}
              >
                Navigate to {poi}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} /> Nearby Security
          </h3>
          {nearestSecurity.length > 0 ? (
            nearestSecurity.map(s => (
              <div key={s.id} style={{ padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', marginBottom: '4px', border: '1px solid var(--panel-border)' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{s.name}</span> - <span style={{ color: s.status === 'Available' ? 'var(--status-normal)' : 'var(--status-medium)' }}>{s.status}</span>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>No security teams stationed strictly in this zone. Ask staff for help.</div>
          )}
        </div>

      </div>
    </div>
  );
}
