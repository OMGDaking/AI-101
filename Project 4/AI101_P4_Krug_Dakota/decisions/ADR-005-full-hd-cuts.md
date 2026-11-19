# ADR-005 — Frame the intro for desktop and phone
**Status** — AI-assisted retrospective, recorded November 19, 2026. Dakota review pending. Historical evidence comes from 9cd500b, November 12.
**Context** — Dakota requested smoother animation, 1080p resolution and high quality on mobile. A single landscape render did not provide a portrait composition.
**Decision** — Render 1920 × 1080 landscape and 1080 × 1920 portrait at 30 fps, selecting by orientation at page opening.
**Consequence** — The phone has its own framing. Both videos contain audio. More pixels and separate videos increase transfer/storage size.
