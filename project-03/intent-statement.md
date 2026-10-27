# Design intent — retrospective AI-assisted draft

**Important provenance:** Codex drafted this on October 27, 2026, after agent work had begun. It is not a pre-build statement in the student's own words. Dakota must review and revise it before presenting it as personal intent.

## What I am building

**Part A:** A study-guide agent for the guide-building step of my Project 2 workflow. It turns one attached document, selected file, or pasted source into important notes, quiz questions, and application practice.

**Part B:** A vault stewardship agent that keeps the guide traceable to its source, flags uncertainty, and stops before making my review or learning decisions for me.

## Why

I wanted a quicker way to turn study material into something I can practice with. The risk is accepting a polished guide or quiz answer without checking whether it matches the source. The agent should do the drafting while leaving accuracy checks and understanding to me.

## Project 2 workflow to encode

1. I choose one source.
2. The model identifies key material and uncertainties.
3. The agent drafts important notes, quiz questions, and application questions.
4. I compare the guide with the source and choose what to keep, change, or reject.
5. I answer the questions myself before seeing an answer key.

## What the agents must never decide

They cannot approve a guide for me, resolve unsupported source conflicts as fact, invent my answers, or claim I understand the material.

## Observable success test

When given notes with contradictory definitions and missing calculation data, the agent identifies each conflict and omission, avoids an unanswerable calculation, and stops for my review.
