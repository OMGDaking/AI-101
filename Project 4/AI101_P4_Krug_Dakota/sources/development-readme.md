# Keyline
Static browser app for experimental audio-to-piano drafts.

Audio is decoded locally, resampled to mono 22050 Hz, and processed in overlapping 12-second windows by Spotify Basic Pitch 1.0.1 with TensorFlow.js. The local model and all runtime libraries are served with the app. The first inference can take time while WebGL shaders compile; CPU is a fallback.

The arranger selects a likely melody using amplitude, range and continuity, estimates tempo, assumes 4/4, and generates a bass note per bar (easy) or root-and-fifth dyads every two beats (intermediate). This is not source separation or an exact arrangement of the original. No streaming-service import, remote inference, or original-track retrieval is implemented. Dense mixes, expressive timing, meter changes and vocals can produce incorrect results. Upload limit: 6 minutes / 75 MB; recordings: 60 seconds.

Outputs share one arranged note list: playback, practice guidance, MusicXML, MIDI (two tracks) and PDF. OpenSheetMusicDisplay engraves the MusicXML; jsPDF and svg2pdf create PDF pages. Hand positions use a five-key heuristic and are not optimized fingerings.

Run a static server on dist/. To rebuild vendor bundles after dependency changes, install with the Sites install-dependencies helper, then run `node build.mjs`. Exact dependencies are locked by pnpm-lock.yaml. Build outputs, model weights, and license notices are included in dist for buildless deployment.

Validated: synthetic 8-second polyphonic piano recording, 24-second multiwindow recording, cancel flow, easy/intermediate rebuilds, separate-hand MIDI notes, balanced MusicXML voices and rendered PDF content. Commercial full-mix accuracy and maximum-length performance have not been validated.

## Moonlight Sonata preset

`#moonlight` loads the complete first movement from Stewart Holmes / Mutopia Project's CC BY-SA 2.5 edition (Mutopia-2007/02/11-276). See dist/pieces/ATTRIBUTION.txt. The unchanged MIDI supplies original pitches/timing; the first five rendered score pages display the first movement, and the unchanged PDF download contains the entire sonata. No lossy audio transcription or estimated MusicXML is substituted for the published edition. The keyboard expands to the piece's range. An adaptive connected hand illustration follows the selected left or right part, changing span and position for octaves and arpeggios. The published score supplies authoritative fingerings; the animation uses estimated grips.

## Practice rewards and piano samples

The Glove Locker offers Classic (free), Forest Camo (60 XP), Urban (150), Desert (300), Arctic (450), Spotlight Glove (600) and Mystery Camo (900). Mystery uses a saved random seed and can be shuffled after it is unlocked/equipped. Locked items can be previewed without equipping. Cosmetics style the hand guide and animated hand on every visual playthrough, including the Moonlight preset.

Progress is browser-local in `keyline-practice-v1`; there is no account sync or authoritative anti-cheat backend. App-key sessions earn one XP per second for up to ten seconds after an input and two per key/note step, with at most four bonus XP per second. My-piano sessions are explicitly self-reported visible-tab timers at one XP/sec. Neither mode listens to a performance or measures accuracy. Hidden tabs pause earning. XP, active time, equipped skin and mystery seed are validated on load and persisted; storage failures fall back to session-only state.

The default sound uses a compact set of actual Steinway & Sons Model B recordings from the University of Iowa Electronic Music Studios. All 22 sample origins and processing details are recorded in dist/piano/manifest.json and ATTRIBUTION.txt. Samples are converted to mono 22.05 kHz PCM, trimmed to eight seconds, normalized and faded; intermediate pitches are rate-interpolated. This is one recorded dynamic layer, with velocity-controlled gain/filter, release envelopes, stereo placement, compression and adjustable room reverb. It is not a full multi-layer instrument library. First play loads the samples; unavailable samples trigger an explicit synth fallback. The old synth remains selectable.

Validated: 22 PCM assets, sample loading/readiness and playback in the browser; XP input cap, idle/hidden rejection, self-reported timer, unlock/equip gating, persistence and seeded camo shuffle; Glove Locker previews and rendering on the actual hand model.

## Concert room interface

The interface uses ivory, charcoal and muted piano-felt red. Practice and sound controls sit in an expandable drawer. A shared dorsal SVG hand renderer supplies wrist-to-fingertip anatomy for the static guide, animated hand, and glove previews. The skin is a single closed silhouette; fingertip deformation keeps the finger roots attached to the palm during presses and black-key reaches. Left-hand geometry is mirrored while number labels remain readable. Skins preserve digit animation and selected-finger outlines.

Validated: left/right geometry and SVG structure, browser playback with sampled-piano readiness, note stepping, mirrored guide, locked glove previews, and expandable practice/sound controls.

## Learning paths and lessons

Import music, Learn sheet music, and Visual playthrough provide direct navigation to the existing import pipeline, a staff/rhythm reading guide plus score, and animated playback. TIME TO PLAY! opens six selectable original exercises: middle C, right-hand five-note patterns, left-hand patterns, rhythm, both hands, and a short Ode to Joy phrase. Each loads real timed MIDI events, an engraved piano score, downloads and a fixed C-position fingering plan. Only the two-hand exercise enables both practice-hand selectors. Watch, read, previous/next note, speed and next-lesson controls remain available. Back to my music restores the prior piece, transcription data, hand and playback position.

Lesson completion is explicitly self-reported and stored separately in keyline-lessons-v1. It awards no automatic XP and does not assess performance. Browser validation covered lesson menu/completion persistence, first/next/left/both-hand lessons, printed score rendering, back-to-music, import navigation and glove previews. Programmatic checks covered six exercise event sets, exact half/whole-note rhythms, two-hand content, and one closed hand silhouette for all fingertip press/reach states.

## Adaptive hands on every playthrough

Full-score and imported arrangements use a shared adaptive hand planner, with per-hand onset positions and a short phrase window to stabilize arpeggios. A displayed grip is limited to five distinct pitches within an octave; extra sounding voices remain illuminated without forcing impossible stretches. A monotonic horizontal skin warp, bounded finger bends and mirrored number labels keep the hand silhouettes coherent. Precisely lit keys remain the pitch reference; illustrated finger positions are constrained for shape quality. Both hands are shown by default. Either hand can be focused, slowed, stepped or sought through; the visibility toggle remains available. Lesson/demo fixed positions are preserved. The keyboard expands for imported pitches outside the initial range.

Validated all 930 Moonlight onset positions across both hands for finite geometry, bounded grips, unique fingers, target-key mapping before pose constraints and a single closed hand outline. Browser checks covered right-hand playback at half speed, left-hand opening octave, seeking to 3:52, sheet/visual switching, and lesson regression. The preset MIDI/JSON/score assets are unchanged. Animation is illustrative and is not a transcription of the edition's printed fingerings.

## Two hands and Presto agitato

Both hands is the default view on every playthrough, with independent left/right SVG instances driven by the same position clock. Solo focus buttons remain available. Main-keyboard hands share a fixed eight-key display width and preserve the 220:210 aspect ratio, rather than changing size with phrase spans. All skin geometry uses one monotonic horizontal mapping; adjacent finger centers stay at least 32 SVG units apart and vertical bends are capped at five units. This replaces independent fingertip-to-fixed-root distortion. The guide displays both hands together, and glove skins update every instance.

The third movement uses 4,863 note events from the already-attributed Mutopia moonlight3.mid. Its source MIDI default is 60 BPM; the practice preset and downloadable adapted MIDI use 160 BPM, preserving every pitch, tick position and tick duration. Playback follows the source MIDI's form/repeats. The unchanged original is retained as moonlight-third-original.mid, and the third movement's printed score pages 8–23 are available in-app. The original full-score PDF remains the PDF download. All adaptations retain CC BY-SA 2.5 attribution. Deep link: #moonlight-third.

Validated: 4,842 hand-onset positions across movements I and III for monotonic geometry, non-crossing finger centers and bounded bends; MIDI event identity at tick level; 16 third-movement score assets. Browser QA covered synchronized two-hand Presto playback, equal/proportional hand dimensions, seeking, solo/both switching and movement-I regression.

## Studio intro

Three loose shelves break above the upright piano on chord changes and drop their contents onto the keys. The editable Blender scene, packed score, and build notes are in [blender/upright](blender/upright/README.md).
