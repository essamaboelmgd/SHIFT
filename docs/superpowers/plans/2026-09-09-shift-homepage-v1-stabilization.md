# SHIFT Homepage V1 Stabilization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use the configured delegate fleet. Each task is dispatched with a fresh, bounded brief; the orchestrator reviews every diff, reruns actual gates, and lands verified work.

**Goal:** Stabilize and launch-harden the approved Arabic-first SHIFT one-page homepage without redesigning approved sections.

**Architecture:** Preserve the existing React/Vite section component boundaries. Resolve layout and transition defects locally, then integrate order/numbering, optimize responsive image delivery, apply focused accessibility/motion/launch hygiene, and finish with measured cross-browser release QA.

**Tech Stack:** React 18, TypeScript 5.6, Vite 5, CSS, browser Web Animations API, Node test runner.

## Global Constraints

- Work only on `shift/delegated-v1-stabilization`; do not push or deploy.
- Preserve the approved desktop compositions and the functional Safari viewport fix.
- Do not invent URLs, routes, testimonials, statistics, customer data, production configuration, or backend delivery.
- Keep the final order Hero, The SHIFT, What We Build, Selected Work, Process, Why SHIFT, FAQ, Your Next Move, Footer.
- Run existing targeted tests plus `npm run build`; never weaken tests to pass.
- Respect `prefers-reduced-motion`; avoid new heavy dependencies.

---

### Task 1: Baseline and repository map

**Files:** `.delegate/OVERNIGHT_PROGRESS.md`, this plan; inspect all source, tests, assets, history, and configuration.

- [x] Record branch, HEAD, dirty state, scripts, component boundaries, asset sizes, existing links/domain evidence, and browser tooling.
- [x] Capture baseline build/tests and representative Chrome screenshots; retain the user-reported Lighthouse baseline because no local Lighthouse setup is installed.
- [x] Update the progress record with measurements and precise resume state; commit the planning checkpoint.

### Task 2: Mobile Hero resilience and composition

**Files:** `src/components/ShiftHero.tsx`, relevant Hero rules in `src/index.css`, `tests/hero-safari-layout.test.mjs`, `tests/hero-image-delivery.test.mjs`.

- [x] Add/update regression assertions for flow-based mobile height, safe areas, and eager responsive Hero image delivery.
- [x] Remove the content-independent oversized mobile minimum while retaining safe-area resilience and normal flow.
- [x] Verify desktop remains unchanged and mobile sizes 430x932 through 360px have no forced tail, clipping, overlap, or overflow.
- [x] Run targeted tests and build; review and commit.

### Task 3: What We Build responsive refinement

**Files:** `src/components/WhatWeBuildSection.tsx`, relevant rules in `src/index.css`, new targeted Node test if useful.

- [ ] Preserve service data and desktop UX while fluidly increasing selector hierarchy and breathing room.
- [ ] Replace the mobile two-column selector with full-width rows and one inline expanded active detail; keep Custom separated.
- [ ] Preserve one authoritative active-service state, keyboard/button semantics, readable touch targets, and no duplicated details.
- [ ] Run targeted tests/build, visually verify, review, and commit.

### Task 4: Selected Work transition and mobile stabilization

**Files:** `src/components/SelectedWorkSection.tsx`, relevant rules in `src/index.css`, new transition/state tests where feasible.

- [ ] Diagnose authoritative state, DOM duplication, timing, coordinate spaces, preview visibility, rapid inputs, and Next/Previous asymmetry.
- [ ] Make visual, metadata, counter, and preview derive from one transition snapshot/timeline; lock or safely queue at most one intent.
- [ ] Keep titles/metadata local with clipped fade/short vertical motion; preserve sound preview morph only where structurally valid.
- [ ] Rebuild mobile hierarchy as active visual, immediate metadata, compact preview, nearby controls; preserve swipe alternatives.
- [ ] Add subtle Kupecut `14K+ users`; show truthful live-project CTA only when a real URL exists, otherwise hide it.
- [ ] Test both directions, rapid inputs, reduced motion, keyboard/click/preview/swipe convergence, build, visual frames, review, and commit.

### Task 5: Process redesign

**Files:** `src/components/ProcessSection.tsx`, relevant rules/assets in `src/index.css` and `public/assets/` only as needed.

- [ ] Replace old conceptual copy/system with ALIGN/SHAPE/BUILD and approved Arabic copy.
- [ ] Implement desktop editorial split, interactive route markers, large active word, and three ruled rows.
- [ ] Implement native mobile stacking without cards or forced side-by-side layout.
- [ ] Ensure buttons, focus, reduced motion, and initial ALIGN state; run build/visual checks, review, and commit.

### Task 6: Homepage order and chapter integration

**Files:** `src/App.tsx` and minimal section config/component files.

- [ ] Correct order and chapter labels to 01-08; keep footer unnumbered and testimonials absent.
- [ ] Centralize numbering only where clean and low-risk; verify all section IDs/navigation targets.
- [ ] Run build/tests, review, and commit.

### Task 7: Responsive, legibility, and accessibility pass

**Files:** affected section components/styles and focused tests.

- [ ] Verify desktop sizes without speculative breakpoints; fix real tablet/mobile overflow, wrapping, clipping, section height, readability, and target sizing.
- [ ] Audit keyboard/focus, control semantics, FAQ ARIA, form labels/errors, image alt/decorative semantics, contrast, swipe alternatives, and reduced motion.
- [ ] Run automated gates plus browser keyboard/responsive checks; review and commit.

### Task 8: Measured image delivery and performance

**Files:** source image assets retained; new optimized variants under `public/assets/`; affected components and `index.html`.

- [ ] Record source dimensions/bytes and baseline Lighthouse/network behavior.
- [ ] Generate non-upscaled WebP/AVIF responsive variants with visually safe quality and stable dimensions.
- [ ] Keep Hero eager/high-priority and correctly responsive; lazy-load below fold; ensure imminent Selected Work image readiness without eager-loading all projects.
- [ ] Re-measure payload, LCP, CLS, blocking time, and Lighthouse; only address additional bottlenecks shown by measurement.
- [ ] Run tests/build, review quality/diff, and commit.

### Task 9: Coherent motion system

**Files:** section components/styles only where motion is added or consolidated.

- [ ] Apply restrained reveal/state motion using existing CSS/WAAPI patterns after layout is stable.
- [ ] Keep Selected Work on its stabilized timeline and FAQ primarily accordion-driven.
- [ ] Verify reduced motion never leaves hidden content and removes/minimizes nonessential transitions.
- [ ] Run build/browser checks, review, and commit.

### Task 10: Launch metadata, discovery, 404, and content hygiene

**Files:** `index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, icon/share assets, routing/hosting config if present, affected content/config files.

- [ ] Discover real production URL and existing approved share assets; centralize unknown deployment value instead of inventing it.
- [ ] Add truthful OG/Twitter/canonical metadata, icons/theme color, minimal supported JSON-LD, robots/sitemap/llms files.
- [ ] Implement repository-side branded 404 appropriate to actual hosting architecture and record deployment-only mapping if required.
- [ ] Remove production-visible placeholders, dead/fake links/actions/locales/routes, obsolete chapter numbers/dates; use dynamic copyright year.
- [ ] Run build/tests/link audit, review, and commit.

### Task 11: Final integrated release QA

**Files:** only targeted fixes found by QA plus `.delegate/OVERNIGHT_PROGRESS.md`.

- [ ] Re-read the integrated code and review the full branch diff/commit sequence.
- [ ] Run `git diff --check`, all existing tests, TypeScript/build, browser console inspection, keyboard/reduced-motion/rapid-navigation checks.
- [ ] Visually test requested desktop/tablet/mobile viewports in browsers actually available; record exactly what ran.
- [ ] Run final Lighthouse in the cleanest available environment and record before/after metrics and payload changes.
- [ ] Update progress with ending HEAD, commits, worktrees, gates, blockers, status, and exact next action; commit final QA record if changes are verified.
