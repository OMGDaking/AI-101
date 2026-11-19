# ADR-004 — Start the intro with sound
**Status** — AI-assisted retrospective, recorded November 19, 2026. Dakota review pending. Historical evidence comes from e8b9b64 and 9cd500b, November 12.
**Context** — Dakota reported that the intro had no sound. The video had an audio track, while autoplay rejection triggered muted playback.
**Decision** — Attempt audible playback, then hold at the beginning for a user gesture when the browser blocks it. Remove the visible sound toggle after the user requested a cleaner intro.
**Consequence** — The soundtrack starts with the video after a gesture. First-visit autoplay depends on browser policy. This fixes output, not physical-piano input.
