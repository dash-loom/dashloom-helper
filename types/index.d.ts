export interface Metric { product:string; metric:string; date:string; value:number; source:string; unit?:string }
export interface Summary { count:number; total:number; average:number|null; min:number|null; max:number|null; unit:string|null; sources:string[]; firstDate:string|null; lastDate:string|null }
export declare class MetricValidationError extends Error {}
export declare function assertDate(date:string):string;
export declare function validateMetric(input:Metric):Required<Metric>;
export declare function normalizeMetrics(input:Metric[]):Required<Metric>[];
export declare function selectMetrics(rows:Metric[],options?:Record<string,string>):Metric[];
export declare function summarize(rows:Metric[],options?:Record<string,string>):Summary;
export declare function dailyTotals(rows:Metric[],options?:Record<string,string>):{date:string;unit:string;value:number}[];
export declare function comparePeriods(rows:Metric[],options:{current:{from:string;to:string};previous:{from:string;to:string};product?:string;metric?:string;source?:string}):{previous:Summary;current:Summary;absoluteChange:number;percentageChange:number|null};
export declare function safeRatio(a:number,b:number,options?:{percent?:boolean}):number|null;
export declare function conversionRate(conversions:number,visits:number):number|null;
export declare function refundRate(refunds:number,gross:number):number|null;
export declare function errorRate(errors:number,requests:number):number|null;
export declare function revenuePerUser(revenue:number,users:number):number|null;
export declare function netRevenue(gross:number,refunds:number):number;
export declare function freshness(rows:Metric[],options:{asOf:string;product?:string;metric?:string;source?:string}):{latestDate:string|null;daysOld:number|null};
export declare function completeness(rows:Metric[],options:{from:string;to:string;product?:string;metric?:string;source?:string}):{expectedDays:number;observedDays:number;coveragePercent:number};
export declare function detectAnomalies(rows:Metric[],options?:{threshold?:number;minBaseline?:number;product?:string;metric?:string;source?:string}):object[];
export declare function evaluateRules(rows:Metric[],rules:object[]):object[];
export declare function buildReport(rows:Metric[],options:{from:string;to:string;asOf?:string}):object;
export declare function toCsv(rows:Metric[]):string;
export declare function fromJson(text:string):Metric[];
