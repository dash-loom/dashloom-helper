import test from 'node:test'; import assert from 'node:assert/strict';
import {normalizeMetrics,summarize,dailyTotals,comparePeriods,MetricValidationError} from '../src/index.js';
const rows=normalizeMetrics([{product:'x',metric:'revenue',date:'2026-01-01',value:10,unit:'USD',source:'a'},{product:'x',metric:'revenue',date:'2026-01-02',value:15,unit:'USD',source:'a'},{product:'x',metric:'revenue',date:'2026-01-03',value:20,unit:'USD',source:'a'}]);
test('summary',()=>assert.equal(summarize(rows,{metric:'revenue'}).total,45));
test('daily groups',()=>assert.equal(dailyTotals(rows).length,3));
test('compare',()=>assert.equal(comparePeriods(rows,{metric:'revenue',previous:{from:'2026-01-01',to:'2026-01-01'},current:{from:'2026-01-02',to:'2026-01-02'}}).percentageChange,50));
test('reject currency mixing',()=>assert.throws(()=>summarize([...rows,{...rows[0],unit:'EUR',date:'2026-01-04'}]),MetricValidationError));
