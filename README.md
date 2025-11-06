# Realtime Job Management System

This repository contains a complete realtime job posting and accepting system built with:

- Expo (React Native) – Poster App
- Expo (React Native) – Provider App
- Node.js + Express + Socket.IO – Backend API

The system demonstrates real-time communication between two different mobile apps using WebSockets.

-------------------------------------------------
📌 PROJECT OVERVIEW
-------------------------------------------------

This project simulates a realtime job marketplace:

POSTER APP:
- Creates new jobs
- Sets job title, category, expiration time
- Can delete/cancel job before it is accepted
- Receives realtime updates when provider accepts the job

PROVIDER APP:
- Receives new jobs instantly in realtime
- Each job shows countdown time remaining
- Provider can Accept or Clear (reject) jobs
- Accepting a job updates all clients instantly

BACKEND:
- REST API for listing, creating, deleting jobs
- WebSocket events for realtime syncing
- In-memory job management service
- Expiration timestamps (expireAt)
- Prevents accepting expired jobs
- Prevents deleting an accepted job

This is designed as a learning/demo project showcasing:
- Expo Router
- Environment variables in Expo
- Socket.IO realtime communication
- Clean code + modular backend structure
- React Native UI components with consistent UX

-------------------------------------------------
📂 PROJECT STRUCTURE
-------------------------------------------------
```bash
repo-root/
  ├── backend/
  │     - Node.js + Express API
  │     - Socket.IO server
  │     - .env (PORT)
  │     - Routes, controllers, services
  │
  ├── poster/ (Expo App)
  │     - Creates jobs
  │     - Connects to backend via WebSocket
  │     - Uses EXPO_PUBLIC_API_BASE_URL
  │
  ├── provider/ (Expo App)
  │     - Receives and accepts jobs
  │     - Realtime updates
  │     - Uses EXPO_PUBLIC_API_BASE_URL
  │
  ├── README.md (this file)
  └── ... other project files
```

-------------------------------------------------
⚙️ ENVIRONMENT VARIABLES
-------------------------------------------------

Each Expo app must include a .env file:
```bash
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:4000
```

Example:
```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.12:4000
```

A .env.example file is included in both Expo apps.

Backend .env file:
```bash
PORT=4000
```

-------------------------------------------------
🚀 RUNNING THE PROJECT
-------------------------------------------------

1. Start backend
```bash
    cd backend
    npm install
    npm start
```

2. Start poster app
```bash
    cd poster
    npm install
    npx expo start
```

3. Start provider app
```bash
    cd provider
    npm install
    npx expo start
```

Open each app in:
- Expo Go
- Android Emulator
- iOS Simulator
- Development Build

Ensure:
- Your mobile device is on the same WiFi network
- Your EXPO_PUBLIC_API_BASE_URL uses your LAN IP

-------------------------------------------------
🔌 REALTIME SOCKET EVENTS
-------------------------------------------------

Backend emits:
```bash
- job:new
- job:closed
- job:deleted
- job:error
```

Clients emit:
```bash
- job:accept
- job:delete (via REST for poster)
```

Poster and Provider both receive instant updates.

-------------------------------------------------
✅ FEATURES IMPLEMENTED
-------------------------------------------------

- Clean UI/UX for both apps
- Job card components with countdown
- Color-coded job statuses
- Prevent deleting accepted jobs
- Prevent accepting expired jobs
- Single WebSocket connection using useRef
- Proper cleanup on unmount
- Robust TypeScript types for Job model
- Real-time broadcasting across all connected clients

-------------------------------------------------
📘 INTENDED USE
-------------------------------------------------

This project is ideal for:
- Learning Socket.IO with React Native
- Understanding realtime multi-app communication
- Portfolio demonstration
- Teaching realtime patterns
- Local network realtime demo apps

-------------------------------------------------
📝 LICENSE
-------------------------------------------------

MIT License – free to use, modify, and share.

-------------------------------------------------
👤 AUTHOR
-------------------------------------------------

Tushar Biswas 
GitHub: https://github.com/asynctushar
Linkedin: https://www.linkedin.com/in/asynctushar
Upwork: https://www.upwork.com/freelancers/~0122c2f7d15270906e
Fiverr: https://fiverr.com/asynctushar
Dribbble: https://dribbble.com/asynctushar

