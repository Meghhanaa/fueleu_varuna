// import express from 'express';
// import pool from '../../infrastructure/db';
// import { percentDiff, isCompliant } from '../../core/application/calc';
// import { createPoolAllocation } from '../../core/application/pooling';
import express from 'express';
import pool from '../../../infrastructure/db';  // ✅ 3 dots up from http folder
import { percentDiff, isCompliant } from '../../../core/application/calc';
import { createPoolAllocation } from '../../../core/application/pooling';

const router = express.Router();

router.get('/routes', async (req, res) => {
  const r = await pool.query('SELECT * FROM routes ORDER BY id');
  res.json(r.rows.map(row => ({
    id: row.id, routeId: row.route_id, vesselType: row.vessel_type,
    fuelType: row.fuel_type, year: row.year, ghgIntensity: Number(row.ghg_intensity),
    fuelConsumption_t: Number(row.fuel_consumption_t), distance_km: Number(row.distance_km),
    totalEmissions_t: Number(row.total_emissions_t), isBaseline: row.is_baseline
  })));
});

router.post('/routes/:routeId/baseline', async (req, res) => {
  const { routeId } = req.params;
  await pool.query('UPDATE routes SET is_baseline = FALSE');
  const r = await pool.query('UPDATE routes SET is_baseline = TRUE WHERE route_id=$1 RETURNING *', [routeId]);
  if (r.rowCount === 0) return res.status(404).json({ error: 'route not found' });
  res.json({ ok: true });
});

router.get('/routes/comparison', async (req, res) => {
  const bq = await pool.query('SELECT * FROM routes WHERE is_baseline = TRUE LIMIT 1');
  if (bq.rowCount === 0) return res.status(400).json({ error: 'no baseline set' });
  const baseline = bq.rows[0];
  const others = (await pool.query('SELECT * FROM routes WHERE route_id <> $1', [baseline.route_id])).rows;
  const comparison = others.map(o => ({
    routeId: o.route_id,
    ghgIntensity: Number(o.ghg_intensity),
    percentDiff: percentDiff(Number(baseline.ghg_intensity), Number(o.ghg_intensity)),
    compliant: isCompliant(Number(o.ghg_intensity))
  }));
  res.json({
    baseline: { routeId: baseline.route_id, ghgIntensity: Number(baseline.ghg_intensity) },
    comparison
  });
});

// Simple compliance CB per route (not per shipId)
router.get('/compliance/cb', async (req, res) => {
  const year = Number(req.query.year || 2024);
  const rows = (await pool.query('SELECT * FROM routes WHERE year=$1', [year])).rows;
  const result = rows.map(r => {
    const energy = Number(r.fuel_consumption_t) * 41000;
    const cb_g = (89.3368 - Number(r.ghg_intensity)) * energy;
    return { routeId: r.route_id, cb_g, cb_tonnes: cb_g / 1e6 };
  });
  res.json({ year, result });
});

// adjusted-cb endpoint (simple: returns same as cb)
router.get('/compliance/adjusted-cb', async (req, res) => {
  const year = Number(req.query.year || 2024);
  const rows = (await pool.query('SELECT * FROM routes WHERE year=$1', [year])).rows;
  const result = rows.map(r => {
    const energy = Number(r.fuel_consumption_t) * 41000;
    const cb_g = (89.3368 - Number(r.ghg_intensity)) * energy;
    return { routeId: r.route_id, cb_before_tonnes: cb_g/1e6, cb_after_tonnes: cb_g/1e6 };
  });
  res.json({ year, result });
});

// Banking simple in-memory table using bank_entries table
router.post('/banking/bank', async (req, res) => {
  const { routeId, amount_tonnes } = req.body;
  if (!routeId || typeof amount_tonnes !== 'number') return res.status(400).json({ error: 'routeId and amount_tonnes required' });
  const grams = amount_tonnes * 1e6;
  await pool.query('CREATE TABLE IF NOT EXISTS bank_entries (id SERIAL PRIMARY KEY, route_id TEXT, year INT, amount_g NUMERIC, created_at TIMESTAMP DEFAULT now())');
  await pool.query('INSERT INTO bank_entries (route_id, year, amount_g) VALUES ($1,$2,$3)', [routeId, 2024, grams]);
  res.json({ ok: true });
});

router.post('/banking/apply', async (req, res) => {
  const { routeId, amount_tonnes } = req.body;
  if (!routeId || typeof amount_tonnes !== 'number') return res.status(400).json({ error: 'routeId and amount_tonnes required' });
  // naive: check available
  const q = await pool.query('SELECT SUM(amount_g) as total FROM bank_entries WHERE route_id=$1', [routeId]);
  const total = Number(q.rows[0].total || 0);
  const grams = amount_tonnes * 1e6;
  if (grams > total) return res.status(400).json({ error: 'amount exceeds banked' });
  // subtract by deleting oldest entries (simple)
  await pool.query('DELETE FROM bank_entries WHERE id IN (SELECT id FROM bank_entries WHERE route_id=$1 ORDER BY created_at LIMIT 1)', [routeId]);
  res.json({ ok: true });
});

// Pools
router.post('/pools', async (req, res) => {
  const { members } = req.body; // [{ routeId, cb_before_tonnes }]
  if (!Array.isArray(members)) return res.status(400).json({ error: 'members array required' });
  try {
    const alloc = createPoolAllocation(members.map(m => ({ shipId: m.routeId, cb_before: m.cb_before_tonnes })));
    res.json({ members: alloc });
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
