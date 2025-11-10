// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function PoolingTab(){
//   const [members, setMembers] = useState<any[]>([]);
//   useEffect(()=>{ axios.get('/api/compliance/adjusted-cb?year=2024').then(r=>setMembers(r.data.result || r.data.result)); }, []);

//   const [selected, setSelected] = useState<{routeId:string, cb_before_tonnes:number}[]>([]);

//   function toggle(m:any){
//     const idx = selected.findIndex(s=>s.routeId===m.routeId);
//     if (idx>=0) setSelected(s=>s.filter(x=>x.routeId!==m.routeId));
//     else setSelected(s=>[...s, { routeId: m.routeId, cb_before_tonnes: m.cb_before_tonnes }]);
//   }

//   async function createPool(){
//     const res = await axios.post('/api/pools', { members: selected });
//     alert(JSON.stringify(res.data,null,2));
//   }

//   return (<div>
//     <h2>Pooling</h2>
//     <div>
//       <h3>Available</h3>
//       <table border={1} cellPadding={6}>
//         <thead><tr><th></th><th>routeId</th><th>cb_before_tonnes</th></tr></thead>
//         <tbody>
//           {members.map((m:any)=>
//             <tr key={m.routeId}>
//               <td><input type="checkbox" onChange={()=>toggle(m)} /></td>
//               <td>{m.routeId}</td><td>{m.cb_before_tonnes}</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div style={{ marginTop: 8 }}>
//         <button onClick={createPool} disabled={selected.length===0}>Create Pool</button>
//       </div>
//     </div>
//   </div>);
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pool.css"; // 👈 Import CSS

export default function PoolingTab() {
  const [members, setMembers] = useState<any[]>([]);
  const [selected, setSelected] = useState<
    { routeId: string; cb_before_tonnes: number }[]
  >([]);

  useEffect(() => {
    axios
      .get("/api/compliance/adjusted-cb?year=2024")
      .then((r) => setMembers(r.data.result || []))
      .catch(() => setMembers([]));
  }, []);

  function toggle(m: any) {
    const idx = selected.findIndex((s) => s.routeId === m.routeId);
    if (idx >= 0) setSelected((s) => s.filter((x) => x.routeId !== m.routeId));
    else
      setSelected((s) => [
        ...s,
        { routeId: m.routeId, cb_before_tonnes: m.cb_before_tonnes },
      ]);
  }

  async function createPool() {
    const res = await axios.post("/api/pools", { members: selected });
    alert(JSON.stringify(res.data, null, 2));
  }

  return (
    <div className="pooling-container">
      <h2 className="pooling-title">Pooling</h2>

      <div>
        <h3 className="pooling-subtitle">Available Members</h3>

        <table className="pooling-table">
          <thead>
            <tr>
              <th></th>
              <th>Route ID</th>
              <th>CB Before (tonnes)</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m: any) => (
              <tr key={m.routeId}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggle(m)}
                    checked={!!selected.find((s) => s.routeId === m.routeId)}
                    />
                </td>
                <td>{m.routeId}</td>
                <td>{m.cb_before_tonnes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pooling-actions">
          <button onClick={createPool} disabled={selected.length === 0}>
            Create Pool
          </button>
        </div>
      </div>
    </div>
  );
}
