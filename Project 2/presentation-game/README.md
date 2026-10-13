# Workflow Quest — CY-7 Recovery Lab

## Play or share with classmates

**[Download the playable game from GitHub](https://github.com/OMGDaking/AI-101/raw/refs/heads/main/Project%202/presentation-game/Workflow-Quest.zip)** · [Preview](preview-cy7.png)

### Playing from Obsidian

Obsidian's note editor does not execute the game. Use [Play on this Mac](http://127.0.0.1:8765/) while the local game server is running. To start it again, paste this command into Terminal and leave that Terminal window open:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory "/Users/omgdaking/AI-101/Project 2/presentation-game/dist"
```

That address works only on the Mac running the server.

### Playing a downloaded ZIP

Download `Workflow-Quest.zip`, then double-click it to unzip. Inside, right-click `Play-Workflow-Quest.html` and choose **Open With → Google Chrome** or **Safari**. If GitHub shows a file page instead, use its **Download raw file** button.

### Playing a downloaded HTML file

Find `Play-Workflow-Quest.html` in Finder, right-click it, and choose **Open With → Google Chrome** or **Safari**. Keep the `.html` extension. A file ending in `.md` is an Obsidian note and will not run the game.

Open `Play-Workflow-Quest.html` in Chrome, Safari, Edge, or Firefox. Share this one file with classmates; all game code and artwork are embedded, so it works offline without installing anything. On a computer, download the file and open it in the browser rather than a document preview.

1. Click **Enter the control room**.
2. Click any failed checkpoint in the room.
3. Read the original evidence and proposed action, then choose the repair. Use buttons or number keys 1–3.
4. Return to the room and inspect another checkpoint. Each correct decision restores one station. Missed checks remain red.
5. View the report after all five inspections. **Reboot the room** resets the score and stations.

Motion can be paused, and the game respects the system's reduced-motion preference. Sound is optional and starts off. For a class presentation, ask classmates to vote before choosing an answer.

## Project connection

The five stations correspond to the Project 2 study-guide workflow: gather, organize, build, human check, and recall. Game scenarios are illustrative. Playing does not count as a Claudian run, personal source verification, learning assessment, or peer critique. Show the actual workflow and run comparison after the game.

## Editable version

- `dist/index.html`: layout and game room
- `dist/style.css`: appearance and animations
- `dist/game.js`: missions, scoring, checkpoint selection, controls, and sounds
- `dist/assets/cy7-recovery-room.png`: generated scene inspired by the user's robot reference
- `image-generation-prompt.md`: built-in image-generation prompt and provenance

Run `python3 build-shareable.py` after editing the source to rebuild the self-contained file with the current assets.

## Verification

Browser-tested checkpoint selection out of order, correct and incorrect answers, persistent station states, score, keyboard input, report, and replay. Responsive layout inspected at 390px, with no horizontal overflow. Script syntax checked with Node.

## Hosting status

The game is included in the private AI-101 GitHub project. GitHub's file viewer does not execute it; download the HTML file and open it locally. GitHub Pages was unavailable for this private repository under the current plan. The user chose to keep the game private, so no public repository or hosted game URL was created. A previously registered private Site has not been deployed.
