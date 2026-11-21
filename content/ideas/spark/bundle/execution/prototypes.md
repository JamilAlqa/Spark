# Prototypes

## v0 — static design references (June 2026)

`spark.html` and `prototype.html`: single-file explorations that locked the design language — warm paper background, one orange accent, hairline borders, all expressiveness pushed into per-idea palettes and motifs. Kept as references, not part of the app.

## v1 — read-only gallery (June 2026)

Next.js 14 app: home page with drag-scroll gallery rail, idea pages with overview / changes / discussion tabs. Ideas are local bundles on disk (`content/ideas/<slug>/`) — the filesystem is the data layer, deliberately, so the bundle format gets proven before any database exists.

## v1.1 — real bundles (June 2026)

The `files` array became a real `bundle/` directory per idea, following the bundle spec. The idea page grew a Bundle tab: file tree plus rendered markdown. Spark's own bundle is the first conforming instance — this file is inside it.

## Failures worth recording

- An early feed-first layout made Spark feel like a social network with attachments. Reversed: the idea page is the spine; the feed only points at it.
