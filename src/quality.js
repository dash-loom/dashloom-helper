import { selectMetrics } from './filter.js';
import { assertDate } from './schema.js';
export function freshness(rows, {asOf, ...options}) {
  assertDate(asOf); const chosen=selectMetrics(rows,options);
  const last=chosen.reduce((v,r)=> r.date>v?r.date:v,'');
  return { latestDate:last || null, daysOld:last ? Math.floor((Date.parse(asOf+'T00:00:00Z')-Date.parse(last+'T00:00:00Z'))/86400000) : null };
}
export function completeness(rows, {from,to,...options}) {
  assertDate(from);assertDate(to);
  if (from>to) throw new RangeError('Invalid date range');
  const expected=Math.floor((Date.parse(to+'T00:00:00Z')-Date.parse(from+'T00:00:00Z'))/86400000)+1;
  const actual=new Set(selectMetrics(rows,{from,to,...options}).map(r=>r.date)).size;
  return {expectedDays:expected,observedDays:actual,coveragePercent:actual/expected*100};
}
