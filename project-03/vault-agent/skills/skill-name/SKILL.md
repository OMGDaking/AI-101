---
name: [skill-name]
description: [One sentence: what the skill does and when to run it.]
---

# [Skill name]

*Rename the `skill-name` folder to match. Encode a workflow you performed and defended in Project 2. No generic "research agent" skills. Delete the italic guidance lines before you submit.*

## Purpose

[What this skill does for you, and which Project 2 workflow it comes from.]

## Workflow

1. **Load your rules.** Read `project-03/vault-agent/hard-rules.md` and `project-03/vault-agent/voice-profile.md`. Apply them in every step.
2. [Step from your Project 2 workflow]
3. [Step from your Project 2 workflow]
4. **Complex step:** [A step your Project 2 workflow could not do. It weighs options against your hard rules, loops until a check passes, or calls a human check mid-step.]
5. [Final step: write the result and one log line per decision]

*Keep step 1. The runnable copy of this skill sits in `.agents/skills/` in Codex, away from your rules, so the skill must load them itself. Write each path from the top of your vault, with your folder's real name.*

## Operating rules

- [A rule the skill never breaks]
- [Where it stops and asks you]
- [What it logs]
