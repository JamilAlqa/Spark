# Agent instructions

This is a research bundle. When extending it:

- New experiments go in `../execution/trials/` as `batch-NN.md`, following the existing format: substrate, dates, density, result, next step. Failures are published with the same rigor as successes.
- Protocol changes bump the version in `../execution/protocol.md` and get a decision entry explaining what data motivated them.
- Forks testing regional substrates should change only the substrate variables, so results stay comparable across the lineage.
