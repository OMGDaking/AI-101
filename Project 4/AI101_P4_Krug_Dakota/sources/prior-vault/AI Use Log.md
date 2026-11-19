# AI Use Log

This retrospective records documented work on Keyline. Dates come from the project conversation and source history. The checks below describe what Codex verified during the work.

| Date | Tool | What the user directed | What AI produced and what was checked |
| --- | --- | --- | --- |
| 2026-10-22 | Codex | Turn imported audio into a piano arrangement and sheet music with a visual playthrough. | Built the browser import, draft arrangement, and export flow. The project README records tests with synthetic piano audio. Commercial full mixes still need accuracy checks. |
| 2026-11-05 | Codex | Simplify lessons and put labeled left and right hands directly on the keys. | Removed the separate hand panel and moved the finger guide onto the keyboard. Checked the labeled hands in the browser. |
| 2026-11-10 | Codex, Blender, Figma | Improve the intro and refine parts of the interface. | Modeled and lit a grand piano in Blender, exported the drop and rebound motion, and created editable home and lesson layouts in Figma. Checked the intro landing and lesson playback. |
| 2026-11-10 | Codex, Meshy 3D | Connect to Meshy and check that it works. | Verified the account connection with a read-only credit check. No Meshy model was generated in that check. |
| 2026-11-10 | Codex | Make the hands visibly play the whole phrase, using Flowkey as a reference. | Added distinct presses and releases, a note counter, and visible speed controls. Browser checks covered four repeated middle C notes, a wrong tap that left practice waiting, correct taps that unlocked the next lesson, and finger changes at half speed. Physical MIDI and microphone checks remain open. |

## Add an entry

- **Date and tool**
- **What I asked AI to do**
- **What AI produced**
- **What I kept, changed, or rejected**
- **What I verified and what still needs checking**
- **Evidence** such as a note, design, or commit

See [[Project brief]], [[Reference index]], and [[Roadmap]].
