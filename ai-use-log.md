# AI Use Log — Project 1

All four outputs were generated on September 17, 2026 with OpenAI image generation. The output images are retained in `context-kit/Image Rounds/`.

## Round 1 — baseline

- **Context the model could see:** The shared starting prompt only; no reference images, palette, style note, or intent sentence.
- **Instruction:** “A square poster for a student AI-art pin-up, bold flat shapes, exactly three colors, no text.”
- **Direction:** None. This was the required baseline.
- **Output:** [round-1-baseline.png](round-1-baseline.png) — a yellow-and-navy student desk scene with a cat, laptop, books, and plant.
- **Decision:** **Reject.** It is cozy and generic; the yellow palette, desk scene, and domestic objects contradict the neon-city atmosphere in the context kit.

## Round 2 — apply the kit

- **Context the model could see:** The four reference images, color palette, style note, and intent note in `context-kit/`.
- **Instruction:** Rewrote the brief as a fully clothed adult cyberpunk fashion figure in an abstract rain-slicked city. Required the exact teal `#276D6C`, dark wine `#331517`, and hot magenta `#B5053B` palette; requested bold flat forms and prohibited text, signs, and symbols.
- **Direction:** “Replace the cozy desk with wet vertical city geometry; use the kit palette and make the figure an editorial fashion silhouette.”
- **Output:** [round-2-context.png](round-2-context.png) — a full-length figure in a coat within a detailed magenta-and-teal city canyon.
- **Decision:** **Change.** The palette and rain-city mood are correct, but the background has too many buildings and cables for a flat-shape poster.

## Round 3 — simplify the city

- **Context the model could see:** The Round 2 output, the ribbed-glass portrait, and the kit’s palette and style constraints.
- **Instruction:** Kept the adult in a long coat, the wet-street angle, and the three-color palette. Reduced the background to three monolithic blocks and one open magenta sky plane; directed vertical ribbing only onto face and hair.
- **Direction:** “Keep the city energy and coat; drop the dense building forest and cables. Push the image toward large, spare poster shapes.”
- **Output:** [round-3-simplify.png](round-3-simplify.png) — a low-angle full-length figure, three large buildings, a magenta sky, and a ribbed face.
- **Decision:** **Change.** The reduction works, but the low-angle figure visually merges with the left building and competes with it.

## Round 4 — final framing

- **Context the model could see:** The Round 3 output and ribbed-glass portrait, with the kit’s palette, style note, and intent retained as constraints.
- **Instruction:** Changed to a waist-up, left-third portrait in a calm dark-wine coat. Kept one far-right teal building, a clean magenta sky, face-and-hair ribbing, and a few broad teal/magenta street reflections. Repeated the no-text and exact-three-color constraints.
- **Direction:** “Keep the neon monoliths and ribbed face; drop the low-angle full-body pose and the building collision. Separate the silhouette with a large open field.”
- **Output:** [round-4-final.png](round-4-final.png) — a readable left-side fashion portrait, one teal monolith, open magenta sky, and limited street reflections.
- **Decision:** **Keep.** The isolated silhouette and selective ribbing make the kit’s city, palette, and optical material legible without visual clutter.
