import { normalizeMetrics } from './normalize.js';
export function toCsv(rows) {
 const cols=['product','metric','date','value','source','unit'];
 const escape=v=>{const s=String(v ?? ''); return /[",\n\r]/.test(s)?`"${s.replaceAll('"','""')}"`:s;};
 return [cols.join(','),...rows.map(r=>cols.map(c=>escape(r[c])).join(','))].join('\n')+'\n';
}
// Parsing CSV is intentionally omitted: use JSON for untrusted inputs; no partial parser is presented as RFC-compliant.
export function fromJson(text) { return normalizeMetrics(JSON.parse(text)); }
