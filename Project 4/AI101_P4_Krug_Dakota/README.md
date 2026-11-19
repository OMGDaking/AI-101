# Keyline — Project 4

**Build sentence** — When Dakota chooses a lesson, Keyline demonstrates a short piano phrase with labeled hands, then waits for the expected notes in Try it.

## Open the build

The working app is in `build/index.html`, with its JavaScript, model, piano samples and score files beside it. A local web server is required for browser module and asset loading.

From this folder, run `python3 -m http.server 8094 --bind 127.0.0.1`, then open <http://127.0.0.1:8094/build/>. On macOS, `serve.command` runs the same server if Python 3 is installed. Stop it with Control-C. No dependency installation or API key is needed to run the copied build. Internet access may still be needed for the existing web font imports.

Skip the optional intro, choose Lessons, and select Meet middle C. Press Watch. After the demonstration, try D4 once and then tap C4 four times, releasing between taps. D4 should leave the phrase waiting. The correct notes should complete it. Use a fresh browser origin for an untouched progress state.

The personal live site is https://keyline-piano-canx20.daking07.chatgpt.site/. It may require the owner's signed-in account. The local classroom copy does not depend on that account.

## Build provenance

The packaged app is based on private repository `OMGDaking/keyline`, commit `b8d4e16`, November 19, 2026. The November 19 classroom copy removes the user-supplied commercial background MP3 and disables its controls. It also omits inactive earlier intro assets. Learning features and current intro are retained. See [source-index](sources/source-index.md) and `build/SOURCE.md`.

## Known limits

- Dakota's at-home feedback identifies hand posture and physical piano listening as problems. A visible hand animation does not demonstrate correct technique. Review finger suggestions with a teacher.
- Microphone mode estimates one pitch at a time. A physical piano and microphone performance were not verified in this documentation session. On-screen-key tests cannot establish acoustic accuracy or latency.
- MIDI behavior requires compatible hardware, browser support and permission. Physical hardware testing remains open.
- Audio-to-score is experimental. Dense songs, vocals, expressive timing, and non-4/4 music can generate wrong notes or rhythms. File limits are 75 MB and six minutes. Model warm-up can take time.
- The intro runs at 1.2× and opens the menu automatically. If the browser starts it muted, tap the video to hear the music.
- Progress and cosmetics use local browser storage and do not sync between devices. Instructor access to the live site is unverified.
- The import and microphone implementation have older validation claims in the development README. This packet labels those as prior reports rather than newly repeated measurements.

## Assignment status

The packet is an AI-assisted reconstruction, not a claim that the prescribed Class 14 planning or Class 16/18 testing schedule was followed. The plan, PRD and decision records were written on November 19. The full course brief requires an own-word reflection, four tests in each cycle, and a live defense. See [CHECKLIST](CHECKLIST.md) for items still awaiting Dakota or instructor confirmation.

## Presentation

[Keyline Project 4 slides](Keyline%20Project%204.pptx) link to the live app and this classroom copy. The demo takes about two minutes. The [defense notes](defense-notes.md) give the steps from the slides.
