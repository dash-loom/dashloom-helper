import test from 'node:test'; import assert from 'node:assert/strict';
import {assertDate,normalizeMetrics,MetricValidationError} from '../src/index.js';
test('accepts leap date',()=>assert.equal(assertDate('2024-02-29'),'2024-02-29'));
test('rejects invalid date',()=>assert.throws(()=>assertDate('2026-02-30'),MetricValidationError));
test('rejects duplicated observation',()=>assert.throws(()=>normalizeMetrics([{product:'x',metric:'y',source:'s',date:'2026-01-01',value:1},{product:'x',metric:'y',source:'s',date:'2026-01-01',value:2}]),MetricValidationError));
test('requires finite numbers',()=>assert.throws(()=>normalizeMetrics([{product:'x',metric:'y',source:'s',date:'2026-01-01',value:Infinity}]),MetricValidationError));
