# SHIFT Final Frontend Manual-Review Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver four bounded reference-led frontend repairs without reopening accepted sections or changing product behavior.

**Architecture:** Four isolated task branches own Process, Project Brief, Footer mobile, and shared chapter-label consistency. The orchestrator reviews and commits each diff, then integrates them sequentially and delegates targeted rendered QA.

**Tech Stack:** React 18, TypeScript, Vite, component CSS plus the existing global CSS cascade, Node test runner.

## Global Constraints

- Work from integration commit `864e7e1` in isolated worktrees.
- Do not change backend, routing architecture, page order, approved images, sticky-nav concept, or accepted-section composition.
- Process right artwork is fixed and independent of selected stage.
- Project Brief model, validation, payload, and adapter contracts are immutable.
- Footer desktop icon presentation is immutable.
- Chapter consistency changes typography/rules only, not section geometry.
- Workers do not commit; the orchestrator reviews, verifies, and lands.

---

### Task 1: Process Static Reference Composition

**Files:**
- Modify: `src/components/ProcessSection.tsx`
- Modify: `src/index.css`
- Test: `tests/process-section.test.mjs`
- Test: `tests/motion-coherence.test.mjs`

**Interfaces:**
- Consumes: current `processStages` content and `activeStageNumber` left-row state.
- Produces: a static right artwork whose DOM/content does not depend on `activeStage` or `activeIndex`.

- [ ] Add a failing source-contract test that the right artwork contains fixed ALIGN/01 content and no active-stage interpolation.
- [ ] Run `node --test tests/process-section.test.mjs` and confirm the new assertion fails.
- [ ] Refactor Process markup so state drives only left progress/row emphasis; rebuild the fixed reference artwork and preserve mobile order.
- [ ] Run `node --test tests/process-section.test.mjs tests/motion-coherence.test.mjs`, `npm run build`, and `git diff --check`.

### Task 2: Restore Project Brief Composition

**Files:**
- Modify: `src/components/project-brief/ProjectBriefSection.css`
- Modify only if structurally required: `src/components/project-brief/ProjectBriefSection.tsx`
- Test: `tests/projectBriefVisual.test.mjs`
- Test: `tests/projectBriefModel.test.ts`

**Interfaces:**
- Consumes: unchanged form values, errors, adapter, validation, payload, and next-step configuration.
- Produces: form-primary desktop grid and full-height companion steps panel; form-first mobile flow.

- [ ] Inspect `git show 915c6b7:src/components/project-brief/ProjectBriefSection.css` and later history to identify the strongest prior approved proportions.
- [ ] Add failing visual-contract assertions for companion-panel height/distribution and mobile order.
- [ ] Restore the prior visual direction and expand internal step distribution without changing form behavior.
- [ ] Run Project Brief model/visual tests, `npm run build`, and `git diff --check`.

### Task 3: Mobile Footer Recomposition

**Files:**
- Modify: `src/components/site-footer/SiteFooter.css`
- Test: `tests/site-footer.test.mjs`

**Interfaces:**
- Consumes: unchanged Footer markup, configuration, social icons, and desktop rules.
- Produces: mobile-only ordered vertical composition.

- [ ] Add a failing responsive CSS contract for the intended mobile sequence and spacing.
- [ ] Rewrite only mobile media-query rules; preserve desktop selectors and icon sizing.
- [ ] Run Footer/accessibility tests, `npm run build`, and `git diff --check`.

### Task 4: Shared Chapter Label Vocabulary

**Files:**
- Modify: `src/index.css`
- Modify only if necessary: `src/components/project-brief/ProjectBriefSection.css`
- Modify only if necessary: `src/components/site-footer/SiteFooter.css`
- Test: `tests/chapter-label-consistency.test.mjs`

**Interfaces:**
- Consumes: existing chapter/context markup in accepted and repaired sections.
- Produces: shared CSS tokens and selector-level typography/rule consistency without geometry changes.

- [ ] Add a failing test for shared chapter tokens and explicit coverage of recurring chapter selectors.
- [ ] Add shared tokens and a final minimal selector family; preserve per-section positioning and copy.
- [ ] Run chapter/order/accepted-section focused tests, `npm run build`, and `git diff --check`.

### Integration and QA

- [ ] Review every terminal diff and reject scope expansion.
- [ ] Commit each verified logical task separately and cherry-pick into `shift/final-frontend-repair`.
- [ ] Resolve only isolated shared-CSS append conflicts.
- [ ] Run `node --test tests/*.test.mjs tests/*.test.ts`, `npm run build`, and `git diff --check`.
- [ ] Delegate targeted Chrome rendering for Process, Project Brief, Footer mobile, and chapter labels at 1440×900, 390×844, and one intermediate width; inspect accepted sections for regression without redesign.
- [ ] Record all visual work as `AUTO_VERIFIED — USER_REVIEW_PENDING`.
