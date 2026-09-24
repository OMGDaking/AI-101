# Start Here: Vault Sync Workflow

## Goal

Back up my Obsidian vault to my private GitHub repository on a schedule, so I never lose my notes and my instructor can see my work.

## How to Use This Folder

1. Read `process-map.canvas` to see the steps in order.
2. Follow the step files in order: `01-trigger.md` through `05-human-check.md`.
3. On a scheduled run, steps 1–4 happen in order without pausing for approval between steps. After the run, I review the result using `05-human-check.md`.
4. If we are walking through the workflow together to learn or troubleshoot it, explain each step and pause before moving to the next one.

## Rules

- The repository must stay private. Never make it public.
- Only sync files inside my vault folder. Do not touch anything else on my computer.
- If a scheduled run cannot safely continue, stop and report the problem instead of guessing or forcing a push. When we are working together, ask me before making a repair.
- Explain what you did in plain language. I am not a programmer.
- Make sure to Explain step by step like a teacher i want to learn.

## What Stays My Decision

- How often the sync runs.
- Which repository it goes to.
- Whether the result is correct.
