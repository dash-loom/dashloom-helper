import { dailyTotals } from './aggregate.js';
export function detectAnomalies(rows, {threshold=2.5,minBaseline=5,...options}={}) {
  if (!Number.isFinite(threshold) || threshold<=0 || !Number.isInteger(minBaseline) || minBaseline<2) throw new RangeError('Invalid anomaly options');
  const points=dailyTotals(rows,options); const flags=[];
  for (let i=minBaseline;i<points.length;i++) {
    const prior=points.slice(0,i).filter(p=>p.unit===points[i].unit).map(p=>p.value);
    if (prior.length<minBaseline) continue;
    const mean=prior.reduce((a,b)=>a+b,0)/prior.length;
    const variance=prior.reduce((a,b)=>a+(b-mean)**2,0)/prior.length;
    const sd=Math.sqrt(variance); const z=sd===0 ? (points[i].value===mean?0:null) : (points[i].value-mean)/sd;
    if (z!==null && Math.abs(z)>=threshold) flags.push({...points[i],baselineMean:mean,zScore:z});
  }
  return flags;
}
