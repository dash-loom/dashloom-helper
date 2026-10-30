# Data model

Observations represent additive daily aggregates. Mixing distinct currencies is rejected by `summarize`. Cross-source double counting is the caller's responsibility. Rates are expressed in percent where named `Rate`, not proportions. Missing denominator yields `null`; missing observations never imply zero.
