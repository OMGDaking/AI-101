# audit-note.md

Status: AI-assisted record updated October 20, 2026 after the user requested an input-rule fix and rerun. The pasted-text input test, fix, and same-input rerun are recorded below. Human accuracy review and the separate missing/conflicting-facts stress test remain pending. The workflow-agent draft was created before this audit was completed.

## The workflow I audited

Project 2 — Document-to-study-guide workflow. It turns an attached document, selected file, or pasted source text into important notes, quiz questions, and practice questions so the user can study the source.

## The stress test

The user pasted “Data Analyst Career Paths — Study Notes” into chat and requested a workflow test. This tested a source channel that the original input rule did not explicitly allow: pasted text rather than an attachment or selected file. The user then requested that the rule permit all three input forms and that the exact same notes be rerun.

A separate fictional input, `inputs/stress-test-notes.md`, contains missing information and conflicting claims. No saved run of that separate stress-test input is available in `outputs/`.

## What happened

On the first run, Codex accepted the pasted notes and returned important notes, five short-answer quiz questions, three application practice questions, and items to check in chat. Its source line began: “Source: Your pasted study notes. I can’t tell whether they are the complete course material...” No output file was saved because no output location had been selected. The user subsequently said, “seems that it worked.” This is general feedback, not an item-by-item accuracy check.

The first-run guide was usable, but the written input rule did not explicitly authorize pasted source text. `Project 2/00-start-here.md` and `01-gather-input.md` described attachments or selected files. A future run could therefore ask for a file unnecessarily or apply the rule inconsistently.

## The fix

On October 20, 2026, Codex changed the source-input wording in `Project 2/00-start-here.md` and `01-gather-input.md` to allow **one readable attached document, one explicitly selected file, or one clearly identified block of pasted source text**. The rule still requires clarification if the source is missing, unreadable, or ambiguous, or if multiple possible sources lack a clear selection. Supporting wording in `02-organize-source.md`, `03-build-guide.md`, `README.md`, and the unconnected `project-03/workflow-agent.md` was aligned so these files do not contradict the input rule. No source material was changed.

Earlier, at the user's explicit request, Codex redesigned the workflow to deliver notes, quiz questions, and application practice together. The prior directions are preserved in `Project 2/revisions/before-document-guide-2026-10-20/`. That redesign preceded this preliminary test and is not evidence of an audit-driven fix.

## What the fix changed

Codex reran the same pasted notes under the revised rule and saved the new guide at [[project-03/outputs/data-analyst-career-paths-rerun.md]]. The rerun explicitly identifies the source as text pasted in chat, keeps the source-completeness caveat, and again gives important notes, five quiz questions, three application questions, and things to check. Unlike the first run, the guide is now saved at the user's requested location. The change establishes clear permission and handling for pasted input; it does **not** demonstrate that the guide's factual quality improved. No human accuracy check or recall practice is claimed.

## What I learned about my workflow

AI observation for the user to revise: Step 1's source-intake wording was weaker than the guide-generation step. It worked by inference on the first run, but explicit rules make it clearer when the model should proceed and when it should ask which source to use. The user's own reflection on what was learned remains pending.

## Preliminary test observation — October 20, 2026

The user pasted “Data Analyst Career Paths — Study Notes” in chat and called it a workflow test. Codex treated that text as the selected source and delivered a study guide in chat. This exposed the input-rule ambiguity that the later fix above addressed. The first-run guide remains in the conversation rather than as a saved file; the rerun is saved in `outputs/`. The user's accuracy check is still pending.
