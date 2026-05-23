const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Stadium State Simulation
let stadiumState = {
  totalPeople: 45200,
  gates: [
    { id: 1, name: 'Gate 1', status: 'Normal', flowRate: 15 },
    { id: 2, name: 'Gate 2', status: 'Normal', flowRate: 20 },
    { id: 3, name: 'Gate 3', status: 'Medium', flowRate: 45 },
    { id: 4, name: 'Gate 4', status: 'Overloaded', flowRate: 85 },
    { id: 5, name: 'Gate 5', status: 'Normal', flowRate: 10 }
  ],
  zones: [
    { id: 'A', name: 'North Stand', density: 45 },
    { id: 'B', name: 'South Stand', density: 87 },
    { id: 'C', name: 'East Stand', density: 60 },
  ],
  securityTeams: [
    { id: 'S1', name: 'Alpha Team', zone: 'A', status: 'Available' },
    { id: 'S2', name: 'Bravo Team', zone: 'B', status: 'Available' },
    { id: 'S3', name: 'Charlie Team', zone: 'C', status: 'Busy' },
    { id: 'S4', name: 'Delta Team', zone: 'D', status: 'Available' }
  ],
  alerts: []
};

// Simulation Loop
setInterval(() => {
  // Randomly fluctuate total people
  stadiumState.totalPeople += Math.floor(Math.random() * 20) - 5;

  // Randomly fluctuate gate flow rates and determine status
  stadiumState.gates.forEach(gate => {
    gate.flowRate += Math.floor(Math.random() * 11) - 5;
    if (gate.flowRate < 0) gate.flowRate = 0;
    if (gate.flowRate > 100) gate.flowRate = 100;

    if (gate.flowRate < 30) gate.status = 'Normal';
    else if (gate.flowRate < 70) gate.status = 'Medium';
    else gate.status = 'Overloaded';
  });

  // Fluctuate zone density
  stadiumState.zones.forEach(zone => {
    zone.density += Math.floor(Math.random() * 7) - 3;
    if (zone.density < 0) zone.density = 0;
    if (zone.density > 100) zone.density = 100;
  });

  // Generate predictive alerts
  stadiumState.alerts = [];
  stadiumState.gates.forEach(gate => {
    if (gate.status === 'Overloaded') {
      stadiumState.alerts.push({
        type: 'WARNING',
        message: `${gate.name} is overloaded! Redirecting crowd to Gate 5.`
      });
    } else if (gate.status === 'Medium' && gate.flowRate > 60) {
      stadiumState.alerts.push({
        type: 'INFO',
        message: `${gate.name} predicted to overload in 8 minutes.`
      });
    }
  });

  stadiumState.zones.forEach(zone => {
    if (zone.density > 85) {
      stadiumState.alerts.push({
        type: 'CRITICAL',
        zoneId: zone.id,
        message: `High density in ${zone.name} (${zone.density}%). Dispatching security.`
      });
    }
  });

  // Emit updated state to all connected clients
  io.emit('stadiumUpdate', stadiumState);
}, 2000); // update every 2 seconds

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  // Send initial state immediately
  socket.emit('stadiumUpdate', stadiumState);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend Simulation Server running on port ${PORT}`);
});
