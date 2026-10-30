import { summarize } from './aggregate.js';
export function comparePeriods(rows, { current, previous, ...options }) {
  if (!current?.from || !current?.to || !previous?.from || !previous?.to) throw new TypeError('current and previous need from/to');
  const before=summarize(rows,{...options,...previous}); const after=summarize(rows,{...options,...current});
  if (before.unit && after.unit && before.unit!==after.unit) throw new TypeError('Periods have incompatible units');
  const absoluteChange=after.total-before.total;
  return { previous:before, current:after, absoluteChange, percentageChange:before.total===0 ? null : absoluteChange/before.total*100 };
}
