# Backend – Job Management Realtime API

This is the backend for the Realtime Job Management System.
It serves:
- Poster app (creates jobs)
- Provider app (receives jobs in realtime)

Includes:
- REST API for jobs
- WebSockets (Socket.IO)
- In-memory job service

-------------------------------------------------
ENVIRONMENT SETUP
-------------------------------------------------

Create a .env file:
```bash
PORT=4000
```

If omitted, server defaults to 4000.

-------------------------------------------------
INSTALLATION
-------------------------------------------------

npm install

Start server:
```bash
npm start
```

Start in dev mode:
```bash
npm run dev
```

-------------------------------------------------
REST API
-------------------------------------------------

POST /jobs
Body:
```bash
{
  "title": "Fix AC",
  "category": "Repair"
}
```

GET /jobs
Returns all jobs.

-------------------------------------------------
WEBSOCKET EVENTS
-------------------------------------------------

Emitted by server:
- job:new       → when a new job is created
- job:closed    → when a provider accepts a job
- job:error     → invalid job or already accepted

Sent by client:
- job:accept
Payload:
```bash
{
  "jobId": "uuid"
}
```

-------------------------------------------------
PROJECT STRUCTURE
-------------------------------------------------
```bash
backend/
  controllers/
  services/
  socket/
  routes/
  index.js
  .env
  README.md
```

-------------------------------------------------
NOTES
-------------------------------------------------

- Jobs are kept in-memory (for demo purposes)
- Providers and Posters get realtime updates
- Works with Expo mobile apps
