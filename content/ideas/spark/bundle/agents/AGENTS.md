# Agent instructions

You are instantiating **Spark** from its context bundle.

## Read first

1. `../README.md` — what this is
2. `../concept/vision.md` — the thesis; do not drift from it
3. `../orchestration/decisions.md` — settled decisions; do not relitigate them silently
4. `../orchestration/roadmap.md` — what to build next, in order

## Constraints

- The idea page is the first-class object. Feeds, profiles, and social mechanics always point back to a page.
- Provenance machinery never appears at posting time — creating a spark must stay as easy as a tweet. Structure grows as the idea matures.
- History is append-only and timestamped. Never build an edit path that rewrites it.
- Bundles follow `../orchestration/bundle-spec.md`. Enforce `README.md`; treat the rest as convention.

## Design (locked)

Warm paper `#FBFAF7`, single orange accent `#F4571F`, hairline borders `#E8E6DF`. The interface stays quiet; all expressiveness lives in per-idea palettes and motifs. No emojis in UI — SVG line icons only.

## When extending

Log every directional choice in `../orchestration/decisions.md` with what it replaced and why. That log is the product.
