import React, { useState } from 'react';
import RoutesTab from './tabs/RoutesTab';
import CompareTab from './tabs/CompareTab';
import BankingTab from './tabs/BankingTab';
import PoolingTab from './tabs/PoolingTab';

export default function App() {
  const [tab, setTab] = useState('routes');
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>FuelEU Compliance Dashboard</h1>
      <nav style={{ marginBottom: 12 }}>
        <button onClick={()=>setTab('routes')}>Routes</button>{' '}
        <button onClick={()=>setTab('compare')}>Compare</button>{' '}
        <button onClick={()=>setTab('banking')}>Banking</button>{' '}
        <button onClick={()=>setTab('pooling')}>Pooling</button>
      </nav>
      <div>
        {tab==='routes' && <RoutesTab />}
        {tab==='compare' && <CompareTab />}
        {tab==='banking' && <BankingTab />}
        {tab==='pooling' && <PoolingTab />}
      </div>
    </div>
  );
}
