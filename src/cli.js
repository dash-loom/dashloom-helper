#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {normalizeMetrics,summarize,buildReport,dailyTotals,toCsv} from './index.js';
const [action,filename,...rest]=process.argv.slice(2);
function parseFlags(args){const opts={};for(let i=0;i<args.length;i+=2){if(!args[i].startsWith('--') || !args[i+1])throw new Error('Expected --flag value pairs');opts[args[i].slice(2)]=args[i+1];}return opts;}
try {
 if(!['summarize','daily','report','csv'].includes(action) || !filename)throw new Error('Usage: dashloom-helper <summarize|daily|report|csv> <file.json> [--metric key --from date --to date]');
 const rows=normalizeMetrics(JSON.parse(readFileSync(filename,'utf8'))); const opts=parseFlags(rest);
 const result=action==='summarize'?summarize(rows,opts):action==='daily'?dailyTotals(rows,opts):action==='report'?buildReport(rows,opts):toCsv(rows);
 process.stdout.write(typeof result==='string'?result:JSON.stringify(result,null,2)+'\n');
} catch(error){console.error(error.message);process.exitCode=1;}
