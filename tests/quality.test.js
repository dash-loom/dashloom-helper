import test from 'node:test'; import assert from 'node:assert/strict';
import {normalizeMetrics,completeness,freshness,detectAnomalies,evaluateRules,buildReport} from '../src/index.js';
const rows=normalizeMetrics([1,2,3,4,5,6,7].map(i=>({product:'p',metric:'errors',date:`2026-01-0${i}`,value:i===7?100:i,source:'cloud'})));
test('coverage',()=>assert.equal(completeness(rows,{from:'2026-01-01',to:'2026-01-07'}).coveragePercent,100));
test('freshness',()=>assert.equal(freshness(rows,{asOf:'2026-01-09'}).daysOld,2));
test('flags anomaly',()=>assert.equal(detectAnomalies(rows,{minBaseline:5}).length,1));
test('rules',()=>assert.equal(evaluateRules(rows,[{metric:'errors',operator:'gt',threshold:10}]).length,1));
test('report',()=>assert.equal(buildReport(rows,{from:'2026-01-01',to:'2026-01-07'}).entries.length,1));
