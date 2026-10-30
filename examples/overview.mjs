import { readFileSync } from 'node:fs';
import { normalizeMetrics, comparePeriods, conversionRate, buildReport } from '../src/index.js';
const rows=normalizeMetrics(JSON.parse(readFileSync(new URL('../fixtures/product-metrics.json',import.meta.url),'utf8')));
console.log('Revenue growth:',comparePeriods(rows,{metric:'revenue',previous:{from:'2026-10-01',to:'2026-10-03'},current:{from:'2026-10-04',to:'2026-10-06'}}));
console.log('Conversion %:',conversionRate(12,300));
console.log('Report:',JSON.stringify(buildReport(rows,{from:'2026-10-01',to:'2026-10-07'}),null,2));
