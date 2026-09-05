# SHIFT Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved SHIFT footer as a responsive, accessible, data-configured closing surface.

**Architecture:** A dedicated `SiteFooter` component renders content from `siteFooterConfig.ts` and owns no interaction state. A colocated stylesheet contains the complete visual implementation under the `.site-footer` namespace. `App.tsx` receives only one import and one final render node.

**Tech Stack:** React 18, TypeScript, scoped CSS, Node test runner, Vite.

## Global Constraints

- Preserve the approved reference composition and the existing SHIFT visual system.
- Use `/logo/wordmark-white.png`; never recreate the wordmark with text.
- Do not render social platforms whose URL is empty.
- Keep English locale switching visibly unavailable rather than faking navigation.
- Do not modify existing homepage sections.

---

### Task 1: Footer contract and configuration

**Files:**
- Create: `tests/site-footer.test.mjs`
- Create: `src/components/site-footer/siteFooterConfig.ts`

**Interfaces:**
- Produces: `siteFooterConfig`, `footerNavigation`, `footerSocialLinks`, and their inferred readonly item shapes.

- [ ] **Step 1: Write the failing source-contract test**

Assert the semantic footer/nav contract, real logo path, dynamic year, safe external links, hidden empty social URLs, required anchors, and isolated `.site-footer` styles.

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/site-footer.test.mjs`
Expected: FAIL because the footer files do not exist.

- [ ] **Step 3: Add the config**

Use temporary replaceable values `hello@shift-labs.com` and `+20 100 000 0000`. Store a normalized WhatsApp URL beside the display value. Keep social URLs as empty strings until real values are supplied.

### Task 2: Semantic footer component

**Files:**
- Create: `src/components/site-footer/SiteFooter.tsx`

**Interfaces:**
- Consumes: config exports from Task 1.
- Produces: default `SiteFooter` component.

- [ ] **Step 1: Implement the approved hierarchy**

Render brand area, divider, navigation, contact/social/language groups, decorative geometry, and bottom baseline. Filter social links with `Boolean(item.url)` and compute `new Date().getFullYear()`.

- [ ] **Step 2: Run the contract test**

Run: `node --test tests/site-footer.test.mjs`
Expected: component checks pass while style/integration checks still fail.

### Task 3: Responsive visual implementation

**Files:**
- Create: `src/components/site-footer/SiteFooter.css`

**Interfaces:**
- Consumes: `.site-footer` markup from Task 2.
- Produces: desktop, tablet, mobile, hover/focus, and reduced-motion styles.

- [ ] **Step 1: Implement desktop composition**

Match the approved 1480px canvas rhythm, asymmetric brand row, signal divider, horizontal navigation separators, three information areas, quiet edge linework, and final baseline.

- [ ] **Step 2: Implement responsive reflow**

At tablet, rebalance columns; below 760px, follow the required linear content order and switch navigation to two columns without changing DOM meaning.

### Task 4: Integration and verification

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SiteFooter` default export.
- Produces: `<SiteFooter />` immediately after `<ProjectBriefSection />`.

- [ ] **Step 1: Re-read and minimally patch App**

Preserve all concurrent edits and add only the import and final render node.

- [ ] **Step 2: Verify**

Run: `node --test tests/site-footer.test.mjs`, `npm run build`, and `git diff --check`. Run Impeccable detector on footer files. Inspect 1440×900, 1366×768, 768px tablet, and 390px mobile when browser control is available; check links, focus, console, and horizontal overflow.
