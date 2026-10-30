import test from 'node:test'; import assert from 'node:assert/strict';
import {conversionRate,errorRate,refundRate,netRevenue,safeRatio} from '../src/index.js';
test('conversion',()=>assert.equal(conversionRate(2,10),20));
test('errors',()=>assert.equal(errorRate(1,100),1));
test('refunds',()=>assert.equal(refundRate(5,100),5));
test('net',()=>assert.equal(netRevenue(100,5),95));
test('zero',()=>assert.equal(safeRatio(1,0),null));
