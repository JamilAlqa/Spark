# Agent instructions

Building Motive from this bundle:

- Editorial first — never add transactional UI (bids, prices, countdowns) unless the roadmap stage explicitly calls for it.
- Every car is an instance of the shared car type; extend the type before adding ad-hoc fields.
- Collections are curated sets with their own palette; the platform chrome stays neutral.
- The code lives in a separate repo; this bundle holds the intent. Log direction changes in `../orchestration/decisions.md`.
