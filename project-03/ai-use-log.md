# ai-use-log.md

| Date | What I asked the model to do | What it produced | What I kept, changed, or rejected |
|------|------------------------------|------------------|------------------------------------|
| 2026-10-15 | Update tool instructions because I use Codex. | Codex-specific setup guidance in the packet, agent template, skill template, and disclosure example. | Changed tool directions at my request; no agent design, testing, or human decisions were completed. |
| 2026-10-20 | “can you make a note of missing infromation or conflicting facts” | Created `inputs/stress-test-notes.md`: fictional practice notes with conflicting definitions and assignment requirements, missing details, and an incomplete calculation. | Saved as an audit input; user review and the workflow stress test are pending. |
| 2026-10-20 | Clarified that the tool should take an attached document and create important notes, quiz questions, and practice questions; asked “can you change it to how i want it”. | Replaced the Project 3 workflow-agent template with an untested document-to-study-guide draft. Project 2 and the personal intent, voice, rules, and defense files were preserved. | User requested the direction change; review of the draft, question-count defaults, and answer-key preference is pending. No audit or test completion claimed. |
| 2026-10-27 | “can we finish the agent and can you fill it in i have no time just explain it to me” | Codex drafted the intent, rules, voice, agent files, skill, controlled same-source comparison, fresh-input trial, preliminary rule probe, defense notes, disclosure, and connections. | User requested completion under time pressure. Dakota's review, independent agent test, and keep/change/reject decision remain pending; no student-authored rules are claimed. |

## October 20, 2026 — Project 2 direction change

User explicitly requested changing Project 2 to document-to-guide behavior. Codex revised its current workflow and preserved prior directions in `Project 2/revisions/before-document-guide-2026-10-20/`. This is a user-directed redesign, not a completed Project 3 stress test or Part A agent connection. Implementation review and keep/change/reject decision are pending.

## October 20, 2026 — Pasted-notes workflow test

The user pasted “Data Analyst Career Paths — Study Notes,” said “this is a test for workflow,” and linked `audit-note.md`. Codex used the pasted notes as the source and returned the Project 2 study-guide sections in chat. It did not save an output file, edit the workflow, or claim a human check. The test exposed an instruction ambiguity: the workflow says to attach or select a document, but does not explicitly describe pasted source text. User review and any audit fix/rerun are pending.

## October 20, 2026 — Audit placeholders

The user said “seems that it worked” and requested filling placeholders. Codex filled the factual sections of `audit-note.md` using existing files, logs, and that feedback. Missing stress-test evidence, an applied fix, a rerun, and the user's personal reflection are explicitly marked pending. The user's intent, voice profile, hard rules, and defense were not written. Review of this audit record and its keep/change/reject decision remain pending.

## October 20, 2026 — Input-rule fix and same-notes rerun

The user requested that the input rule allow attached documents, selected files, or pasted text; that the same career-path notes be rerun; that the guide be saved in `project-03/outputs/`; and that changes be recorded in `audit-note.md`. Codex revised the Project 2 intake rule and aligned the unconnected `workflow-agent.md`, saved the rerun as `outputs/data-analyst-career-paths-rerun.md`, and updated the audit note. The rerun clarifies the pasted-text source and retains the same guide sections; it does not prove improved factual quality. Human review, the separate missing/conflicting-facts stress test, and keep/change/reject decisions remain pending.
