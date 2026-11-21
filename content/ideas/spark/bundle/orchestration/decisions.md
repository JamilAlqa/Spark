# Decision log

Newest first. Reversals get a new entry; nothing is rewritten.

## 2026-06-10 — Linked repositories: page ↔ repo, intent ↔ execution

An idea can declare a `repo` link to its GitHub project. The page then shows the repository in the side rail and pulls its commit stream into the Changes tab as "Code activity" — kept visually separate from the idea's own decision history, because they are different layers. Spark's page links to Spark's repo, so working on this codebase is visible on its own idea page.

## 2026-06-10 — Standard bundle layout: four spaces

Bundles get a fixed top-level shape (`README.md`, `concept/`, `orchestration/`, `execution/`, `agents/`) instead of free-form file lists. Replaces the v0 approach where each idea declared an arbitrary `files` array. Predictability is what makes bundles forkable and mergeable — the same reason GitHub's `README`/`LICENSE` conventions matter. See `bundle-spec.md`.

## 2026-06-10 — Decision log promoted to first-class element

The orchestration record — why this architecture, what to try next — is the layer that survives commoditization. It moves from scattered commit messages into `orchestration/decisions.md`.

## 2026-06 — Context bundles: ideas as executable artifacts

A Spark page is a context bundle an agent can execute, not a brochure. This is what separates Spark from portfolio and launch sites.

## 2026-06 — Credit, not exclusivity

Attribution records who said what, when — it is not an ownership claim. Resolves the idea-squatting concern: a page with no execution is just a timestamp, and activity-weighting keeps it invisible.

## 2026-06 — No launch moment, no upvotes

The feed is activity-based: ideas surface when something happens (trial, fork, merge, team change). Rejects Product Hunt leaderboard dynamics — rewards ongoing progress over launch hype.
