# Project 3 — study-guide agent

**Current status (October 27, 2026):** The agent, rules, skill, comparison, preliminary trials, disclosure, and defense notes are filled in and connected. They are **AI-assisted proposals**, not independently written student decisions or a verified separate-session agent run.

## Quick path

1. **Why and what changed:** [Audit note](audit-note.md) and [intent statement](intent-statement.md) (the intent is retrospective, not pre-build).
2. **Agent design:** [Workflow agent](workflow-agent.md), [vault agent](vault-agent/AGENTS.md), [hard rules](vault-agent/hard-rules.md), and [study-guide skill](vault-agent/skills/study-guide-steward/SKILL.md).
3. **Evidence and limits:** [Run comparison](run-comparison.md), [testing log](testing-log.md), and [saved outputs](outputs/README.md).
4. **Present:** [Defense notes](defense-notes.md) and [disclosure](disclosure.md).

**Still yours to do:** Review/rewrite the five rules in your words, check guide accuracy, test the connected skill in a fresh Codex session, and record your final keep/change/reject decision. Do not describe the current controlled drafts as independent runs.

The original assignment guidance is below. The full brief is on the course site: [Project 3, Extend and Encode](https://ai-101-v4.vercel.app/projects/project-3).

## Your tool: Codex

Use Codex for the audit, workflow-agent runs, and vault-agent tests. Obsidian is where you organize and view the Markdown and Canvas files. Completed skills belong in `.agents/skills/` at the vault root; Codex instructions belong in the root `AGENTS.md`. Finish the agent and rules before connecting them. The packet's `vault-agent/CLAUDE.md` is an unused compatibility stub.

## Original packet import directions (already done)

1. Unzip the packet.
2. Drag the `project-03` folder into your Obsidian vault, next to your `project-02` folder.
3. Open this file in Obsidian.

## Your files

| Class | File | What you do |
|---|---|---|
| 9 | `audit-note.md` | Stress-test your Project 2 workflow. Fix one thing. Write what you learned. |
| 10 | `intent-statement.md` | Say what you are building and why, before you build. |
| 10 | `workflow-agent.md` | Part A. Write the agent file. Save a copy in your Project 2 folder as `agents/[role].md`. |
| 10 | `run-comparison.md` | Compare your Project 2 run to your agent run. Save both in `outputs/`. |
| 11 | `vault-agent/AGENTS.md` | Part B. Name the agent's identity, permissions, and limits. |
| 11 | `vault-agent/voice-profile.md` | Five lines, written from scratch. |
| 11 | `vault-agent/hard-rules.md` | Five rules in your own words. One is a teaching rule. |
| 11 | `vault-agent/skills/study-guide-steward/SKILL.md` | Encodes the Project 2 workflow, including uncertainty triage. The `skill-name/` folder is an unused superseded template. |
| 11 | `testing-log.md` | Log the caught-violation demo and the fresh-input test. |
| 9 to 12 | `ai-use-log.md` | Log every prompt, output, and decision. |
| 12 | `defense-notes.md` | Plan your live defense. |
| 12 | `disclosure.md` | State what AI contributed and what you decided. |

Before submitting, replace any remaining personal judgments with your own words and keep the AI contribution disclosed. The original packet asked for a pre-build intent; the current intent file truthfully labels itself retrospective.

## Submit

Keep these file names while you work. When you submit, rename each file to `AI101_P3_[Last]_[First]_[Artifact].ext`. Rename inside Obsidian so your links update. Push the folder to the GitHub repository you share with the instructor. If GitHub is not available to you, ask for the approved equivalent channel.

## Privacy

Use only material you have permission to share. Do not put grades, finances, health information, or anyone else's personal information in this folder.
