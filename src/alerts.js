import { selectMetrics } from './filter.js';
export function evaluateRules(rows,rules) {
  if (!Array.isArray(rules)) throw new TypeError('rules must be an array');
  const alerts=[];
  for (const rule of rules) {
    if (!rule || !['gt','gte','lt','lte'].includes(rule.operator) || !Number.isFinite(rule.threshold)) throw new TypeError('Invalid rule');
    const match={gt:v=>v>rule.threshold,gte:v=>v>=rule.threshold,lt:v=>v<rule.threshold,lte:v=>v<=rule.threshold}[rule.operator];
    for (const row of selectMetrics(rows,{product:rule.product,metric:rule.metric,source:rule.source})) if (match(row.value)) alerts.push({rule:rule.name ?? rule.metric,product:row.product,date:row.date,value:row.value,source:row.source});
  }
  return alerts;
}
