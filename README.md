# Stadium OS // Digital Twin

Stadium OS is a futuristic, highly interactive Smart Stadium management platform built with React, Next.js, and Three.js. It features a dual-portal architecture—serving both as an administrative command center for real-time crowd control and as a personalized interactive dashboard for fans attending the match.

## 🚀 Key Features

### 🛡️ Admin Command Center
- **3D Digital Twin Visualization:** A live, WebGL-powered 3D model of the stadium (`@react-three/fiber`). The stands act as a dynamic heatmap, changing colors (Green -> Yellow -> Red) based on real-time IoT density data.
- **CCTV Analytics Dashboard:** Simulates AI-powered YOLOv8 object detection on camera feeds to monitor crowd flow and bottlenecks.
- **Emergency Management System:** Provides a visual evacuation routing map and one-click system overrides to dispatch EMS, open gates, or sound alarms during detected threats (e.g., Fire, Crowd Crush).
- **Hardware Topology Viewer:** A built-in architecture map showing the integration of AI Cameras, Crowd Sensors, and Edge Devices (ESP32) pushing to LED displays.
- **Gate Traffic Analysis:** Real-time throughput metrics for stadium entrances.

### 🏟️ Interactive Fan Portal
- **2D Point-of-Interest (POI) Navigation:** Fans can select their exact seat inside their zone on an SVG-generated interactive map. Clicking amenities (Food, Toilets, Emergency Exits, Security) automatically draws an animated, guiding path from their seat to the selected destination.
- **Personalized Zone Information:** Displays the nearest exit, localized security team availability, and gate traffic status so fans can avoid congested areas.

### 🔐 Secure Authentication
- Includes a unified, mock-secure access portal using `localStorage`. 
- **Admin Access:** Use `admin` / `12345` to route to the Command Center.
- **Fan Access:** Use `bipul` / `12345` to route to the Fan Dashboard, or create a brand new account on the fly.

## 🛠️ Technology Stack

- **Frontend Framework:** Next.js 14+ (App Router)
- **UI Library:** React 18
- **3D Rendering:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Real-Time Data:** `socket.io-client` (Frontend), `socket.io` (Backend)
- **Styling:** Custom Vanilla CSS with a futuristic, glassmorphic "Cyberpunk" aesthetic (`#00f0ff` neon accents).
- **Icons:** `lucide-react`

## ⚙️ Installation & Setup

This project uses a split architecture: a backend data simulator and a frontend Next.js application.

### 1. Start the IoT Backend Server
The backend simulates live sensor data (crowd density, gate flow, security statuses) via WebSockets.

```bash
cd backend
npm install
node server.js
```
*The WebSocket server will start on `http://localhost:4000`.*

### 2. Start the Frontend Application
In a new terminal window, run the Next.js app.

```bash
cd frontend
npm install
npm run dev
```
*The web app will start on `http://localhost:3000`.*

## 🎮 How to Use

1. Open `http://localhost:3000` in your browser.
2. At the Secure Access Portal, choose your experience:
   - Login as **Admin** (`admin` / `12345`) to explore the 3D stadium heatmap, CCTV, and Emergency systems.
   - Login as a **Fan** (`bipul` / `12345`) to explore the interactive 2D seat map and POI pathfinding.
3. Test the real-time nature of the platform by watching the 3D heatmap in the Admin dashboard pulse and change color as the backend data simulator cycles through different crowd densities.

## 📁 Project Structure Highlights

- `/frontend/app/page.js`: Unified Login & Account Creation
- `/frontend/app/admin/page.js`: Admin Dashboard (3D Heatmap, Alerts)
- `/frontend/app/user/page.js`: Fan Dashboard (2D Seat Map, Navigation)
- `/frontend/app/cctv/page.js`: Simulated Computer Vision Dashboard
- `/frontend/components/Stadium3D.js`: Three.js rendering logic
- `/frontend/components/SeatMap2D.js`: SVG pathfinding logic for Fan UI
- `/frontend/app/globals.css`: The source of truth for the futuristic design tokens.

---
*Developed for advanced stadium management and interactive fan engagement.*
