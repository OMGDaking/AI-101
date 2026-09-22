# AI Use Log — Project 1

The four Project 1 outputs below were generated on September 17, 2026 with OpenAI image generation. The output images are retained in `Image Rounds/`. Additional Real Madrid poster and animation exploration from September 22, 2026 is documented separately below.

## Round 1 — baseline

- **Context the model could see:** The shared starting prompt only; no reference images, palette, style note, or intent sentence.
- **Instruction:** “A square poster for a student AI-art pin-up, bold flat shapes, exactly three colors, no text.”
- **Direction:** None. This was the required baseline.
- **Output:** [[Project 1/Image Rounds/round-1-baseline.png]] — a yellow-and-navy student desk scene with a cat, laptop, books, and plant.
- **Decision:** **Reject.** It is cozy and generic; the yellow palette, desk scene, and domestic objects contradict the neon-city atmosphere in the context kit.

## Round 2 — apply the kit

- **Context the model could see:** The four reference images, color palette, style note, and intent note in `context-kit/`.
- **Instruction:** Rewrote the brief as a fully clothed adult cyberpunk fashion figure in an abstract rain-slicked city. Required the exact teal `#276D6C`, dark wine `#331517`, and hot magenta `#B5053B` palette; requested bold flat forms and prohibited text, signs, and symbols.
- **Direction:** “Replace the cozy desk with wet vertical city geometry; use the kit palette and make the figure an editorial fashion silhouette.”
- **Output:** [[Project 1/Image Rounds/round-2-context.png]] — a full-length figure in a coat within a detailed magenta-and-teal city canyon.
- **Decision:** **Change.** The palette and rain-city mood are correct, but the background has too many buildings and cables for a flat-shape poster.

## Round 3 — simplify the city

- **Context the model could see:** The Round 2 output, the ribbed-glass portrait, and the kit’s palette and style constraints.
- **Instruction:** Kept the adult in a long coat, the wet-street angle, and the three-color palette. Reduced the background to three monolithic blocks and one open magenta sky plane; directed vertical ribbing only onto face and hair.
- **Direction:** “Keep the city energy and coat; drop the dense building forest and cables. Push the image toward large, spare poster shapes.”
- **Output:** [[Project 1/Image Rounds/round-3-simplify.png]] — a low-angle full-length figure, three large buildings, a magenta sky, and a ribbed face.
- **Decision:** **Change.** The reduction works, but the low-angle figure visually merges with the left building and competes with it.

## Round 4 — final framing

- **Context the model could see:** The Round 3 output and ribbed-glass portrait, with the kit’s palette, style note, and intent retained as constraints.
- **Instruction:** Changed to a waist-up, left-third portrait in a calm dark-wine coat. Kept one far-right teal building, a clean magenta sky, face-and-hair ribbing, and a few broad teal/magenta street reflections. Repeated the no-text and exact-three-color constraints.
- **Direction:** “Keep the neon monoliths and ribbed face; drop the low-angle full-body pose and the building collision. Separate the silhouette with a large open field.”
- **Output:** [[Project 1/Image Rounds/round-4-final.png]] — a readable left-side fashion portrait, one teal monolith, open magenta sky, and limited street reflections.
- **Decision:** **Keep.** The isolated silhouette and selective ribbing make the kit’s city, palette, and optical material legible without visual clutter.

---

## Additional exploration — Real Madrid poster and animation

**Session date:** September 22, 2026  
**Log updated:** September 22, 2026, retrospectively from this conversation.  
**Tools:** Claudian assistant in Obsidian; built-in OpenAI image generation for the poster and jersey edit; code-authored SVG animation; Chrome for previewing the SVG. No video-generation service was used.

This is a separate exploration, not a replacement for the square, three-color, no-text Project 1 submission above. Decisions below describe the user's follow-up requests; no unspoken final approval is assumed.

### Round 1 — Champions League poster

- **Context the model could see:** The conversation and the new Real Madrid request. No reference image was supplied to the image-generation call.
- **Instruction:** “can you make a poster for champions league for real madrid”
- **Direction:** The assistant expanded the broad request into a portrait fan poster with a generic player seen from behind, a white kit, nighttime stadium, trophy, and white/blue/gold palette. It added “REAL MADRID” and “CHAMPIONS LEAGUE” as headings, without specifying a season or match result.
- **Output:** A 1024 × 1536 PNG, originally saved as `real-madrid-champions-league-poster.png`.
- **Decision:** **Change.** The next request retained the poster as the base and asked for personalized lettering and a number on the jersey.

### Round 2 — personalize the jersey

- **Context the model could see:** The Round 1 poster, inspected and supplied directly as the edit reference.
- **Instruction:** “can you put loading number 16 on the back of the player”
- **Direction:** Add “LOADING” above a large “16” on the player's jersey; preserve the pose, stadium, trophy, headings, and overall design.
- **Output:** An edited PNG with “LOADING” and “16” on the white jersey, originally saved as `real-madrid-champions-league-poster-v2.png`. The original was preserved at the time of the edit.
- **Decision:** **Change / extend.** The next request used this personalized poster as the basis for animation rather than requesting another still-image correction.

### Round 3 — animated-poster effects

- **Context the model could see:** The personalized poster and prior conversation.
- **Instruction:** “can we animate this”
- **Direction:** The assistant chose subtle poster motion: gentle zoom, pulsing trophy glow, twinkling stars, and drifting confetti.
- **Output:** A self-contained animated SVG, originally saved as `real-madrid-champions-league-poster-animated.svg`, embedding the existing PNG. The main zoom and glow use six-second cycles; other effects loop on separate timings. The SVG was opened in Chrome, and screenshots taken at different times showed a visual change.
- **Limitation:** This is an animated still poster, not generated footage of the player moving. It does not show walking, entering a tunnel, or changing his pointing gesture.
- **Decision:** **Change.** The follow-up requested a new action sequence involving the player, beyond the SVG's decorative motion.

### Round 4 — tunnel and fan interaction (planned, not generated)

- **Context the model could see:** The existing poster, jersey customization, SVG animation, and conversation.
- **Instruction:** “can we make him enter a tunnel and point at the fans”
- **Direction:** The assistant proposed a camera following “LOADING 16” toward a stadium tunnel, with the player turning to point at cheering fans before walking into the tunnel. Preserve the white kit and jersey lettering.
- **Output:** A proposed video prompt and guidance for accessing Runway. The Runway plugin was found but was not installed or connected at the last check. No video was generated, and no upload to Runway was performed in this conversation.
- **Decision:** **Pending.** The user asked how to get Runway. Account connection, generation, and review remain unconfirmed.

### File availability at this update

The three Real Madrid outputs were created earlier in this conversation, but their filenames were not found in the current vault during this log update. They may have been moved outside the vault, renamed, or deleted; their current locations have not been verified. No replacement files or missing-file links were created.
