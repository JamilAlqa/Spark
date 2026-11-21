# The Spark bundle spec

Every Spark idea ships a context bundle with a standard layout — the way GitHub repos converged on `README`, `LICENSE`, `.github/`. A predictable shape is what makes bundles forkable, diffable, and executable by agents.

## Layout

```
bundle/
  README.md          the pitch — what this is and why, in one screen
  concept/           the thinking
    vision.md        thesis, problem, who it serves
    questions.md     open questions, unresolved tensions
  orchestration/     the steering
    roadmap.md       where it is going, in what order
    decisions.md     the decision log: what was chosen, what it replaced, why
  execution/         the doing
    trials, prototypes, results — including failures
  agents/            the executable layer
    AGENTS.md        instructions for an AI agent picking the idea up
    prompts/         reusable prompts that produce the project's artifacts
```

## Rules

1. **`README.md` is mandatory.** Everything else is convention, not enforcement — an idea grows into the layout as it matures.
2. **Spaces, not schemas.** Inside a space, files are free-form markdown. The structure lives in the directory layout so bundles diff and merge like code.
3. **Types shift the weight.** Research ideas live in `execution/` (protocols, trials, data). Concepts live in `concept/` and `orchestration/`. Products spread across all four. Conversations keep their merged summary in `execution/`.
4. **Decisions are append-only.** `orchestration/decisions.md` records what was decided and why, newest first. Reversals get a new entry — history is never rewritten.
5. **The bundle is the mergeable surface.** Contributions arrive as diffs on these files; the platform page (palette, team, stats) is metadata around it, not part of it.

## Why these four spaces

They are the lifecycle of any idea regardless of medium: why it should exist (*concept*), what to do about it and in what order (*orchestration*), what actually happened (*execution*), and how a machine can pick it up and continue (*agents*). Code, if any, lives downstream in a repo — the bundle links to it, never contains it.
