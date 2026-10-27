# Step 3: Create the study guide — MODEL

**What starts it:** Step 2 completes under the user's request for a guide.

**Input:** The supplied or selected source and its organized material.

**What it does:** Deliver a ready-to-use guide with these sections:

1. **Source:** Document name, file path, or pasted-text label; scope; and any extraction limitations.
2. **Important notes:** Key ideas, definitions, and important details in clear language, grouped by topic. Preserve qualifications; do not claim to predict an exam. Include source references.
3. **Quiz questions:** Five short-answer questions testing recall and understanding, unless the user requests another count or format. Include source references.
4. **Practice questions:** Three questions that apply the material through explanation, scenarios, or calculations, unless the user requests another count. Label invented scenarios as practice examples, keep them consistent with the source, and supply all needed scenario data. Include source references for the underlying concepts.
5. **Things to check:** Missing information and conflicting claims with their source locations. If none were found, say so without claiming the source is guaranteed complete.

Use fewer questions when the document cannot support enough distinct, answerable questions; explain why. A task checklist is not a required section. Include deadlines or submission requirements only when relevant and explicitly stated, preserving any conflicts.

Leave answers out by default. If the user requests answers, add a separate **Answer key** after the questions with source references. Never present model answers as the user's work.

Show the complete guide in chat. If the user selected a new run folder, also save `03-study-guide.md` there. Then stop for Step 4; do not supply the user's approval.

**Good looks like:** The user gets important notes, recall questions, and application practice based on the attached document.

**How to check:** Confirm the three requested content sections are present, questions are answerable, and claims have honest source references.
