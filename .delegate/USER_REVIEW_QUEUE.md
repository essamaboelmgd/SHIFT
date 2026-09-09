# SHIFT Homepage V1 User Review Queue

This queue distinguishes automated verification from explicit user acceptance. New user-visible work remains pending until manually accepted.

## Mobile Hero

- **Status:** `USER_ACCEPTED`
- **Commit SHA:** `1ae2619`
- **What changed:** Restored content-sized mobile Hero flow while preserving the approved desktop composition and Safari-safe behavior.
- **Automated checks:** Targeted Hero tests, production build, responsive Chromium checks, and overflow inspection passed in the prior run.
- **Manual result:** Accepted by the user before this resumed run.
- **Follow-up:** Reopen only if a later integrated change causes a regression.

## What We Build

- **Status:** `USER_ACCEPTED`
- **Commit SHA:** `d4b0685`
- **What changed:** Refined the responsive service explorer with full-width mobile rows and one authoritative active detail.
- **Automated checks:** Targeted tests, production build, responsive Chromium checks, interaction checks, and overflow inspection passed in the prior run.
- **Manual result:** Accepted by the user before this resumed run.
- **Follow-up:** Reopen only if a later integrated change causes a regression.

## Selected Work

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING` (`USER_REJECTED / REOPENED`, repaired)
- **Repair commit SHA:** `e975620`
- **Previous commit SHA:** `744a22e`
- **Reason reopened:** Normal desktop mouse clicks on NEXT and PREV do not respond, although Device Mode interaction works. The prior mobile composition was also rejected as insufficiently redesigned.
- **Required repair outcome:** Preserve one authoritative project state across mouse, touch/pointer, keyboard, swipe, counter, image, metadata, and preview. Deliver a deliberate mobile hierarchy in which the active visual dominates, metadata immediately follows, the next-project preview is compact and secondary, and controls remain nearby.
- **Manual checks after repair:**
  - Desktop mouse: NEXT and PREV work with a normal physical mouse; several cycles work; hit areas feel normal; no dead zone.
  - Desktop transition: image, title, metadata, counter, and preview remain coherent with no clipping, crossing, or flashing.
  - Mobile: composition is materially improved; active visual dominates; metadata follows immediately; preview is secondary; controls are easy to reach; swipe works; no excessive height or overflow.
- **Automated checks required before review:** Real-coordinate CDP mouse press/release at 1440x900 and another desktop viewport with center hit-testing and multiple cycles; Device Mode/touch; keyboard; swipe; synchronization; targeted tests; build; responsive visual review.
- **Known limitations:** Physical-mouse acceptance remains a user review item even after CDP real-coordinate mouse verification.
- **Dependencies:** Blocks final order/integration acceptance, responsive/accessibility finalization, motion finalization, and release QA.

## Process Redesign

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `706ecaa`
- **What changed:** Reworked the existing ALIGN / SHAPE / BUILD scaffold into one authoritative interactive route. ALIGN is the initial state; route markers and ruled rows update the active word, number, progress, emphasis, signal, and supporting copy together. Mobile rows use normal vertical flow.
- **Important decisions:** Native buttons and `aria-pressed` provide pointer/keyboard activation; visible marker glyphs retain their scale inside 44px hit targets; the existing Arabic copy and dark/orange editorial language are preserved.
- **Automated checks:** Focused Process test and production build passed. Real-coordinate Chromium checks at 1440×900 and 390×844 cycled all stages; the settled marker hit boxes were 44×44; no horizontal overflow was found.
- **Manual checks:** Confirm desktop hierarchy and route-marker feel; activate ALIGN/SHAPE/BUILD through markers and rows; keyboard-tab and activate each control; verify mobile vertical composition at phone widths; confirm no clipping and that motion feels restrained.
- **Known limitations:** Final visual taste and physical pointer/touch feel require user review. The full Node suite still contains the known stale footer expectation pending content hygiene.
- **Related follow-up:** Chapter number will be corrected during order integration; cross-section reduced-motion/accessibility will be rechecked later.

## Homepage Order and Chapter Integration

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `41adb40`
- **What changed:** Corrected the rendered sequence to Hero, The SHIFT, What We Build, Selected Work, Process, Why SHIFT, FAQ, Your Next Move, Footer; corrected Process to chapter 05 and the Hero About navigation target to `#why-shift`.
- **Important decisions:** Preserved existing section IDs and labels; kept Footer unnumbered and testimonials absent; avoided redesign/style changes.
- **Automated checks:** Focused order/chapter/static-ID/hash audit passed; production build passed; full suite had only the known stale footer expectation.
- **Manual checks:** Scroll the complete page and confirm the narrative sequence; use desktop/mobile navigation links; confirm chapter numbers 01–08 and no testimonial section.
- **Known limitations:** The stale footer test is deferred to the launch/content-hygiene workstream; final integrated navigation/visual acceptance remains pending.
- **Related follow-up:** Recheck after performance, accessibility, launch hygiene, and motion integration.
