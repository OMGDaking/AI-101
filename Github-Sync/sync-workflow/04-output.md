# Step 4: Output

**What comes out:** when vault files changed, my private GitHub repository shows a new commit with the updated files and a time stamp. If nothing changed, the run records that in the sync log without making an empty commit.

**Good looks like:** the changed vault files appear in GitHub, or the log says there were no changes to send.

**How I check it:** I read the latest result in `~/Library/Logs/AI-101-sync/sync.log`, then open GitHub to spot-check a changed note when there was a new commit.
