# Architecture

The pipeline is **validate → normalize → select → aggregate → analyze → report**. Modules are pure functions, except the CLI which reads local files. There are no network calls or side effects in the analytics library.
