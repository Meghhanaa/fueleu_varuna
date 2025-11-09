import React, { useState } from 'react';
import axios from 'axios';

export default function BankingTab(){
  const [routeId, setRouteId] = useState('R002');
  const [amount, setAmount] = useState<number>(1);

  async function bank(){
    await axios.post('/api/banking/bank', { routeId, amount_tonnes: amount });
    alert('banked (naive)');
  }

  async function apply(){
    await axios.post('/api/banking/apply', { routeId, amount_tonnes: amount }).then(()=>alert('applied')).catch(e=>alert('error: '+e.response?.data?.error));
  }

  return (<div>
    <h2>Banking</h2>
    <div>
      <label>RouteId: <input value={routeId} onChange={e=>setRouteId(e.target.value)} /></label>{' '}
      <label>Amount (tonnes): <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} /></label>{' '}
      <button onClick={bank}>Bank</button>{' '}
      <button onClick={apply}>Apply</button>
    </div>
    <p>Note: this is a simplified demo of banking endpoints.</p>
  </div>);
}
