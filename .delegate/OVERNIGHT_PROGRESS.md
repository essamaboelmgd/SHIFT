# SHIFT Homepage V1 Overnight Progress

- Starting branch: `shift/delegated-v1-stabilization`
- Starting HEAD: `56961c4f7c1bbca7060a08c06b259617f6d857fd`
- Orchestrator strategy: serialized delegated implementation in the current dedicated branch because the primary workstreams overlap in `src/index.css`; no concurrent writers and no worktrees currently required.
- Active weighted concurrency: 0 / 4

## Current task

Selected Work verified and ready to land. Stop after this workstream per the resumed-run instruction.

## Task graph and routing

| Order | Workstream | Lane | Why | Dependencies | Execution | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Inspection, baseline, graph | orchestrator | Repository-grounded planning and measurement | none | serial | complete |
| 1 | Mobile Hero | `luna-max` (weight 1) | Bounded responsive/Safari layout reasoning | 0 | serial | complete |
| 2 | What We Build | `luna-max` (weight 1) | Bounded responsive interaction and CSS | 0 | serial | complete |
| 3 | Selected Work | `sol-medium` (weight 3) | Difficult transition state/data-flow debugging and mobile re-layout | 0 | serial | complete; verified locally |
| 4 | Process redesign | `terra-high` (weight 2) | Multi-file interactive section redesign | 0 | serial | pending |
| 5 | Order and chapter integration | `luna-high` (weight 1) | Small bounded integration | 1-4 | serial | pending |
| 6 | Responsive, legibility, accessibility | `terra-high` (weight 2) | Cross-section multi-file QA/fixes | 1-5 | serial | pending |
| 7 | Image delivery and performance | `terra-high` (weight 2) | Asset pipeline plus measured loading changes | 3, 5 | serial | pending |
| 8 | Motion system | `terra-high` (weight 2) | Cross-section behavior after layout stabilizes | 1-7 | serial | pending |
| 9 | SEO/discovery/404/content hygiene | `luna-max` (weight 1) | Bounded metadata/static files/link audit | 5 | serial | pending |
| 10 | Final release QA | orchestrator, optional `sol-review-high` | Integrated diff review, gates, browsers, Lighthouse | all | serial | pending |

## Completed commits

- `3c9c68a` — `docs: plan homepage stabilization sprint`
- `1ae2619` — `fix: restore compact mobile hero flow`
- `d4b0685` — `feat: refine responsive service explorer`
- `744a22e` — `fix: stabilize selected work carousel`

## Gates and measurements

- Actual scripts discovered: `npm run build`, `npm run dev`, `npm run preview`; no lint or browser-test scripts exist.
- Baseline `npm run build`: PASS (45 modules; CSS 226.68 kB / 38.59 kB gzip; JS 202.74 kB / 63.10 kB gzip).
- Baseline `node --test tests/*.test.mjs`: 3 PASS, 1 FAIL. `site-footer.test.mjs` contains stale fake contact expectations (`hello@shift-labs.com`, `+20 100 000 0000`) that contradict the real configured SHIFT contact data; the failure predates this sprint.
- Baseline public image inventory: 8.44 MB total in the five largest raster originals; Kupecut PNG 4,584,694 B, Argos PNG 2,809,924 B, Hero PNG 1,383,694 B, Hero aperture PNG 1,563,694 B, portrait WebP 62,756 B. Existing WebP delivery assets are present for Hero and project images.
- User-supplied Lighthouse baseline: desktop ~93, mobile ~66. A local Lighthouse binary/setup is not present yet; final measurement approach remains pending.
- Available local executables: Google Chrome, Firefox, ffmpeg/ffprobe, ImageMagick. No WebKit/Playwright setup was found.
- Baseline Chrome captures completed at 390x844 and 1440x900. Mobile confirms a content-independent empty tail after the metadata row; desktop composition renders intact.
- Interactive browser connector exposed no available browser surface, so automated local browser QA is using installed headless browsers and will be reported as such.
- Mobile Hero delegate gates independently confirmed: 2/2 targeted Node tests PASS, `npm run build` PASS, `git diff --check` PASS. Headless Chrome/CDP checked 430x932, 393x852, 390x844, 375x812, 375x667, 360x800 and desktop selector behavior at 1440x900.
- Mobile Hero root cause: the final mobile cascade imposed `min-height: 100vh/100svh` on `.shift-hero` and propagated it through `.shift-hero__canvas { min-height: inherit; }`. The verified fix restores content-sized `height:auto; min-height:0`, removes inherited canvas minimum, and retains safe-area padding/normal flow.
- What We Build delegate and orchestrator gates: focused test 2/2 PASS, `npm run build` PASS, `git diff --check` PASS. Aggregate remains 4 PASS / 1 known stale footer failure.
- What We Build browser checks: headless Chrome/CDP at 1440, 430, 390, 375, 360; Business→Portfolio→Custom switching; one selected row/panel; inline mobile detail; no document-width overflow. Desktop explorer remained ~496px tall after correcting exposed row-gap/min-height cascade behavior.
- Selected Work root cause: the old portal/shared-element transition independently advanced active project state, duplicated visual/footer layers, and used captured viewport geometry under transformed/clipped parents. During the middle 20–80% of the timeline this allowed the main image, metadata, counter, and preview to represent different projects or disappear at different times.
- Selected Work resolution: replaced the portal/duplicated-layer choreography with one authoritative `WorkTimeline`, a single displayed project/footer/preview, an atomic handoff, one navigation lock shared by buttons/keyboard/preview/swipe, calm vertical metadata fades, hidden-tab completion, and immediate reduced-motion state changes. Added truthful Kupecut `14K+ users` micro-proof, retained only its verified live project CTA, and removed the unavailable Argos case-study destination.
- Selected Work focused regression test: PASS (`node --test tests/selected-work-transition.test.mjs`, 1/1 suite).
- Selected Work build: PASS (`npm run build`; 45 modules, CSS 234.03 kB / 39.67 kB gzip, JS 200.34 kB / 62.23 kB gzip).
- Selected Work diff hygiene: PASS (`git diff --check`). Aggregate Node suite remains 5 PASS / 1 known pre-existing stale footer-test failure.
- Selected Work Chromium/CDP frame verification: NEXT and PREVIOUS sampled at 0/20/50/80/100% at 1440x900, 430x932, 393x852, 390x844, 375x812, 375x667, and 360x800. Every sample had one main visual, one footer, one preview, synchronized project metadata/counter/preview, zero transition overlays, zero document overflow, and no captured console/runtime errors.
- Selected Work interaction verification at 390px: rapid double-click lock, keyboard arrows, preview click, touch swipe, reduced motion, and simulated long-frame/hidden-lag completion all settled on one synchronized project with no errors or overflow. Visual screenshot review covered desktop and mobile mid-transition and settled states. Firefox headless rendered the local page at 430x932; no WebKit runtime/test setup is available.

## Failures / escalations

- Local Vite server initially hit sandbox `EPERM`; approved escalated localhost execution succeeded.
- Existing footer test failure is a stale-test defect, not a build failure; scheduled for content-hygiene correction without weakening real assertions.
- The `sol-medium` relay exited non-zero after a transient duplicate-target `apply_patch` rejection and later hit its Codex usage limit, but the same session had already written the complete implementation and verification artifacts. Orchestrator review found no remaining defect, so no repair retry or escalation was used.

## Blockers

None. Production domain and deployment provider remain to be discovered from repository evidence.

## Remaining work

Workstreams 4-10 remain pending. Workstreams 1-3 are complete.

## Resume point

Resume with Process redesign only when explicitly requested. Selected Work is complete; do not repeat its investigation or verification unless its files change.
