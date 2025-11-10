import React, { useState } from "react";
import RoutesTab from "./tabs/RoutesTab";
import CompareTab from "./tabs/CompareTab";
import BankingTab from "./tabs/BankingTab";
import PoolingTab from "./tabs/PoolingTab";
import "../src/styles/App.css"; // 👈 Import the CSS file here

export default function App() {
  const [tab, setTab] = useState("routes");

  return (
    <div className="app-container">
      <h1 className="app-title">FuelEU Compliance Dashboard</h1>

      <nav className="nav-bar">
        {["routes", "compare", "banking", "pooling"].map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`nav-button ${tab === name ? "active" : ""}`}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </nav>

      <div className="tab-content">
        {tab === "routes" && <RoutesTab />}
        {tab === "compare" && <CompareTab />}
        {tab === "banking" && <BankingTab />}
        {tab === "pooling" && <PoolingTab />}
      </div>
    </div>
  );
}



// import React, { useState } from 'react';
// import RoutesTab from './tabs/RoutesTab';
// import CompareTab from './tabs/CompareTab';
// import BankingTab from './tabs/BankingTab';
// import PoolingTab from './tabs/PoolingTab';

// export default function App() {
//   const [tab, setTab] = useState('routes');
//   return (
//     <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
//       <h1>FuelEU Compliance Dashboard</h1>
//       <nav style={{ marginBottom: 12 }}>
//         <button onClick={()=>setTab('routes')}>Routes</button>{' '}
//         <button onClick={()=>setTab('compare')}>Compare</button>{' '}
//         <button onClick={()=>setTab('banking')}>Banking</button>{' '}
//         <button onClick={()=>setTab('pooling')}>Pooling</button>
//       </nav>
//       <div>
//         {tab==='routes' && <RoutesTab />}
//         {tab==='compare' && <CompareTab />}
//         {tab==='banking' && <BankingTab />}
//         {tab==='pooling' && <PoolingTab />}
//       </div>
//     </div>
//   );
// }
