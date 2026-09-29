# Automatic draft trigger

This optional trigger watches only `../inbox/` for new or changed UTF-8 Markdown (`.md`) files. Put only documents you are willing to send to the current Codex provider there. It does not scan the rest of the vault or process PDFs/Word files.

The Mac's `launchd` job runs the script when the inbox changes and once a minute as a safety check. A file must be stable for at least 15 seconds. The source is never moved or edited. Each distinct file version gets a new **unreviewed** draft in `../drafts/`; the model cannot complete the human check. The draft includes spaces for your keep/change/cut decisions and your own explanation. Files over 256 KiB are skipped.

The script uses the already-installed Codex command in the ChatGPT app with a read-only model sandbox. It does not store credentials in this folder. Its lock, retry state, and logs stay outside the Vault in `~/Library/Application Support/AI-101-study-guide/` and `~/Library/Logs/AI-101-study-guide/`. Failed versions retry at most three times, at least ten minutes apart.

Because `drafts/` is inside this vault, the existing private GitHub sync may later include drafts. Do not put credentials or private material in the inbox.

## Check it

```sh
/usr/bin/python3 '/Users/omgdaking/AI-101/Github-Sync/study-guide-workflow/automation/watch_inbox.py' --check
/usr/bin/python3 '/Users/omgdaking/AI-101/Github-Sync/study-guide-workflow/automation/watch_inbox.py' --self-test
launchctl print "gui/$(id -u)/com.justdak6.ai101-study-guide"
tail -n 30 "$HOME/Library/Logs/AI-101-study-guide/scan.log"
```

The self-test sends only a harmless built-in sample to the model; it does not create a draft in the vault. The regular trigger creates drafts only when a Markdown file is placed in `inbox/`.

## Pause or resume

```sh
launchctl bootout "gui/$(id -u)/com.justdak6.ai101-study-guide"
launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.justdak6.ai101-study-guide.plist"
```

Pausing does not delete the source files, drafts, or state. After resuming, the next scan catches eligible files that arrived while paused.
