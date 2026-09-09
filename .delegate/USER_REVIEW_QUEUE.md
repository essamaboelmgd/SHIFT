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

- **Status:** `USER_REJECTED / REOPENED — REPAIR IN PROGRESS`
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

