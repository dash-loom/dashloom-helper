import { MetricValidationError } from './errors.js';
const DATE = /^\d{4}-\d{2}-\d{2}$/;
export function assertDate(date) {
  if (typeof date !== 'string' || !DATE.test(date) || new Date(`${date}T00:00:00Z`).toISOString().slice(0,10) !== date) throw new MetricValidationError(`Invalid ISO date: ${date}`);
  return date;
}
export function validateMetric(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new MetricValidationError('Observation must be an object');
  for (const key of ['product','metric','source']) if (typeof input[key] !== 'string' || !input[key].trim()) throw new MetricValidationError(`${key} must be a non-empty string`);
  assertDate(input.date);
  if (typeof input.value !== 'number' || !Number.isFinite(input.value)) throw new MetricValidationError('value must be a finite number');
  if (input.unit !== undefined && (typeof input.unit !== 'string' || !input.unit.trim())) throw new MetricValidationError('unit must be a non-empty string');
  return {product:input.product.trim(), metric:input.metric.trim(), source:input.source.trim(), date:input.date, value:input.value, unit:input.unit ?? 'count'};
}
