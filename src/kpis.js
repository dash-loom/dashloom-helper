export function safeRatio(numerator,denominator,{percent=false}={}) {
  if (![numerator,denominator].every(n=>typeof n==='number' && Number.isFinite(n))) throw new TypeError('Ratios require finite numbers');
  return denominator===0 ? null : (numerator/denominator)*(percent?100:1);
}
export function conversionRate(conversions,visits) { return safeRatio(conversions,visits,{percent:true}); }
export function refundRate(refunds,grossRevenue) { return safeRatio(refunds,grossRevenue,{percent:true}); }
export function errorRate(errors,requests) { return safeRatio(errors,requests,{percent:true}); }
export function revenuePerUser(revenue,users) { return safeRatio(revenue,users); }
export function netRevenue(grossRevenue,refunds) {
  if (![grossRevenue,refunds].every(n=>Number.isFinite(n))) throw new TypeError('Revenue must be finite');
  return grossRevenue-refunds;
}
