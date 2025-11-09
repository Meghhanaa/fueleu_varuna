# Backend (FuelEU) - Minimal Implementation

## Quick start (development)

1. Ensure PostgreSQL is running (see docker-compose in project root). Default credentials:
   - user / password / fuel_eu

2. Install deps:
   ```
   cd backend
   npm install
   ```

3. Seed DB:
   ```
   npm run seed
   ```

4. Start server:
   ```
   npm run dev
   ```

APIs exposed under http://localhost:4000/api

Key endpoints:
- GET /api/routes
- POST /api/routes/:routeId/baseline
- GET /api/routes/comparison
- GET /api/compliance/cb?year=YYYY
- GET /api/compliance/adjusted-cb?year=YYYY
- POST /api/banking/bank
- POST /api/banking/apply
- POST /api/pools
