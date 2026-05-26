"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Stadium3D from "../../components/Stadium3D";
import DashboardUI from "../../components/DashboardUI";

export default function AdminDashboard() {
  const [stadiumState, setStadiumState] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Connect to the backend simulation server
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
    const socket = io(backendUrl);

    socket.on("connect", () => {
      console.log("Connected to Stadium OS Backend");
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Stadium OS Backend");
      setSocketConnected(false);
    });

    socket.on("stadiumUpdate", (data) => {
      setStadiumState(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="dashboard-container">
      {/* 3D Digital Twin Background */}
      <Stadium3D stadiumState={stadiumState} />

      {/* 2D UI Overlay */}
      <DashboardUI stadiumState={stadiumState} />

      {/* Connection Indicator */}
      {!socketConnected && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,51,102,0.8)',
          padding: '10px 20px',
          borderRadius: '20px',
          zIndex: 100,
          fontSize: '0.8rem',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          DISCONNECTED FROM SENSORS
        </div>
      )}
    </main>
  );
}
