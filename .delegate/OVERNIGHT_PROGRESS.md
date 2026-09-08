# SHIFT Homepage V1 Overnight Progress

- Starting branch: `shift/delegated-v1-stabilization`
- Starting HEAD: `56961c4f7c1bbca7060a08c06b259617f6d857fd`
- Orchestrator strategy: serialized delegated implementation in the current dedicated branch because the primary workstreams overlap in `src/index.css`; no concurrent writers and no worktrees currently required.
- Active weighted concurrency: 0 / 4

## Current task

Mobile Hero refinement dispatch preparation.

## Task graph and routing

| Order | Workstream | Lane | Why | Dependencies | Execution | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Inspection, baseline, graph | orchestrator | Repository-grounded planning and measurement | none | serial | complete |
| 1 | Mobile Hero | `luna-max` (weight 1) | Bounded responsive/Safari layout reasoning | 0 | serial | pending |
| 2 | What We Build | `luna-max` (weight 1) | Bounded responsive interaction and CSS | 0 | serial | pending |
| 3 | Selected Work | `sol-medium` (weight 3) | Difficult transition state/data-flow debugging and mobile re-layout | 0 | serial | pending |
| 4 | Process redesign | `terra-high` (weight 2) | Multi-file interactive section redesign | 0 | serial | pending |
| 5 | Order and chapter integration | `luna-high` (weight 1) | Small bounded integration | 1-4 | serial | pending |
| 6 | Responsive, legibility, accessibility | `terra-high` (weight 2) | Cross-section multi-file QA/fixes | 1-5 | serial | pending |
| 7 | Image delivery and performance | `terra-high` (weight 2) | Asset pipeline plus measured loading changes | 3, 5 | serial | pending |
| 8 | Motion system | `terra-high` (weight 2) | Cross-section behavior after layout stabilizes | 1-7 | serial | pending |
| 9 | SEO/discovery/404/content hygiene | `luna-max` (weight 1) | Bounded metadata/static files/link audit | 5 | serial | pending |
| 10 | Final release QA | orchestrator, optional `sol-review-high` | Integrated diff review, gates, browsers, Lighthouse | all | serial | pending |

## Completed commits

None yet.

## Gates and measurements

- Actual scripts discovered: `npm run build`, `npm run dev`, `npm run preview`; no lint or browser-test scripts exist.
- Baseline `npm run build`: PASS (45 modules; CSS 226.68 kB / 38.59 kB gzip; JS 202.74 kB / 63.10 kB gzip).
- Baseline `node --test tests/*.test.mjs`: 3 PASS, 1 FAIL. `site-footer.test.mjs` contains stale fake contact expectations (`hello@shift-labs.com`, `+20 100 000 0000`) that contradict the real configured SHIFT contact data; the failure predates this sprint.
- Baseline public image inventory: 8.44 MB total in the five largest raster originals; Kupecut PNG 4,584,694 B, Argos PNG 2,809,924 B, Hero PNG 1,383,694 B, Hero aperture PNG 1,563,694 B, portrait WebP 62,756 B. Existing WebP delivery assets are present for Hero and project images.
- User-supplied Lighthouse baseline: desktop ~93, mobile ~66. A local Lighthouse binary/setup is not present yet; final measurement approach remains pending.
- Available local executables: Google Chrome, Firefox, ffmpeg/ffprobe, ImageMagick. No WebKit/Playwright setup was found.
- Baseline Chrome captures completed at 390x844 and 1440x900. Mobile confirms a content-independent empty tail after the metadata row; desktop composition renders intact.
- Interactive browser connector exposed no available browser surface, so automated local browser QA is using installed headless browsers and will be reported as such.

## Failures / escalations

- Local Vite server initially hit sandbox `EPERM`; approved escalated localhost execution succeeded.
- Existing footer test failure is a stale-test defect, not a build failure; scheduled for content-hygiene correction without weakening real assertions.

## Blockers

None. Production domain and deployment provider remain to be discovered from repository evidence.

## Remaining work

All workstreams 1-10 above.

## Resume point

Commit this plan/progress checkpoint, then dispatch Workstream 1 (`luna-max`) with active weight 1 / 4.
