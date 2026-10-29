# Run comparison 

**Limit:** Codex drafted both outputs in the same session on October 27, 2026. These are two instruction-set trials on identical source text, not two independent agent sessions or Dakota's own evaluation.

## The two runs

| | Project 2 step trial | Proposed agent trial |
|---|---|---|
| Saved output | [[outputs/p2-run-stress-notes.md]] | [[outputs/agent-run-stress-notes.md]] |
| Input | `inputs/stress-test-notes.md` | The same file |
| Instructions | `Project 2/03-build-guide.md` | `workflow-agent.md` plus `study-guide-steward` skill |

## Observable differences

Both outputs preserve the A/B definition conflicts, C/D assignment conflict, and missing total in E. Neither calculates a percentage. The agent trial adds an explicit **uncertainty triage table** that maps each issue to evidence and the information needed to resolve it. It also says more directly that the fifth quiz question must be answerable without picking a side.

## Better or worse — AI observation, not Dakota's call

The agent trial is easier to audit because the conflict map is explicit. It is longer, though, and could be excessive for short, clean notes. Dakota has not yet chosen which version to keep or whether the added table is worth its length.

## Next proposed edit

Make the conflict table conditional: include it when two or more unresolved issues materially affect the questions; otherwise use a short Things to check list. Dakota must decide whether to make this change after reading both outputs.
