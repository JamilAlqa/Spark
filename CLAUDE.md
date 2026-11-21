# Spark

The public record for ideas — a platform where every idea (product, research, concept, conversation) gets a living page with versioned history, demos, trials, team, and an executable context bundle. Forks carry lineage. Credit, not exclusivity.

See `spark-concept.md` for the full framework and decision history.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind v3. No database yet — ideas are local bundles.

## Architecture

- `content/ideas/<slug>/idea.json` — the manifest (platform metadata: palette, motif, team, stats, commits). This IS the data layer; `lib/ideas.ts` reads it at build/request time. Adding an idea = adding a folder.
- `content/ideas/<slug>/bundle/` — the context bundle: real markdown in the standard layout (`README.md`, `concept/`, `orchestration/`, `execution/`, `agents/`). Canonical spec lives in Spark's own bundle: `content/ideas/spark/bundle/orchestration/bundle-spec.md`. README mandatory; spaces are convention; idea types weight the spaces differently.
- `lib/bundle.ts` — `getBundle(slug)` walks the bundle dir into a tree + file map; `BUNDLE_SPACES` defines canonical order.
- `lib/repo.ts` — `getRepoActivity(repo)` pulls commits for an idea's optional `repo` link (manifest field): `local: true` reads this working copy via git; otherwise GitHub API (5-min revalidate, degrades to null silently). Shown as "Code activity" under Changes + a Repository side-block. Spark's own idea links this repo.
- NEVER run `npm run build` while the dev server is running — they share `.next` and the build corrupts the dev server's chunks (silent hydration failure). Stop the server or build first.
- `types/idea.ts` — the Idea and Bundle shapes. Change them here first.
- `app/page.tsx` — home: hero + gallery rail. `app/idea/[slug]/page.tsx` — idea page.
- `components/Rail.tsx` (client: drag-scroll gallery), `IdeaTabs.tsx` (client: overview/bundle/changes/discussion), `BundleBrowser.tsx` (client: file tree + doc pane), `Markdown.tsx` (minimal renderer, no deps; styled via `.doc` in globals.css), `Motif.tsx` (per-idea SVG line drawings), `Nav.tsx`.

## Design rules (locked)

- Warm paper bg `#FBFAF7`, one orange accent `#F4571F`, hairline borders `#E8E6DF`.
- Type scale: only `.t-display .t-section .t-title .t-body .t-meta .t-label` (globals.css). No ad-hoc sizes.
- The interface stays quiet; ALL expressiveness lives in per-idea palettes + motifs (defined in each idea.json). Idea pages inherit their card's palette via the hero band.
- No emojis in UI — SVG line icons only.
- `spark.html` / `prototype.html` are static design references, not part of the app.

## Conventions

- Future: split `desc` into `story.md` per bundle; the manifest `commits` should eventually derive from `orchestration/decisions.md`.
- Savour's content is placeholder — Jamil to supply the real pitch (its bundle files are marked *Placeholder*).
