// import pool from './db';

// async function run() {
//   await pool.query(\`
//   CREATE TABLE IF NOT EXISTS routes (
//     id SERIAL PRIMARY KEY,
//     route_id TEXT UNIQUE NOT NULL,
//     vessel_type TEXT NOT NULL,
//     fuel_type TEXT NOT NULL,
//     year INT NOT NULL,
//     ghg_intensity NUMERIC NOT NULL,
//     fuel_consumption_t NUMERIC NOT NULL,
//     distance_km NUMERIC NOT NULL,
//     total_emissions_t NUMERIC NOT NULL,
//     is_baseline BOOLEAN DEFAULT FALSE
//   );\`);

//   const rows = [
//     ['R001','Container','HFO',2024,91.0,5000,12000,4500,true],
//     ['R002','BulkCarrier','LNG',2024,88.0,4800,11500,4200,false],
//     ['R003','Tanker','MGO',2024,93.5,5100,12500,4700,false],
//     ['R004','RoRo','HFO',2025,89.2,4900,11800,4300,false],
//     ['R005','Container','LNG',2025,90.5,4950,11900,4400,false],
//   ];
//   for (const r of rows) {
//     const exists = await pool.query('SELECT 1 FROM routes WHERE route_id=$1', [r[0]]);
//     if (exists.rowCount === 0) {
//       await pool.query(\`
//         INSERT INTO routes (route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption_t, distance_km, total_emissions_t, is_baseline)
//         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//       \`, r);
//     }
//   }
//   console.log('Seed complete');
//   process.exit(0);
// }

// run().catch(err => { console.error(err); process.exit(1); });

import pool from './db';

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS routes (
      id SERIAL PRIMARY KEY,
      route_id TEXT UNIQUE NOT NULL,
      vessel_type TEXT NOT NULL,
      fuel_type TEXT NOT NULL,
      year INT NOT NULL,
      ghg_intensity NUMERIC NOT NULL,
      fuel_consumption_t NUMERIC NOT NULL,
      distance_km NUMERIC NOT NULL,
      total_emissions_t NUMERIC NOT NULL,
      is_baseline BOOLEAN DEFAULT FALSE
    );
  `);

  const rows = [
    ['R001', 'Container', 'HFO', 2024, 91.0, 5000, 12000, 4500, true],
    ['R002', 'BulkCarrier', 'LNG', 2024, 88.0, 4800, 11500, 4200, false],
    ['R003', 'Tanker', 'MGO', 2024, 93.5, 5100, 12500, 4700, false],
    ['R004', 'RoRo', 'HFO', 2025, 89.2, 4900, 11800, 4300, false],
    ['R005', 'Container', 'LNG', 2025, 90.5, 4950, 11900, 4400, false],
  ];

  for (const r of rows) {
    const exists = await pool.query('SELECT 1 FROM routes WHERE route_id=$1', [r[0]]);
    if (exists.rowCount === 0) {
      await pool.query(
        `INSERT INTO routes (
          route_id, vessel_type, fuel_type, year, ghg_intensity,
          fuel_consumption_t, distance_km, total_emissions_t, is_baseline
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        r
      );
    }
  }

  console.log('✅ Database seeded successfully');
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
