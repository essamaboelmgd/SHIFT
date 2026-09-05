# Why SHIFT Partner Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive `06 / WHY SHIFT` homepage chapter that presents SHIFT as a calm, responsible partner through a balanced editorial split, a real founder portrait, and a three-principle rail.

**Architecture:** A new data-driven React component owns the section copy, portrait metadata, and principle records. `App.tsx` mounts it directly after Process, while a single scoped CSS block in `index.css` supplies the desktop split, restrained portrait frame, editorial rail, and mobile reflow without changing existing section styles.

**Tech Stack:** React 18, TypeScript 5.6, CSS, Vite 5, existing SHIFT design tokens and fonts.

## Global Constraints

- Use only the supplied real founder portrait; do not alter the face or synthesize image details.
- Use `#050505`, `#FDFBF9`, `#FE5E0E`, existing muted colors, IBM Plex Sans Arabic, and configured English fonts.
- Keep the section static except for restrained focus/hover feedback.
- Desktop split stays near 50/50; mobile order is content, portrait, principles.
- Principles are one editorial rail without cards or icons.
- Do not modify existing homepage sections unless technically necessary.
- Do not add dependencies or backend/CMS integration.

---

### Task 1: Prepare the portrait asset and data-driven section component

**Files:**
- Create: `public/assets/why-shift/founder-portrait.webp`
- Create: `src/components/WhyShiftSection.tsx`

**Interfaces:**
- Consumes: existing global CSS variables `--font-arabic`, `--font-body`, `--shift-orange`, `--shift-paper`, and `--shift-line`.
- Produces: default React component `WhyShiftSection`; root section id `why-shift`; CSS namespace `why-shift`; immutable config objects `whyShiftContent`, `founder`, and `principles`.

- [ ] **Step 1: Establish the expected component contract**

Run this source assertion before creating the component:

```bash
node -e "const fs=require('fs'); const p='src/components/WhyShiftSection.tsx'; if(!fs.existsSync(p)) process.exit(1)"
```

Expected: exit code 1 because the component does not exist yet.

- [ ] **Step 2: Optimize the supplied portrait without changing its content**

Create `public/assets/why-shift/founder-portrait.webp` from `/tmp/codex-clipboard-769a4b89-560a-4334-8ad9-22fd9d5a7242.png` at high quality. Preserve the original aspect ratio and do not crop or retouch the source asset; cropping belongs to CSS through `object-fit` and `object-position`.

- [ ] **Step 3: Build the semantic component from structured data**

Create `WhyShiftSection.tsx` with:

```tsx
const whyShiftContent = {
  chapter: '06 / WHY SHIFT',
  context: 'THE SHIFT / THE PARTNER',
  eyebrow: 'مش مجرد تنفيذ.',
  headline: ['مش بتتعامل مع تسليم.', 'بتتعامل مع شريك.'],
  body: [
    'من أول فهم الهدف لحد الإطلاق، بنفضل قريبين من القرار والشغل نفسه.',
    'مش مجرد تنفيذ وتسليم، لكن مسؤولية عن إن الحل يخدم المرحلة اللي شغلك فيها.',
  ],
} as const

const founder = {
  image: '/assets/why-shift/founder-portrait.webp',
  alt: 'مؤسس SHIFT في بورتريه بإضاءة دافئة وخلفية داكنة',
} as const

const principles = [
  { label: '01 / DIRECT', title: 'تواصل مباشر', body: 'تتعامل معانا مباشرة، من غير طبقات تعطل القرار.' },
  { label: '02 / OWNERSHIP', title: 'مسؤولية كاملة', body: 'بنتعامل مع المشروع كمسؤولية، مش مجرد قائمة مهام.' },
  { label: '03 / LONG VIEW', title: 'تفكير للمرحلة الجاية', body: 'بنبني الحل عشان يكمل مع شغلك، مش بس عشان يوم الإطلاق.' },
] as const
```

Render a semantic `section`, chapter `header`, content block, `figure` with the real portrait, and one `ol` principles rail. Keep Arabic containers RTL and English micro labels LTR.

- [ ] **Step 4: Verify the component contract**

Run:

```bash
node -e "const s=require('fs').readFileSync('src/components/WhyShiftSection.tsx','utf8'); for(const token of ['06 / WHY SHIFT','THE SHIFT / THE PARTNER','01 / DIRECT','02 / OWNERSHIP','03 / LONG VIEW','founder-portrait.webp']) if(!s.includes(token)) throw new Error(token)"
```

Expected: exit code 0.

### Task 2: Create the Quiet Partner Stage visual system

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: the `why-shift` class structure from Task 1 and existing root design tokens.
- Produces: isolated desktop, tablet, mobile, focus, and reduced-motion rules for the new section only.

- [ ] **Step 1: Confirm the style namespace is absent**

Run:

```bash
node -e "const s=require('fs').readFileSync('src/index.css','utf8'); if(s.includes('.why-shift {')) process.exit(1)"
```

Expected: exit code 0 before styles are added.

- [ ] **Step 2: Add the desktop editorial composition**

Append one final scoped CSS block that:

- gives `.why-shift` a `#050505`-based warm background with a very low-opacity structural grid;
- uses the existing `min(92%, 1480px)` desktop canvas convention;
- renders the chapter line with a thin rule and orange chapter label;
- creates a near 50/50 split for `.why-shift__main`;
- keeps the headline larger and higher contrast than the portrait;
- uses a controlled portrait aspect ratio, subtle color treatment, thin frame, one clipped/notched corner, and one small orange marker;
- renders `.why-shift__principles` as a single three-column rail with only thin separators.

- [ ] **Step 3: Add tablet and mobile behavior**

At tablet widths, preserve balanced columns and fluid type. At `max-width: 760px`, change to one column in DOM order: content, portrait, principles; cap portrait height; stack principles vertically; replace vertical separators with horizontal rules; keep side padding aligned with the other mobile sections. At `max-width: 380px`, reduce side padding without shrinking labels below readable size.

- [ ] **Step 4: Verify visual safety rules in source**

Run:

```bash
node -e "const s=require('fs').readFileSync('src/index.css','utf8'); for(const token of ['.why-shift {','.why-shift__main','.why-shift__portrait','.why-shift__principles','@media (max-width: 760px)']) if(!s.includes(token)) throw new Error(token)"
```

Expected: exit code 0.

### Task 3: Integrate after Process and verify the complete section

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: default export `WhyShiftSection` from Task 1.
- Produces: homepage order ending with `ProcessSection` followed immediately by `WhyShiftSection`.

- [ ] **Step 1: Establish the missing integration check**

Run before editing `App.tsx`:

```bash
node -e "const s=require('fs').readFileSync('src/App.tsx','utf8'); if(!s.includes('<WhyShiftSection />')) process.exit(1)"
```

Expected: exit code 1.

- [ ] **Step 2: Mount the new section**

Import `WhyShiftSection` from `./components/WhyShiftSection` and render `<WhyShiftSection />` immediately after `<ProcessSection />`. Do not reorder or edit the existing sections.

- [ ] **Step 3: Run static and production checks**

Run:

```bash
npm run build
git diff --check
```

Expected: TypeScript and Vite build successfully; `git diff --check` prints no errors.

- [ ] **Step 4: Perform direct browser verification**

Start the local site and inspect the Process-to-Why-SHIFT transition at desktop widths 1280, 1440, and 1600; tablet width 768; and mobile widths 390 and 360. Confirm: headline dominance, near 50/50 desktop balance, real portrait integrity, controlled mobile portrait height, content-image-principles mobile order, intentional RTL, no overflow, no cards/icons, and no regressions in existing sections.

- [ ] **Step 5: Check runtime health**

Reload the page at desktop and 390px, inspect the browser console, and confirm there are no React warnings, asset 404s, layout overflow, or runtime errors.

- [ ] **Step 6: Run Impeccable detection on changed implementation files**

Run the Impeccable detector against `src/components/WhyShiftSection.tsx`, `src/App.tsx`, and the new Why SHIFT block in `src/index.css`. Apply only findings that improve hierarchy, RTL clarity, accessibility, responsive behavior, or consistency with the existing SHIFT system.

## Self-Review

- Spec coverage: all content, portrait, visual-system, architecture, responsiveness, motion, and quality requirements map to Tasks 1–3.
- Placeholder scan: no TBD, TODO, deferred implementation, or unspecified error-handling steps remain.
- Type consistency: `WhyShiftSection` is the default export consumed by `App.tsx`; all planned CSS selectors share the `why-shift` namespace; config property names are consistent across component and checks.
