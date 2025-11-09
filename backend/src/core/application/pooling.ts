export function createPoolAllocation(members: { shipId: string; cb_before: number }[]) {
  const res = members.map(m => ({ ...m, cb_after: m.cb_before }));
  const total = res.reduce((s, r) => s + r.cb_before, 0);
  if (total < -1e-6) throw new Error('Pool invalid: total CB < 0');

  const surplus = res.filter(r => r.cb_after > 0).sort((a,b)=>b.cb_after - a.cb_after);
  const deficit = res.filter(r => r.cb_after < 0).sort((a,b)=>a.cb_after - b.cb_after); // most negative first

  for (const d of deficit) {
    let remaining = -d.cb_after;
    for (const s of surplus) {
      if (remaining <= 0) break;
      const available = s.cb_after;
      if (available <= 0) continue;
      const transfer = Math.min(available, remaining);
      s.cb_after -= transfer;
      d.cb_after += transfer;
      remaining -= transfer;
    }
    if (remaining > 1e-6) throw new Error('Insufficient surplus to cover deficits');
  }

  // validate rules
  for (const m of res) {
    if (m.cb_before < 0 && m.cb_after < m.cb_before) {
      throw new Error('Deficit ship worsened during pooling');
    }
    if (m.cb_before > 0 && m.cb_after < 0) {
      throw new Error('Surplus ship became negative after pooling');
    }
  }

  return res;
}
