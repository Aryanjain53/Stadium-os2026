"use client";
import { useState } from 'react';

export default function SeatMap2D({ selectedZone, targetPOI }) {
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Generate a grid of seats
  const rows = 18;
  const colsPerBlock = 14;
  const seatSize = 14;
  const gap = 8;
  const aisleWidth = 50;
  
  // Center the map in the 1000x600 viewBox
  const mapWidth = (colsPerBlock * 2 * (seatSize + gap)) + aisleWidth;
  const startX = (1000 - mapWidth) / 2;
  const startY = 80;

  const seats = [];
  for (let r = 0; r < rows; r++) {
    // Left block
    for (let c = 0; c < colsPerBlock; c++) {
      seats.push({
        id: `L-${r + 1}-${c + 1}`,
        x: startX + c * (seatSize + gap),
        y: startY + r * (seatSize + gap),
        type: 'available'
      });
    }
    // Right block
    for (let c = 0; c < colsPerBlock; c++) {
      seats.push({
        id: `R-${r + 1}-${c + 1}`,
        x: startX + colsPerBlock * (seatSize + gap) + aisleWidth + c * (seatSize + gap),
        y: startY + r * (seatSize + gap),
        type: 'available'
      });
    }
  }

  // Gate is at the bottom center of the aisle
  const gateX = startX + colsPerBlock * (seatSize + gap) + aisleWidth / 2 - (seatSize + gap) / 2;
  const gateY = startY + rows * (seatSize + gap) + 40;

  // POI Locations
  const pois = {
    'Entrance': { x: gateX, y: gateY, label: 'ENTRANCE', color: 'var(--status-normal)' },
    'Emergency Exit': { x: startX - 80, y: startY + (rows/2)*(seatSize+gap), label: 'EXIT', color: 'var(--status-danger)' },
    'Toilets': { x: startX + mapWidth + 80, y: startY + (rows/2)*(seatSize+gap), label: 'TOILETS', color: 'var(--accent-cyan)' },
    'Food / Concessions': { x: gateX + 220, y: gateY, label: 'FOOD', color: 'var(--status-medium)' },
    'Security': { x: gateX - 220, y: gateY, label: 'SECURITY', color: 'var(--accent-cyan)' }
  };

  // Path drawing logic
  const getPath = () => {
    if (!selectedSeat) return null;
    const seat = seats.find(s => s.id === selectedSeat);
    if (!seat) return null;

    const target = pois[targetPOI] || pois['Entrance'];

    if (targetPOI === 'Entrance' || targetPOI === 'Food / Concessions' || targetPOI === 'Security') {
      // Path goes from seat to center aisle, down aisle, then across
      return `M ${seat.x} ${seat.y} L ${gateX} ${seat.y} L ${gateX} ${gateY - 30} L ${target.x} ${target.y}`;
    } else {
      // Path goes from seat outwards to the edges
      const edgeX = seat.id.startsWith('L') ? startX - 30 : startX + mapWidth + 30;
      return `M ${seat.x} ${seat.y} L ${edgeX} ${seat.y} L ${target.x} ${target.y}`;
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
      <svg width="1000" height="600" viewBox="0 0 1000 600" style={{ pointerEvents: 'auto', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--panel-border)', boxShadow: 'var(--glow-shadow)' }}>
        
        {/* Title */}
        <text x="500" y="40" fill="var(--text-main)" fontSize="24" fontFamily="Orbitron" fontWeight="bold" textAnchor="middle">
          ZONE {selectedZone} SEAT MAP
        </text>
        <text x="500" y="65" fill="var(--text-muted)" fontSize="14" textAnchor="middle">
          {selectedSeat ? `Guiding to ${targetPOI || 'Entrance'} from Seat ${selectedSeat.split('-').slice(1).join('-')}` : "Select a seat to view guidance"}
        </text>

        {/* Draw Path Behind Seats */}
        {selectedSeat && (
          <path
            d={getPath()}
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="4"
            strokeDasharray="8 4"
            style={{ animation: 'dash 1s linear infinite' }}
          />
        )}

        {/* Draw Seats */}
        {seats.map(seat => (
          <g key={seat.id} onClick={() => setSelectedSeat(seat.id)} style={{ cursor: 'pointer' }}>
            <circle
              cx={seat.x}
              cy={seat.y}
              r={seatSize / 2}
              fill={selectedSeat === seat.id ? 'var(--accent-cyan)' : 'var(--bg-color)'}
              stroke={selectedSeat === seat.id ? '#fff' : 'var(--text-muted)'}
              strokeWidth="1.5"
              style={{ transition: 'all 0.2s' }}
              onMouseOver={(e) => { if(selectedSeat !== seat.id) e.target.setAttribute('fill', 'var(--panel-border)') }}
              onMouseOut={(e) => { if(selectedSeat !== seat.id) e.target.setAttribute('fill', 'var(--bg-color)') }}
            />
            <text x={seat.x} y={seat.y + 2.5} fontSize="6" fontWeight="bold" fill={selectedSeat === seat.id ? '#000' : 'var(--text-muted)'} textAnchor="middle" pointerEvents="none">
              {seat.id.split('-')[2]}
            </text>
            <title>Row {seat.id.split('-')[1]}, Seat {seat.id.split('-')[2]}</title>
          </g>
        ))}

        {/* Draw POIs */}
        {Object.entries(pois).map(([name, pos]) => (
          <g key={name} opacity={(!selectedSeat || targetPOI === name) ? 1 : 0.3} style={{ transition: 'opacity 0.3s' }}>
            <rect x={pos.x - 40} y={pos.y - 15} width="80" height="30" fill={pos.color} rx="6" />
            <text x={pos.x} y={pos.y + 5} fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">
              {pos.label}
            </text>
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
      `}</style>
    </div>
  );
}
