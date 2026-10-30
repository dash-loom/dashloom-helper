# dashloom-helper

A standalone **JavaScript analytics toolkit** for product KPI work inspired by the Dashloom dashboard use cases (traffic, revenue, subscriptions, delivery health). This is **not** an official Dashloom integration. The exact npm API of a package named `dashloom` could not be independently verified, so no calls to an undocumented package are made.

No HTTP server, command polling, agent, operating-system branches, downloads, or remote code execution.

## Features

- Strict normalization and validation of timestamped metric observations
- Deterministic aggregation of daily metrics and date-window comparisons
- Revenue, traffic, engagement, and operations KPIs
- Configurable threshold-based alerts and confidence-aware anomaly flags
- Source-aware metric summaries, freshness, and completeness checks
- Offline JSON and CSV import/export, a CLI, tests, and GitHub CI

## Requirements

Node.js 20+; no runtime dependencies.

## Quick start

```bash
npm test
npm run demo
node src/cli.js summarize fixtures/product-metrics.json --metric revenue --from 2026-10-01 --to 2026-10-07
node src/cli.js report fixtures/product-metrics.json --from 2026-10-01 --to 2026-10-07
```

```js
import { normalizeMetrics, summarize, comparePeriods, detectAnomalies } from './src/index.js';
const rows = normalizeMetrics([{ product:'site', metric:'revenue', date:'2026-10-01', value:150, source:'stripe', unit:'USD' }]);
console.log(summarize(rows, { metric:'revenue' }));
```

## Data contract

Each observation is `{ product, metric, date, value, source, unit? }`. `date` must be an ISO UTC calendar date (`YYYY-MM-DD`); `value` must be finite. Each row represents one additive daily observation per `product/metric/date/source` key. Distinct source contributions are added together; do not import duplicative measurements from multiple systems unless intended. Units/currencies cannot be mixed within one metric summary.

## Dashloom relationship

This repository tackles analytic preparation, KPI calculations and quality checks relevant to Dashloom's published use cases. There is no assertion of compatibility with an unpublished npm package API. Before implementing an adapter, verify the exact npm package URL and exported symbols.

## Layout

`src/` library, `types/` TypeScript declarations, `fixtures/` examples, `examples/` runnable sample, `tests/` unit tests, `docs/` design guides, `.github/` CI and issue templates.

## License

MIT.
