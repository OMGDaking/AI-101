# Keyline — Project 4

**Build sentence** — When Dakota chooses a lesson, Keyline demonstrates a short piano phrase with labeled hands, then waits for the expected notes in Try it.

## Open the build

[Open Keyline live](https://keyline-piano-canx20.daking07.chatgpt.site/) in a browser signed in to the ChatGPT account that owns the site. Use this link for the version with background music.

For the classroom copy on your Mac, double-click `serve.command` in Finder. Keep that Terminal window open, then click [Open the local classroom demo](http://127.0.0.1:8094/build/). If the browser says it can't connect, start the server first. You can also run `python3 -m http.server 8094 --bind 127.0.0.1` from this folder. Press Control-C in Terminal when you finish.

The classroom copy runs from `build/index.html` with the assets beside it. Its local server loads the JavaScript, models and samples without a ChatGPT sign-in or API key. Internet access may still be needed for the web fonts.

Skip the optional intro, choose Lessons, and select Meet middle C. Press Watch. After the demonstration, try D4 once and then tap C4 four times, releasing between taps. D4 should leave the phrase waiting. The correct notes should complete it. Use a fresh browser origin for an untouched progress state.

## Build provenance

The packaged app is based on private repository `OMGDaking/keyline`, commit `74ea2a9`, November 19, 2026. The November 19 classroom copy removes the user-supplied commercial background MP3 and disables its controls. It also omits inactive earlier intro assets. Learning features and current intro are retained. See [source-index](sources/source-index.md) and `build/SOURCE.md`.

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
