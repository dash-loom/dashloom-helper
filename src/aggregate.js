import { selectMetrics } from './filter.js';
import { MetricValidationError } from './errors.js';
export function summarize(rows, options={}) {
  const chosen = selectMetrics(rows, options);
  const units = [...new Set(chosen.map(r => r.unit))];
  if (units.length > 1) throw new MetricValidationError('Cannot aggregate different units/currencies');
  const total = chosen.reduce((n,r) => n+r.value,0);
  return {count:chosen.length,total,average:chosen.length ? total/chosen.length : null,min:chosen.length ? Math.min(...chosen.map(r=>r.value)) : null,max:chosen.length ? Math.max(...chosen.map(r=>r.value)) : null,unit:units[0] ?? null,sources:[...new Set(chosen.map(r=>r.source))].sort(),firstDate:chosen[0]?.date ?? null,lastDate:chosen.at(-1)?.date ?? null};
}
export function dailyTotals(rows, options={}) {
  const chosen=selectMetrics(rows, options); const grouped=new Map();
  for (const row of chosen) { const key=JSON.stringify([row.date,row.unit]); grouped.set(key,(grouped.get(key) ?? 0)+row.value); }
  return [...grouped].map(([key,value])=>{ const [date,unit]=JSON.parse(key);return {date,unit,value}; }).sort((a,b)=>a.date.localeCompare(b.date));
}
