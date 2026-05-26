"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SeatMap2D from "../../components/SeatMap2D";
import UserDashboardUI from "../../components/UserDashboardUI";

export default function UserPortal() {
  const [stadiumState, setStadiumState] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [targetPOI, setTargetPOI] = useState('Entrance');

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
    const socket = io(backendUrl);
    socket.on("connect", () => setSocketConnected(true));
    socket.on("disconnect", () => setSocketConnected(false));
    socket.on("stadiumUpdate", (data) => setStadiumState(data));
    return () => socket.disconnect();
  }, []);

  if (!selectedZone) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        height: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'sans-serif'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Select Your Stand</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {['A', 'B', 'C', 'D'].map(zone => (
            <button key={zone} onClick={() => setSelectedZone(zone)} style={{
              padding: '2rem', fontSize: '1.2rem', fontWeight: 'bold', background: 'var(--panel-bg)', 
              border: '1px solid var(--panel-border)', borderRadius: '12px', cursor: 'pointer',
              boxShadow: 'var(--glow-shadow)', color: 'var(--text-main)', backdropFilter: 'blur(12px)'
            }}>
              Zone {zone} Stand
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="dashboard-container">
      {/* 2D Interactive Seat Map with Guidance */}
      <SeatMap2D selectedZone={selectedZone} targetPOI={targetPOI} />
      {/* 2D UI Overlay - Personalized for the user's zone */}
      <UserDashboardUI 
        stadiumState={stadiumState} 
        selectedZone={selectedZone} 
        onBack={() => setSelectedZone(null)} 
        targetPOI={targetPOI}
        setTargetPOI={setTargetPOI}
      />
    </main>
  );
}
