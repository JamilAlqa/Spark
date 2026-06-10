# Spark

The public record for ideas — a platform where every idea (product, research, concept, conversation) gets a living page with versioned history, demos, trials, team, and an executable context bundle. Forks carry lineage. Credit, not exclusivity.

See `spark-concept.md` for the full framework and decision history.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind v3. No database yet — ideas are local bundles.

## Architecture

- `content/ideas/<slug>/idea.json` — one bundle per idea. This IS the data layer; `lib/ideas.ts` reads it at build/request time. Adding an idea = adding a folder.
- `types/idea.ts` — the Idea shape. Change it here first.
- `app/page.tsx` — home: hero + gallery rail. `app/idea/[slug]/page.tsx` — idea page.
- `components/Rail.tsx` (client: drag-scroll gallery), `IdeaTabs.tsx` (client: overview/changes/discussion), `Motif.tsx` (per-idea SVG line drawings), `Nav.tsx`.

## Design rules (locked)

- Warm paper bg `#FBFAF7`, one orange accent `#F4571F`, hairline borders `#E8E6DF`.
- Type scale: only `.t-display .t-section .t-title .t-body .t-meta .t-label` (globals.css). No ad-hoc sizes.
- The interface stays quiet; ALL expressiveness lives in per-idea palettes + motifs (defined in each idea.json). Idea pages inherit their card's palette via the hero band.
- No emojis in UI — SVG line icons only.
- `spark.html` / `prototype.html` are static design references, not part of the app.

## Conventions

- Future: split `desc` into `story.md` per bundle; commits become real decision-log entries.
- Savour's content is placeholder — Jamil to supply the real pitch.
