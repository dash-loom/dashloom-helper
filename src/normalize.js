import { validateMetric } from './schema.js';
import { MetricValidationError } from './errors.js';
export function normalizeMetrics(input) {
  if (!Array.isArray(input)) throw new MetricValidationError('Expected an array of observations');
  const seen = new Set();
  return input.map(validateMetric).sort((a,b) => a.date.localeCompare(b.date)).map(row => {
    const key = JSON.stringify([row.product,row.metric,row.date,row.source]);
    if (seen.has(key)) throw new MetricValidationError(`Duplicate observation ${key}`);
    seen.add(key); return Object.freeze(row);
  });
}
