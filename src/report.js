import { summarize } from './aggregate.js';
import { completeness, freshness } from './quality.js';
export function buildReport(rows,{from,to,asOf=to}={}) {
  if (!from || !to) throw new TypeError('Report requires from and to');
  const groups=[...new Set(rows.map(r=>JSON.stringify([r.product,r.metric,r.unit])))].map(v=>JSON.parse(v));
  return {period:{from,to},entries:groups.map(([product,metric,unit])=>({product,metric,unit,summary:summarize(rows,{product,metric,from,to}),freshness:freshness(rows,{product,metric,asOf}),completeness:completeness(rows,{product,metric,from,to})}))};
}
