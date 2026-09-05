# Your Next Move Project Brief Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the configurable `08 / YOUR NEXT MOVE` conversion section with an accessible project brief form, honest environment-aware submission states, and an editorial three-step follow-up route.

**Architecture:** Keep form types, validation, payload construction, and adapter resolution in a pure TypeScript model covered by Node tests. A dedicated React component owns UI state and imports a uniquely scoped stylesheet, leaving only one import/render patch in `App.tsx`; production without a real adapter renders an explicit unavailable state and can never report fake success.

**Tech Stack:** React 18, TypeScript 5.6, Node 22 test runner, CSS, Vite 5, existing SHIFT tokens and fonts.

## Global Constraints

- Current chapter is `08 / YOUR NEXT MOVE`; keep the number in configuration so future Client Proof insertion can change it without markup changes.
- Mock success is allowed only when `import.meta.env.DEV` or test mode is explicit.
- Production without a real adapter must disable submission and show an honest unconnected message.
- Do not add a backend, dependency, alert, modal, promise of response time, icon cards, or heavy animation.
- Mobile order is headline, form, then What Happens Next.
- Do not alter previous sections.
- Re-read `App.tsx` immediately before integration because other agents are active.

---

### Task 1: Form model, validation, and safe adapter resolution

**Files:**
- Create: `src/components/project-brief/projectBriefModel.ts`
- Create: `tests/projectBriefModel.test.ts`

**Interfaces:**
- Produces: `ProjectType`, `ContactMethod`, `ProjectBriefValues`, `ProjectBriefPayload`, `ProjectBriefErrors`, `ProjectBriefSubmissionAdapter`, `validateProjectBrief`, `toProjectBriefPayload`, `resolveProjectBriefAdapter`, and `createDevelopmentMockAdapter`.
- Consumes: no React or browser APIs.

- [ ] **Step 1: Write failing model tests**

Cover required fields, email validation, phone validation, payload metadata, development mock success, production unconnected mode, and production injected-adapter mode using Node's `node:test` and `node:assert/strict`.

- [ ] **Step 2: Verify the tests fail for the missing model**

Run:

```bash
node --test tests/projectBriefModel.test.ts
```

Expected: failure because `projectBriefModel.ts` does not exist.

- [ ] **Step 3: Implement the pure model**

Define literal unions for six project types and three contact methods. Return Arabic field errors from `validateProjectBrief`. Build payloads with `locale: 'ar'` and `source: 'homepage-project-brief'`. Resolve adapters as:

- injected adapter → connected in every environment;
- no adapter + development/test flag → development mock;
- no adapter + production flag → unconnected, with no submit function.

- [ ] **Step 4: Verify the model tests pass**

Run `node --test tests/projectBriefModel.test.ts` and expect all tests to pass.

### Task 2: Accessible React form and state flow

**Files:**
- Create: `src/components/project-brief/projectBriefConfig.ts`
- Create: `src/components/project-brief/ProjectBriefSection.tsx`

**Interfaces:**
- Consumes: model exports from Task 1.
- Produces: default `ProjectBriefSection` component accepting optional `submissionAdapter` and `chapterNumber` props.

- [ ] **Step 1: Add a failing source contract check**

Run a Node assertion that expects the missing component to contain `08`, `aria-live`, `aria-invalid`, all six project options, all three contact methods, and `أرسل تفاصيل مشروعك`; expect exit code 1.

- [ ] **Step 2: Create structured section configuration**

Store chapter number `08`, labels, project options, contact options, and three route steps in `projectBriefConfig.ts`. Keep option values equal to the literal unions from Task 1.

- [ ] **Step 3: Implement the component**

Build one semantic `<section id="contact">` containing chapter line, centered headline, form, and route ledger. Use controlled inputs, fieldsets/legends for option groups, explicit labels, helper text, inline field errors, and an `aria-live` status region. On invalid submit, focus the first invalid control. On loading, disable duplicate submit. On success, replace the form body with the supplied confirmation. On adapter rejection, preserve values and show a retryable Arabic error. In unconnected production mode, keep fields available but disable the CTA and show the explicit unavailable message.

- [ ] **Step 4: Verify the source contract**

Run the same Node assertion and expect exit code 0.

### Task 3: Isolated SHIFT visual treatment and responsive layout

**Files:**
- Create: `src/components/project-brief/ProjectBriefSection.css`
- Modify: `src/components/project-brief/ProjectBriefSection.tsx` only to import the stylesheet.

**Interfaces:**
- Consumes: `project-brief` class namespace and global SHIFT variables.
- Produces: desktop two-column form/route layout, tablet stacking threshold, and mobile form-first layout.

- [ ] **Step 1: Confirm the stylesheet does not exist**

Run a source assertion for `.project-brief` in the missing stylesheet and expect exit code 1.

- [ ] **Step 2: Build the desktop composition**

Use `min(92%, 1480px)`, deep black/warm surface, subtle structural grid, centered headline, minimal route curve, one primary form frame, and a quieter route ledger. Use line-based fields and compact option buttons; orange is reserved for selected/focus/error signal and CTA.

- [ ] **Step 3: Build tablet and mobile layouts**

Stack before columns become cramped. At 760px and below, preserve DOM order headline → form → route, use full-width controls and at least 44px tap targets, prevent horizontal overflow, and keep Arabic alignment intentional.

- [ ] **Step 4: Verify stylesheet contract**

Assert the stylesheet contains `.project-brief`, `.project-brief__form`, `.project-brief__route`, `.project-brief__option[aria-checked='true']`, and the mobile media query; expect exit code 0.

### Task 4: Conflict-aware integration and complete verification

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: default `ProjectBriefSection` export.
- Produces: Project Brief mounted after the latest existing homepage section.

- [ ] **Step 1: Re-read shared state immediately before editing**

Run `git status --short`, read the full current `App.tsx`, and compare it with the earlier snapshot. Preserve every import and section added by other agents.

- [ ] **Step 2: Add only the integration lines**

Import `ProjectBriefSection` and render it after the current final content section. Do not edit `index.css`; styles remain isolated in the component stylesheet.

- [ ] **Step 3: Run automated verification**

Run:

```bash
node --test tests/projectBriefModel.test.ts
npm run build
git diff --check
```

Expected: all model tests pass, Vite production build exits 0, and diff check is silent.

- [ ] **Step 4: Test behavior in the browser**

At desktop and 390px: submit empty, verify Arabic errors and first-invalid focus; select every project/contact option; verify contact label/type changes; submit development mock and inspect loading/success; inject a rejecting adapter in a local test path and inspect retryable error; verify keyboard navigation and no overflow.

- [ ] **Step 5: Verify production honesty**

Run a production preview with no injected adapter. Confirm the CTA is disabled, the unconnected message is visible, and success cannot be reached.

- [ ] **Step 6: Run one Impeccable detector pass**

Run the detector only against `ProjectBriefSection.tsx`, `ProjectBriefSection.css`, and `projectBriefConfig.ts`; batch-fix mechanical accessibility, hierarchy, contrast, and responsive findings without altering earlier sections.

## Self-Review

- Spec coverage: chapter configuration, all fields/options, validation, four connected states, production-unconnected state, payload, injectable adapter, route steps, responsive order, and integration isolation are mapped to Tasks 1–4.
- Placeholder scan: no TBD, TODO, deferred behavior, or unspecified error handling remains.
- Type consistency: config values use Task 1 literal unions; the component accepts the same adapter signature; payload metadata matches the approved schema.
