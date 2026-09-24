# Step 1: Trigger

**What starts this step:** a set time arrives.

**What this step does:** starts the workflow on a schedule, without me clicking anything.

**My setting:** every Monday and Wednesday at 9 p.m. local time, using the Mac's loaded `launchd` job.

**If the Mac is asleep:** a missed scheduled run starts after it wakes. **If the Mac is powered off:** that run is skipped; I can run a manual sync after startup or wait until the next scheduled time.

**Good looks like:** the job runs on Monday and Wednesday at 9 p.m. when the Mac is on, or after wake if it was asleep.

**How I check it:** I review `~/Library/Logs/AI-101-sync/sync.log` for a successful run. If files changed, I also check the latest commit time on GitHub. A run with no file changes will not create a new commit.
