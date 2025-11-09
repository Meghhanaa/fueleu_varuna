import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CompareTab(){
  const [data, setData] = useState<any>(null);

  useEffect(()=>{ axios.get('/api/routes/comparison').then(r=>setData(r.data)).catch(()=>setData(null)); }, []);

  if (!data) return <div><h2>Compare</h2><p>No baseline set or loading...</p></div>;

  return (<div>
    <h2>Compare</h2>
    <div><strong>Baseline</strong>: {data.baseline.routeId} — {data.baseline.ghgIntensity} gCO2e/MJ</div>
    <table border={1} cellPadding={6}>
      <thead><tr><th>routeId</th><th>ghgIntensity</th><th>% diff</th><th>compliant</th></tr></thead>
      <tbody>
        {data.comparison.map((c:any)=>
          <tr key={c.routeId}>
            <td>{c.routeId}</td><td>{c.ghgIntensity}</td><td>{c.percentDiff?.toFixed(2) ?? '-'}</td><td>{c.compliant? '✅':'❌'}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>);
}
