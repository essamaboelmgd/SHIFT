# The SHIFT Responsive Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fixed/scaled Premium Signal implementation with a responsive, fluid The SHIFT section that follows the approved Figma visual composition.

**Architecture:** Keep the section isolated in `TheShiftSection.tsx` and give it a fresh CSS namespace. The component renders the same exported artwork assets in semantic groups; CSS controls the desktop two-column layout and mobile stacked layout using grid/flex and fluid sizing. `App.tsx` remains the single consumer.

**Tech Stack:** React 18, TypeScript, Vite, plain CSS in `src/index.css`, existing local PNG/SVG assets.

## Global Constraints

- No fixed Figma artboard or JavaScript-driven `scale()` layout.
- No new dependencies.
- Desktop must keep copy left/artwork right and a lower three-stage rail.
- Mobile must stack artwork, copy, progress, and capability rows without horizontal overflow.
- Use Satoshi, Inter, and IBM Plex Sans Arabic according to the project font contract.

---

### Task 1: Replace the section component markup

**Files:**
- Modify: `src/components/TheShiftSection.tsx`
- Modify: `src/App.tsx` only if the component export or id changes
- Delete: `src/components/PremiumSignalSection.tsx` if it remains unreferenced after the replacement

**Interfaces:**
- Consumes existing local assets under `public/assets`.
- Produces the `TheShiftSection` React component rendered by `App`.

- [ ] **Step 1: Write the failing structural check**

Run a source-level assertion that the replacement has no scale implementation and still exposes the required semantic hooks:

```bash
! rg -n "useLayoutEffect|ResizeObserver|frame-scale|transform:.*scale" src/components/TheShiftSection.tsx
rg -n "the-shift-section__artwork|the-shift-section__copy|the-shift-section__progress|the-shift-section__capability-rail" src/components/TheShiftSection.tsx
```

The first command fails against the current implementation because it still contains `useLayoutEffect`, `ResizeObserver`, and `frame-scale`.

- [ ] **Step 2: Run it to verify it fails**

Run the commands above and confirm the forbidden scale symbols are found before replacement.

- [ ] **Step 3: Write the minimal replacement component**

Remove resize state/effects and render a fluid section with separate desktop/mobile artwork pictures, semantic copy, handoff labels, progress markers, and capability rows. Keep decorative images `aria-hidden` and give the aperture group a descriptive `role="img"` label.

- [ ] **Step 4: Run the structural check to verify it passes**

Run the same `rg` commands and confirm no scale symbols remain while all required hooks are present.

- [ ] **Step 5: Commit**

```bash
git add src/components/TheShiftSection.tsx src/App.tsx src/components/PremiumSignalSection.tsx
git commit -m "refactor: rebuild the shift section markup"
```

### Task 2: Rebuild fluid responsive styling

**Files:**
- Modify: `src/index.css` (replace the existing `.the-shift-section` block)

**Interfaces:**
- Consumes the class hooks from Task 1.
- Produces desktop and mobile layouts with no JavaScript scaling and no horizontal overflow.

- [ ] **Step 1: Write the failing style checks**

```bash
! rg -n "the-shift-frame-scale|\.the-shift-section__frame|transform: translate\(-50%, -50%\) scale" src/index.css
rg -n "grid-template-columns|@media \(max-width: 599px\)|the-shift-section__progress" src/index.css
```

The first command fails before the CSS replacement because the old fixed frame and scale variable exist.

- [ ] **Step 2: Run the checks to verify they fail**

Confirm the old frame/scale selectors are present before editing.

- [ ] **Step 3: Implement the fluid CSS**

Use a responsive section shell, a desktop grid with fluid artwork sizing, absolute decorative layers anchored to that grid, and a mobile single-column flow. Use `clamp()` for type and spacing, keep the progress line and markers on the same containing block, and make the capability rail a three-column desktop grid that becomes three ordered rows on mobile.

- [ ] **Step 4: Run the checks and build**

```bash
! rg -n "the-shift-frame-scale|\.the-shift-section__frame|transform: translate\(-50%, -50%\) scale" src/index.css
git diff --check
npm run build
```

Expected: no forbidden selectors, no whitespace errors, and a successful TypeScript/Vite build.

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "style: make the shift section fluid and responsive"
```

### Task 3: Verify viewport behavior and remove dead legacy section

**Files:**
- Modify: `src/App.tsx` if any old Premium Signal import remains
- Delete: `src/components/PremiumSignalSection.tsx` when unreferenced
- Modify: `src/index.css` to remove only unused legacy Premium Signal rules if they are not consumed elsewhere

**Interfaces:**
- Leaves `TheShiftSection` as the only rendered second section.

- [ ] **Step 1: Verify the rendered tree and overflow contract**

```bash
! rg -n "PremiumSignalSection|premium-signal" src/App.tsx src/components src/index.css
git diff --check
npm run build
```

- [ ] **Step 2: Inspect responsive checkpoints**

Check the running page at 390px, 768px, 1440px, and 1920px widths. Confirm the aperture remains on the right on desktop, the copy remains readable, the mobile rail is vertical, and `document.documentElement.scrollWidth === window.innerWidth`.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/components/PremiumSignalSection.tsx src/index.css
git commit -m "chore: remove unused premium signal implementation"
```
