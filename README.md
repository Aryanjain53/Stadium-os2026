# Stadium OS - Virtual Stadium Digital Twin 🏟️

Welcome to **Stadium OS**, an immersive, interactive digital twin platform tailored for IPL cricket fandom. Built specifically to elevate the match-viewing experience for fans of teams like the Rajasthan Royals and Delhi Capitals, this platform brings the atmosphere of a live stadium directly to your screen.

## ✨ Key Features

- **3D Digital Twin Stadium:** Navigate through a stunning 3D replica of a cricket stadium built using Three.js and React Three Fiber.
- **Real-Time WebRTC Video Streaming:** Watch matches together! Seamlessly stream your camera feed with other fans in the virtual environment.
- **Interactive Fan Engagement:** Participate in live polls, share real-time reactions, and chat with fellow supporters as the action unfolds.
- **User Authentication:** Secure login and registration for an individualized fan experience, alongside dedicated admin portals.
- **Seamless Scalability:** Ready for production with a seamless Google Cloud Run deployment strategy.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React 19)
- **3D Rendering:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Real-Time Communication:** [Socket.io-client](https://socket.io/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend
- **Server:** [Express.js](https://expressjs.com/) (Node.js)
- **WebSockets:** [Socket.io](https://socket.io/) (for real-time signaling, chat, and interactive features)
- **Middleware:** CORS

---

## 📂 Project Structure

```
stadium-os/
├── frontend/          # Next.js application (UI, 3D Canvas, WebRTC Client)
│   ├── app/           # App router components and pages
│   ├── components/    # Reusable React & 3D components
│   └── package.json   # Frontend dependencies
├── backend/           # Express server (WebSockets, Signaling Server)
│   ├── index.js       # Main entry point
│   └── package.json   # Backend dependencies
└── README.md          # Project documentation
```

---

## 🚀 Getting Started (Local Development)

Follow these instructions to run the Virtual Stadium locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, or pnpm

### 1. Clone the repository

```bash
git clone https://github.com/Aryanjain53/Stadium-os2026.git
cd stadium-os
```

### 2. Setup the Backend Server

Open a terminal and start the backend WebSockets server:

```bash
cd backend
npm install
npm start # or node index.js
```

### 3. Setup the Frontend Client

Open a second terminal and start the Next.js development server:

```bash
cd frontend
npm install
npm run dev
```

### 4. Experience the Stadium

Open your web browser and navigate to `http://localhost:3000`. You will be prompted to allow camera and microphone access for the WebRTC features.

---

## ☁️ Deployment

Stadium OS is designed for a layman-friendly deployment experience using **Google Cloud Run**. 

1. Containerize both the `frontend` and `backend` using Docker.
2. Push your images to the Google Container Registry or Artifact Registry.
3. Deploy the backend to a Cloud Run service (ensure WebSockets/HTTP/2 are enabled if required).
4. Deploy the frontend to another Cloud Run service, setting the environment variables to point to your hosted backend URL.

---

## 🤝 Contributing

We welcome contributions! Feel free to open issues or submit pull requests for any enhancements, bug fixes, or new features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Stadium OS - Redefining sports fandom for the digital era.*
