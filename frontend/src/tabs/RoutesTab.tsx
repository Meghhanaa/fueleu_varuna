import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RoutesTab(){
  const [routes, setRoutes] = useState<any[]>([]);
  const [filters, setFilters] = useState({ vesselType:'', fuelType:'', year:'' });

  useEffect(()=>{ fetchRoutes(); }, []);

  async function fetchRoutes(){
    // const r = await axios.get('/api/routes');
    // setRoutes(r.data);
    const r = await axios.get('/api/routes');
    console.log("Routes API response:", r.data);
    setRoutes(Array.isArray(r.data) ? r.data : r.data.routes || []);

  }

  async function setBaseline(routeId:string){
    await axios.post('/api/routes/'+routeId+'/baseline');
    fetchRoutes();
  }

  const filtered = routes.filter(r=>{
    if (filters.vesselType && r.vesselType !== filters.vesselType) return false;
    if (filters.fuelType && r.fuelType !== filters.fuelType) return false;
    if (filters.year && String(r.year) !== filters.year) return false;
    return true;
  });

  return (<div>
    <h2>Routes</h2>
    <div style={{ marginBottom: 8 }}>
      <label>Vessel: <input value={filters.vesselType} onChange={e=>setFilters({...filters, vesselType:e.target.value})} /></label>{' '}
      <label>Fuel: <input value={filters.fuelType} onChange={e=>setFilters({...filters, fuelType:e.target.value})} /></label>{' '}
      <label>Year: <input value={filters.year} onChange={e=>setFilters({...filters, year:e.target.value})} /></label>
    </div>
    <table border={1} cellPadding={6}>
      <thead><tr>
        <th>routeId</th><th>vesselType</th><th>fuelType</th><th>year</th><th>ghgIntensity</th><th>fuelConsumption(t)</th><th>distance(km)</th><th>totalEmissions(t)</th><th>baseline</th><th>actions</th>
      </tr></thead>
      <tbody>
        {filtered.map(r=>(
          <tr key={r.routeId}>
            <td>{r.routeId}</td><td>{r.vesselType}</td><td>{r.fuelType}</td><td>{r.year}</td><td>{r.ghgIntensity}</td><td>{r.fuelConsumption_t}</td><td>{r.distance_km}</td><td>{r.totalEmissions_t}</td><td>{r.isBaseline? 'YES':'NO'}</td>
            <td><button onClick={()=>setBaseline(r.routeId)}>Set Baseline</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>);
}
