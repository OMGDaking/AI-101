# Source and asset index

Prepared November 19, 2026. The copied app is from private repository OMGDaking/keyline, commit b8d4e16. Files are inventoried with SHA-256 hashes in [asset-inventory.csv](asset-inventory.csv). The original commercial background MP3 and inactive historical intro assets are excluded. The records below describe provenance, not a blanket certification that every rights question is resolved.

| Reference or asset group | Origin | Use | Permission / evidence |
| --- | --- | --- | --- |
| Project 4 brief and packet | https://ai-101-v4.vercel.app/projects/vibe-coding and the supplied ZIP | Required documents, test categories and reflection instructions | Course material. The brief was retrieved November 19. The site labels its brief AI-drafted and awaiting Nathan's review. |
| Keyline application and revision history | https://github.com/OMGDaking/keyline | Source build, saved decisions and version comparison | Dakota's private project with AI-written code. A project-wide public license is not declared. Preserve dependency/asset terms. |
| Prior vault notes | prior-vault/ | User, constraints, AI history and references | Dakota's notes, originally prepared with Codex. Imported here as evidence. |
| Spotify Basic Pitch 1.0.1 | https://github.com/spotify/basic-pitch-ts | Polyphonic note estimation | Apache-2.0 notices in build/model/LICENSE.txt and vendor legal files. |
| TensorFlow.js 3.21.0 | https://github.com/tensorflow/tfjs | Local model execution | Apache-2.0 notices preserved in build/vendor/*.LEGAL.txt. |
| Tone.js MIDI 2.0.28 | https://github.com/Tonejs/Midi | MIDI processing | MIT, bundled legal notices retained. |
| OpenSheetMusicDisplay 1.9.2 | https://github.com/opensheetmusicdisplay/opensheetmusicdisplay | Sheet-music engraving | BSD-3-Clause, bundled legal notices retained. |
| jsPDF 3.0.3 and svg2pdf.js 2.6.0 | https://github.com/parallax/jsPDF and https://github.com/yWorks/svg2pdf.js | PDF export | MIT notices retained in vendor legal files. |
| Three.js runtime / hand loader | build/vendor/hand-3d.js, sources/implementation/src/hand-3d.js | Browser hand models | Three.js MIT notice preserved in build/vendor/three.LICENSE.txt. |
| Steinway Model B samples | https://theremin.music.uiowa.edu/MISPiano.html | Lesson and intro piano sound | University of Iowa statement quoted in build/piano/ATTRIBUTION.txt permits projects without restrictions. Performer Evan Mazunik; recordings created by Lawrence Fritts/Iowa EMS. File origins in manifest.json. |
| Moonlight Sonata I and III | https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=276 | Example score, MIDI and note events | Stewart Holmes/Mutopia edition CC BY-SA 2.5. Preserve build/pieces/ATTRIBUTION.txt and share-alike terms on adaptations. Beethoven composition is public domain; the edition has its own terms. |
| Intro room, shelves, props and audio effects | sources/implementation/blender/upright/ | Optional animated welcome scene | Procedural geometry and synthesized effects generated through Codex/Blender for Dakota. Final music uses Iowa samples. |
| Intro chord progression | User-supplied November 12 screen recording | Timing and chord reference for reconstructed intro score | Exact song/source identity was not supplied. Original recording is excluded. Confirm permission/source attribution before public redistribution of the arrangement. |
| Hand GLBs and glove previews | build/models and build/gloves | Hand guide and practice cosmetics | Created through Codex-authored Blender scripts in the project. No Meshy generation is established. |
| DM Sans and Instrument Serif | Google Fonts CSS import in build/style.css | Interface fonts | Served remotely. Google Fonts lists these under SIL Open Font License. Font files are not redistributed in this folder. System fallbacks apply offline. |
| Flowkey | User's request to emulate phrase demonstration and practice flow | Interaction reference | Design reference only; no Flowkey code, recording or art is included. |
| Other earlier YouTube and attached visual references | prior-vault/References/Reference index.md and conversation | Earlier visual/music direction | Reference-only. Earlier pianist portraits and commercial audio are not included in this classroom build. |
| Test screenshots | build-record/tests/ | Evidence of current-session comparison | Captured by Codex from Dakota's local app on November 19. historical/ retains four existing project output images and labels them separately. |

## AI-generated work

Codex generated the application code, procedural Blender scripts, hand/glove assets, intro renders/effects and this documentation. Figma assisted earlier layout work. Copied implementation files and the dependency lockfile are under implementation/. See [disclosure](../disclosure.md).

## Material excluded or still awaiting review

The supplied Daniel Caesar instrumental is not included because redistribution rights are unverified. Original reference recordings, earlier attached portrait images and unused cutscenes are excluded. Classroom code disables their background controls and does not change the private live app. The intro arrangement's original song identity/rights remain a review item. No credential or personal-data file was intentionally copied; asset and text scans are documented in [CHECKLIST](../CHECKLIST.md).
