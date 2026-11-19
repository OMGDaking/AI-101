# AI Use Log — Keyline

Retrospective, assembled November 19, 2026 from this project conversation, the existing Keyline vault log and Git history. Quotations preserve the user's wording when available. Entries with uncertain dates say so. This is the consequential record recoverable from those sources, not a fabricated complete transcript or an independent student-authored account. Keep/change/reject records describe the user's observable direction, not an inferred personal rationale.

| Date / evidence | Tool | What Dakota asked | What AI produced | Keep, change, or reject | Evidence-based reason |
| --- | --- | --- | --- | --- | --- |
| Oct 22, existing project log | Codex | An app that listens to songs/piano and turns them into sheet music with visual teaching. | Local audio draft pipeline, score and exports. | Kept and expanded. | Follow-up requests added hand guidance and import automation. |
| Early conversation; exact date unverified | Codex | Show hand positions and motion directly on the keyboard. | Illustrated hands with moving finger guidance. | Changed repeatedly. | Dakota reported disconnected and messy fingers. |
| Early conversation; exact date unverified | Codex | Add Moonlight Sonata and Presto agitato with both hands. | Licensed MIDI/score presets and adaptive guidance. | Kept. | Dakota wanted hands on every visual playthrough. |
| Early conversation; exact date unverified | Codex | Practice-earned glove skins and Steinway-like piano sound. | XP/cosmetics and Iowa piano sample playback. | Kept, later updated locker. | Practice reward and sound requests. |
| Early conversation; exact date unverified | Codex | Classy UI, soft red accents, labels on black keys. | Ivory/charcoal/felt-red styling, white black-key labels. | Kept and revised. | User's visual direction. |
| Nov 5, existing log | Codex | Simple lessons with keys, hands and playback. | Simplified focus layout and home bubbles. | Kept, continued simplifying import. | Dakota said the lesson interface was overwhelming. |
| Nov 5–10, existing log | Codex | Watch a whole phrase, then wait for correct notes, with rewind. | Watch/Try loop, wrong-note hold, replay and speed controls. | Kept. | Dakota said the previous guide only played one note. |
| Nov 10, d45419c | Codex, Obsidian | Create a vault, AI Use Log, context kit and references, and put work in GitHub. | Keyline vault notes and source mirror. | Kept. | Requested project organization and access. |
| Nov 10, existing log | Codex, Blender, Figma | Better hands, intro and organized UI. | Blender scenes, hand geometry and Figma layouts. | Changed. | Later comments still rejected hand quality and clutter. |
| Nov 10, existing log | Meshy | Connect and test the service. | Read-only account/credit check. | Connection checked. | No Meshy asset generation is established by the record. |
| Nov 12, 74cea21/e69796b | Codex, Blender | Volume and left/right rigs; use them in examples. | Continuous hand meshes, separate rigs, browser integration. | Kept with unresolved critique. | Nov 19 home feedback still asks for better posture. |
| Nov 12, 561ab1b | Codex, Blender | Refresh glove locker and skins; simpler import with buttons. | Rendered glove previews and progressive import controls. | Kept. | User requested fewer words/dropdowns. |
| Nov 12, f10b49c/47f2a46 | Codex, Blender | Rig a suited pianist and improve human realism/quality. | Seated model, rig, revised face/suit, HD cutscene. | Rejected. | Dakota subsequently said to scrap it for an upright piano. |
| Nov 12, 232504e | Codex, Blender | Upright piano in an old building, pens/tools falling from its top. | Old room, upright, pencil, pen, screwdriver and matching notes. | Kept and expanded. | Requested different intro direction. |
| Nov 12, 56f1716 | Codex, Blender | More pencils/pens, balls and bouncy balls to play more keys. | Eight props and a 13-note tune. | Changed. | Next request added three loose shelves and a song reference. |
| Nov 12, 58e6d01 | Codex, Blender | Three shelves that each break, matching the supplied chord video. | Three splitting shelves and a piano progression arranged from visible chord notes. | Kept. | User supplied timing/music reference. |
| Nov 12, e8b9b64 | Codex | “i dont hear sound for the intro” | Checked audio track and revised blocked-autoplay behavior. | Changed after checking. | User later requested removal of text sound controls. |
| Nov 12, 9cd500b | Codex, Blender | Clean intro, smoother motion, high-resolution desktop and phone. | 30 fps, 1920 × 1080 and 1080 × 1920 cuts, play-icon gesture fallback. | Latest documented build. | Explicit cleanup and resolution request. |
| Nov 19, this session | Codex | Fill out the missing Project 4 details in Obsidian. | Reconstructed plan, PRD, seven ADRs, source index, disclosure, tests, checklist and defense preparation. | For Dakota review. | Starter files were empty despite an existing project. |
| Nov 19, this session | Codex browser | Repeat checks on saved builds e8b9b64 and 9cd500b. | Opening, portrait, wrong/correct note and import-surface evidence. | Recorded with limits. | A replay comparison is available, but original scheduled cycles and agent scope challenge remain unverified. |
| Nov 19, Dakota reply | Codex documentation | “i self tesested it at home … fix hand posture … audio … hear the piano” | Home feedback record, physical-input test instructions and explicit remaining issues. | Recorded as self-report. | No classmate test, date or defense was supplied. |

## Reflection follow-up — November 19

Dakota answered that he was proud of changes to the animation/scene and learning Blender, that the app picked up his piano audio incorrectly, and that he would improve UI, animation, unlocks and cleanliness because he still sees it as a template. Codex organized those answers under the reflection headings, preserving the original replies in [student-replies](student-replies.md). Any added factual explanation is labeled. The personal opinions came from Dakota’s reply.

## Companion session

The packet asks for an idea-challenge session with spark answers and three ideas. None was found in the available record. This catch-up session did not invent one or claim that a pre-build challenge happened. Dakota should add any real session he can locate, or record the gap honestly with the instructor.

## Exact-source limits

Earlier dates rely on the existing project log where noted. Git timestamps identify saved commits, not necessarily the first day a feature was discussed. Earlier conversation topics with no reliable date are not backdated. The reflection now contains Dakota’s replies with labeled AI editing. Original pre-build spark answers remain unverified.

## November 19 presentation revisions

Dakota requested automatic intro playback at 1.2×, a repaired Blender left hand, visible glove skins, and a short class presentation. Codex updated the live app and copied the new build into the classroom packet. It checked both rig views in Moonlight Sonata and the seven locker previews, and drafted the presentation with clickable links. Source commits are `410d81b` and `1c3a1e0`.

The live locker check revealed a delay loading preview images. Codex changed the locker to draw all seven skins before the images arrive and verified their display on the published build (`b8d4e16`).


## Shared hand rigs · November 19

Dakota asked for the Blender hands and camo to match across lessons and examples. Codex identified mixed coordinates in the left rig, repaired and exported it in Blender, and updated the shared keyboard renderer. Codex checked the updated views in the browser. That check used locally seeded Forest Camo and lesson unlocks. Build `74ea2a9`.
