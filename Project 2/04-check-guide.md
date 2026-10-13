# Step 4: Verify the guide — HUMAN CHECK

**What starts it:** The model saves `03-study-guide.md`.

**Input:** The guide, organization output, and original source.

**What it does:** I decide whether the guide is accurate enough to study from.

**My checklist:**

- Every concept and task matches its cited source heading.
- Every required artifact in the selected input appears in the checklist.
- Deadlines match the original or say “not stated.”
- The three practice questions are answerable from the original and have no supplied answers.
- Missing context is visible; class labels are not silently converted into calendar dates.

**Output:** `04-human-check.md` with my actual decision (approved, revise, or rejected), date, and specific corrections.

**Good looks like:** I can point from each guide item to the original. My recorded decision explains any corrections.

**How I check it:** Any failed item blocks Step 5. Return the failure to the relevant model step, check the revision, and approve only when satisfied.

**Model boundary:** Prepare a blank checklist if useful, but never fill my approval or impersonate me.
