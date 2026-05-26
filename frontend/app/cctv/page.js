"use client";

import { useEffect, useState } from "react";
import { Video, Scan } from "lucide-react";

function CameraFeed({ id, location, density }) {
  const [boxes, setBoxes] = useState([]);

  // Simulate AI YOLOv8 Bounding Boxes randomly appearing/moving
  useEffect(() => {
    const interval = setInterval(() => {
      const numBoxes = Math.floor(Math.random() * 5) + 2; // 2 to 6 boxes
      const newBoxes = Array.from({ length: numBoxes }).map(() => ({
        id: Math.random(),
        x: Math.random() * 80,
        y: Math.random() * 80,
        w: Math.random() * 15 + 5,
        h: Math.random() * 20 + 10,
        label: Math.random() > 0.8 ? 'Person (Running)' : 'Person',
        color: Math.random() > 0.8 ? '#ff3366' : '#00ff88'
      }));
      setBoxes(newBoxes);
    }, 1000); // refresh every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="camera-feed glass-panel">
      <div className="camera-header">
        <div>
          <Video size={14} style={{ display: 'inline', marginRight: '5px' }} />
          <span>CAM_{id} // {location}</span>
        </div>
        <div className={`badge ${density > 80 ? 'overloaded' : 'normal'}`}>
          Density {density}%
        </div>
      </div>
      
      <div className="camera-view">
        {/* Fake video noise background */}
        <div className="video-noise"></div>
        
        {/* Animated Bounding Boxes */}
        {boxes.map((box) => (
          <div 
            key={box.id} 
            className="bounding-box"
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.w}%`,
              height: `${box.h}%`,
              borderColor: box.color
            }}
          >
            <span className="box-label" style={{ backgroundColor: box.color }}>
              {box.label} 98%
            </span>
          </div>
        ))}

        {/* Reticle Overlay */}
        <div className="reticle-overlay">
          <Scan size={40} opacity={0.3} color="var(--accent-cyan)" />
        </div>
      </div>
    </div>
  );
}

export default function CCTVPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>AI VISION // LIVE CCTV ANALYTICS</h1>
        <p className="page-subtitle">Real-time YOLOv8 object detection and crowd flow analysis.</p>
      </div>

      <div className="cctv-grid">
        <CameraFeed id="101" location="North Gate Entrance" density={45} />
        <CameraFeed id="102" location="South Stand Section A" density={87} />
        <CameraFeed id="103" location="East Concourse" density={62} />
        <CameraFeed id="104" location="West VIP Lounge" density={20} />
      </div>

      <style jsx>{`
        .page-container {
          padding: 2rem;
          height: 100vh;
          overflow-y: auto;
          background: radial-gradient(circle at center, #0a0a14 0%, #05050a 100%);
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
        .cctv-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .camera-feed {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .camera-header {
          display: flex;
          justify-content: space-between;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          color: var(--accent-cyan);
        }
        .camera-view {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background-color: #000;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .video-noise {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.05) 2px, rgba(0, 240, 255, 0.05) 4px);
          opacity: 0.5;
          pointer-events: none;
        }
        .bounding-box {
          position: absolute;
          border: 2px solid;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
          transition: all 0.2s ease;
        }
        .box-label {
          position: absolute;
          top: -18px;
          left: -2px;
          padding: 2px 4px;
          font-size: 0.6rem;
          color: #000;
          font-weight: bold;
          white-space: nowrap;
        }
        .reticle-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
