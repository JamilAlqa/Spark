# Spark — Concept Framework

*v0.1 — June 2026*

## One-liner

**The public record for ideas.** A social platform where ideas — products, research, concepts, conversations — get their own living page, and where publishing openly *protects* your claim to an idea instead of risking it.

## Thesis

GitHub solved trust for code with three mechanics: timestamped public history, a permanent attribution graph, and forking that preserves lineage. As AI compresses the distance between idea and output, code becomes a middle layer — the idea and its provenance become the scarce, valuable artifact. Spark is GitHub for ideas: sharing first is proof of priority, not exposure to theft.

This inverts the default fear. Today, people sit on ideas because sharing feels risky. On Spark, the timestamped public page *is* your receipt (the same logic as defensive publication in patent law). The earlier and more openly you share, the stronger your claim.

**Ideas as executable artifacts.** In AI-era development, the upstream layer — prompts, instruction files, concept roadmaps, specs — is the new source code. A Spark page isn't a brochure; it's a context bundle an agent can execute. Fork an idea, clone its bundle into Claude Code or similar, and instantiate the project. GitHub stores the output layer (code); Spark stores the intent layer. This also makes merging real: contributions are concrete diffs on spec files, not vague suggestions.

**The orchestration layer is homeless.** Even the most technical projects (an AI model: weights, parameters, layer architecture) keep their artifacts in GitHub — but the *orchestration* of the product — why this architecture, what to try next, how pieces compose — happens on whiteboards and scattered external docs with no public, versioned home. That layer is what survives commoditization: when anyone can generate a codebase, the differentiating record is the sequence of decisions that shaped it. And every idea has this layer, not just tech: a restaurant concept, a research program, a documentary. Code was one execution medium among many; Spark is the home for the layer above all execution media. People build ideas collaboratively and visibly on Spark; codebases are the commodity output.

**Architecture: provenance spine, social skin.** The versioned idea page is the spine; the feed is a distribution layer showing events *from* pages (new trial, fork, merged contribution, team member). Social energy flows back into the durable artifact instead of evaporating. Discipline: provenance machinery never appears at posting time — creating a spark is as easy as a tweet (title + paragraph), with structure (bundle, trials, team) growing as the idea matures.

## What Spark is not

- Not a launch leaderboard (Product Hunt, BetaList) — no launch "moment," no upvote race
- Not investor matchmaking — exposure to capital is incidental, not the purpose
- Not a personal portfolio site (Peerlist, Read.cv) — the idea, not the person, is the first-class object
- Not academia-only (ResearchHub) — research is welcome, but so are products, art, and half-formed concepts

## Core objects

### 1. The Idea Page (a "Spark")

The atomic unit. Every idea gets a rich, living page:

- **Pitch** — title, summary, the problem or question it addresses
- **Story** — long-form description with visuals, embeds, demos
- **Trials** — experiments, prototypes, results, failures (progress log, not press release)
- **Team** — who's building it, their roles, open roles if recruiting
- **Timeline / versions** — every edit is versioned and timestamped; history is public and immutable. This is the provenance layer.
- **Lineage** — what this idea forked from, and what has forked from it
- **Type** — product, research, concept, or conversation (types shape the page template: research gets methods/findings sections, products get demos/trials, concepts get open questions)
- **Context bundle** (optional) — the executable core: vision.md, roadmap.md, instruction files (CLAUDE.md / AGENTS.md conventions), prompts, trial logs. Structured text artifacts that diff, merge, and fork like code — and that an AI agent can consume to instantiate the project.

### 2. Profiles

People and teams. A profile is the union of contributions: ideas started, ideas contributed to, forks created. Credibility comes from the attribution graph, not follower counts.

### 3. The Feed

**Activity-based**: ideas surface when something happens — a new trial result, a version update, a team member joining, a fork. Rewards ongoing progress over launch hype. Filterable by type and topic. (Follow-based personalization layers on later, once there's critical mass.)

## Interactions

1. **Comments & discussion** — threaded conversation on every page; the social fabric
2. **Structured contributions** — propose an addition (an experiment, a resource, a section edit) that the team accepts or declines; accepted contributions are permanently credited on the page, PR-style
3. **Join the team** — ideas list open roles; people apply or get invited
4. **Forking / remixing** — anyone can spin off a variant. Forks *must* link to the parent; lineage is displayed on both pages. This makes attribution enforceable by norm and by structure.

## The attribution system (the moat)

- **Timestamped versions** — every page state is hashed and timestamped at publish; you can always prove what you said and when
- **Contribution ledger** — every accepted contribution, comment that gets incorporated, and team membership is recorded and credited
- **Fork lineage** — derivative ideas carry their ancestry visibly and permanently
- **Norms layer** — a simple license-like declaration per idea ("open to forks," "open to contributions," "watching only") sets expectations without legal machinery

**Credit, not exclusivity.** Attribution on Spark is a record of who said and did what, when — not a claim of ownership beyond what's legally applicable. Multiple people can pursue the same idea; that's a feature. What differentiates them is the surrounding environment — team, activity, progress — which is exactly what Spark is built to surface and encourage. Idea-squatting is therefore a non-issue: a page with no execution behind it is just a timestamp, and the feed's activity-weighting leaves it invisible.

## MVP scope

Smallest version that proves the thesis:

1. Idea pages with pitch, story, team, and versioned/timestamped edit history
2. Activity feed (chronological, filterable by type)
3. Profiles auto-built from the attribution graph
4. Comments
5. Forking with mandatory lineage links

Deferred: structured contributions (PR flow), open roles/applications, follow-based feed, cryptographic timestamping, search/topics taxonomy.

## Open questions

- **Naming the unit** — is an idea page a "spark"? Does a fork have its own name ("ember," "branch")?
- **Quality vs. openness** — how to keep the feed alive without upvotes? (Possible: activity-weighting + lightweight curation)
- **Identity** — real names required for attribution to mean anything? Pseudonyms with persistent reputation?
- **Moderation** — conversations and concepts invite debate; what are the norms?

## Competitive landscape (June 2026)

| Platform | Focus | Gap Spark fills |
|---|---|---|
| Product Hunt / BetaList | Launch-day exposure for products | No living page, products only, leaderboard dynamics |
| WIP.co / Indie Hackers | Maker accountability & forum | Person/feed-centric; idea has no first-class page |
| Peerlist | Professional profiles for builders | Portfolio of the person, not the idea |
| ResearchHub | Open science, peer review | Academia-flavored, token-incentivized, not general |
| GitHub | Code provenance & collaboration | Code-centric; ideas without repos have no home |
