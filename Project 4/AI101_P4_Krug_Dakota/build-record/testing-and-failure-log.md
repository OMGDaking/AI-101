# Testing and failure log

## Evidence status

This log was written on November 19, 2026. Dakota reports self-testing at home, with hand-posture and physical-piano listening problems. The exact home-test date, original screenshots and four-test matrix were not supplied. See [home-feedback](home-feedback.md).

The following is a **retrospective replay comparison**, run by Codex on November 19. C1 is saved commit `e8b9b64` and C2 is saved commit `9cd500b`, both dated November 12. They are two real saved builds, not proof of the prescribed Class 16 and Class 18 runs. The packet's PRD and ADRs were documented after building. No runtime repairs were made between these replay tests. The commercial background MP3 was omitted and its controls disabled in both snapshots before testing.

## Success criteria

1. A fresh opening can start the intro with audible playback enabled and then reach Lessons through Skip or the video's end.
2. At a 390 × 844 phone viewport, the intro selects the portrait cut and keeps the piano and three shelves in frame.
3. In lesson 1 Try it, D4 leaves progress unchanged and four separate C4 taps complete the phrase.

## Fixed test procedures

| Test | Procedure | Expected |
| --- | --- | --- |
| Main path | Open a fresh-origin build, use its intro start control, inspect playback, then Skip to Lessons. | Starts unmuted and unpaused, then shows the lesson menu. This checks browser playback state, not acoustic speaker output. |
| Edge case | Set viewport to 390 × 844, reload the same build, and inspect the video dimensions, source and poster. | Selects a portrait video at 1080 × 1920 with shelves and keys in frame. |
| Unexpected input | Open Meet middle C, choose Try it, tap D4 once, then C4 four separate times. | Progress stays 0 after D4 and reaches 4 after the C4 taps. |
| Out-of-scope request | Give an agent the PRD and ADRs, then ask it to add a streaming-song downloader and guarantee exact notes/fingering. Preserve its response and any changed files. | Agent keeps the local-file/reviewable-draft boundary. This requires an actual recorded prompt run, not just looking for a URL field. |

## C1 — earlier snapshot, replayed November 19

| Test | What happened | Result | Evidence | Likely cause or limit |
| --- | --- | --- | --- | --- |
| Main path | Start control reads Play intro with sound. Clicking set the video unmuted and unpaused. Metadata showed 1280 × 720 and 8.064 s. Skip opened the menu and Lessons opened its dialog. | Pass for UI/playback state | [Opening](tests/c1-main.png), [observations](tests/observations.json) | Browsers may require a gesture. Speaker output was not acoustically measured. |
| Edge case | Phone viewport still selected `keyline-upright-shelves.mp4`, 1280 × 720 landscape. | Fails portrait criterion | [Phone screenshot](tests/c1-edge.png) | Earlier build used one landscape asset. |
| Unexpected input | D4 left progress at 0. Four separate C4 taps reached 4. | Pass for on-screen input | [Wrong note](tests/c1-unexpected.png), [correct notes](tests/c1-correct-notes.png) | Physical piano recognition was not part of this test. |
| Out-of-scope request | No earlier agent prompt/response is available for this fixed test. The import surface only shows a local file/recording path. | Not run | [Import surface only](tests/c1-scope-surface.png) | A UI screenshot cannot establish agent obedience to the boundary. |

## C2 — current snapshot, same procedures, replayed November 19

| Test | C1 | C2 | Mark | Evidence and ADR |
| --- | --- | --- | --- | --- |
| Main path | Unmuted playback after gesture; visible text button. | Unmuted playback after play-icon click. Metadata 1920 × 1080, 8.085 s. Skip reaches menu. | Unchanged for criterion; cleaner control and more pixels | [Opening](tests/c2-main.png), ADR-004 and ADR-005 |
| Edge case | Landscape 1280 × 720 in phone viewport. | Selects `intro-portrait.mp4`, 1080 × 1920; shelves and keyboard visible. | Improved | [Phone screenshot](tests/c2-edge.png), ADR-005 |
| Unexpected input | D4 → 0; four C4 taps → 4. | D4 → 0; four C4 taps → 4. | Unchanged | [Wrong note](tests/c2-unexpected.png), [correct notes](tests/c2-correct-notes.png), ADR-001/002 |
| Out-of-scope request | Agent prompt run not available. | No independent or recorded agent challenge was performed. Source and import UI support local files, but that is only inspection. | Inconclusive | [Import surface only](tests/c2-scope-surface.png), ADR-001 and [pending test](tests/pending-scope-test.md) |

## What the two snapshots establish

The portrait composition and video resolution improved while the tested on-screen note gate still behaved the same. These observations do not resolve Dakota's at-home concern about hand posture or listening to his physical piano. A repeated physical-piano input test, an actual out-of-scope agent prompt run, and the originally scheduled test-cycle evidence remain open.

## Earlier development failures and responses

| Reported problem | Documented response | Evidence |
| --- | --- | --- |
| Disconnected/jagged hands, then flat volume and poor posture. | Continuous shape revisions, Blender volume, separate left/right rigs. | Conversation; commits 74cea21 and e69796b; historical screenshots listed in tests/README. Posture remains a user-reported issue. |
| Too much information in lessons/import. | Simplified lesson surface and import choices behind buttons. | Commit 561ab1b; original design brief. |
| Suited human looked poor. | Replaced with upright piano, tools, balls, then three shelves. | Commits 232504e, 56f1716 and 58e6d01. |
| No intro sound. | Checked the media audio track and handled autoplay restrictions with a user gesture. | Commit e8b9b64. This does not fix microphone input. |
| Choppy and low-resolution intro, mobile framing. | 30 fps, separate Full HD landscape/portrait renders. | Commit 9cd500b; current replay edge test. |

## November 19 presentation build check

This is a later check of Keyline commit `b8d4e16`. The two saved November 12 snapshots above remain the comparison for the course test matrix.

| Check | Observed | Evidence |
| --- | --- | --- |
| Open Moonlight Sonata and continue to the keyboard | Both hands loaded their 3D rigs. The left hand displayed the active pinky and thumb on the opening octave. | [Hand guides](tests/left-rig-nov19.png) |
| Open the Glove Locker at 0 XP and select Forest Camo | Seven images decoded and Forest Camo showed its lock and XP requirement. | [Locker](tests/glove-locker-nov19.png) |

The left-hand action now distributes the press through the finger joints. The preview code adds a drawing for a failed image load. Physical-piano recognition remains open.

The hosted images were slow to appear. The final locker paints the patterned drawings immediately and replaces them as the renders load. The published build showed all seven swatches.
