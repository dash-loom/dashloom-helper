import { assertDate } from './schema.js';
export function selectMetrics(rows, { product, metric, source, from, to } = {}) {
  if (from) assertDate(from); if (to) assertDate(to);
  if (from && to && from > to) throw new RangeError('from must be <= to');
  return rows.filter(r => (product === undefined || r.product === product) && (metric === undefined || r.metric === metric) && (source === undefined || r.source === source) && (!from || r.date >= from) && (!to || r.date <= to));
}
