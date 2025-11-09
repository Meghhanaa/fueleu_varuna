# FuelEU Maritime - Minimal Fullstack Submission

This archive contains a minimal, structured implementation scaffold for the FuelEU Maritime assignment.

Structure:
- /backend - Node.js + TypeScript + Express backend (Postgres)
- /frontend - Vite + React + TypeScript frontend (minimal UI)

## Quick local setup (Linux / macOS / WSL)

1. Start Postgres:
   ```
   docker compose up -d
   ```

2. Backend:
   ```
   cd backend
   npm install
   npm run seed
   npm run dev
   ```
   Server will run on http://localhost:4000 (APIs under /api)

3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Vite dev server prints URL (default http://localhost:5173). Configure proxy to /api or run frontend and backend on same origin.

## Notes
- This is a compact implementation focusing on domain logic and endpoints. It includes core functions for CB calculation and a greedy pooling algorithm.
- AGENT_WORKFLOW.md and REFLECTION.md are included.
