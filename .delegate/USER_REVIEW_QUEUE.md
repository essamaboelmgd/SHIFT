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

## Responsive and Accessibility Refinement

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `623e90e`
- **What changed:** Added roving-tab-stop keyboard behavior to the What We Build tab set and raised compact Selected Work controls/mobile topline targets to a 44px minimum where the cascade had reduced them.
- **Important decisions:** Preserved the accepted Mobile Hero and What We Build visual composition. The recovery review discarded an erroneous delegate change that restored fake contact data and retained the verified real SHIFT email/WhatsApp details.
- **Automated checks:** Focused accessibility regressions passed; integrated 11-file Node suite passed; production build and diff hygiene passed.
- **Manual checks:** Navigate What We Build by Tab and arrow keys and confirm focus follows selection; inspect visible focus rings; operate Selected Work controls by mouse, keyboard, and touch; confirm target sizing and no responsive clipping at desktop, tablet, and phone widths.
- **Known limitations:** Broad assistive-technology and physical-device acceptance remains manual. The AGY browser setup was unavailable in its sandbox, so rendered checks remain part of integrated QA.
- **Related follow-up:** Recheck after motion/performance integration; performance infrastructure is currently blocked.

## SEO, Discovery, 404, and Content Hygiene

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `1864f11`
- **What changed:** Added truthful OpenGraph/Twitter text metadata, supported Organization structured data, `robots.txt`, grounded `llms.txt`, and a branded Arabic static 404. Removed dead EN language UI and stale commented placeholders; corrected footer tests to the verified contact data.
- **Important decisions:** Omitted canonical/origin-dependent URL fields, social images, sitemap URL, and schema logo because the production origin is not documented. Kept `SHIFT Creative Solutions` because PRODUCT.md explicitly supports it.
- **Automated checks:** Launch hygiene tests and all integrated Node tests passed; production build copied the static 404 and completed successfully; referenced asset and diff checks passed.
- **Manual checks:** Open `/404.html` directly and verify branding, Arabic copy, home/WhatsApp actions, focus states, and mobile layout; preview social metadata text; confirm footer shows only the real AR locale and real contact/social destinations.
- **Known limitations:** Canonical URL, absolute social image, sitemap URL, and origin-based schema fields remain deployment-only until the production domain is known.
- **Related follow-up:** Add origin-dependent discovery fields when deployment configuration is available.

## Image Delivery and Performance

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `8c57567`
- **What changed:** Replaced the two multi-megabyte Selected Work PNG delivery paths with verified existing WebPs, switched The SHIFT aperture to its existing WebP, and added accurate intrinsic dimensions plus lazy/async loading to below-fold project, aperture, and founder imagery.
- **Important decisions:** Used only existing verified assets instead of publishing nonexistent responsive candidates. Kept the Hero eager/high-priority LCP path and Selected Work’s authoritative mouse/touch/keyboard/swipe state unchanged; removed speculative preloading.
- **Automated checks:** Five focused image-delivery tests passed; all 12 integrated Node test files passed; production build and diff hygiene passed. Asset dimensions and byte sizes were independently verified.
- **Manual checks:** Scroll through The SHIFT, Selected Work, and Why SHIFT on desktop/mobile; confirm images appear without layout jumps, visual degradation, or blank frames; cycle Selected Work repeatedly and confirm current/preview images remain coherent; inspect slower-network loading if available.
- **Known limitations:** No new Lighthouse score is claimed. Existing WebPs are substantially smaller but are not width-responsive candidate sets; further responsive variants can be considered only with a reliable asset-generation pipeline.
- **Related follow-up:** Re-measure Lighthouse/network transfer during final integrated QA.

## Coherent Motion System

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `5a98ad8`
- **What changed:** Added a shared vocabulary for common interactive durations/easing, applied it selectively to navigation/CTA/Selected Work/service feedback, and strengthened the global reduced-motion path to neutralize animations, transitions, delays, and smooth scrolling.
- **Important decisions:** Kept section entrance timing and Selected Work’s specialized authoritative timeline intact where they were already tuned; removed only redundant reduced-motion overrides. No layout, content, or product state changed.
- **Automated checks:** 14 focused motion regressions passed; the full 58-test Node matrix passed; production build and diff hygiene passed.
- **Manual checks:** Scroll the full page at normal motion and confirm entrances feel restrained and related; hover/focus navigation, CTAs, service rows, Selected Work preview/link, Process controls, and FAQ; enable OS/browser reduced motion and confirm content appears immediately, controls remain usable, no ambient/entrance animation persists, and anchor navigation no longer smooth-scrolls.
- **Known limitations:** Motion taste and physical-device perception require user review; no autoplay/parallax/scroll-jacking was added.
- **Related follow-up:** Recheck motion and reduced-motion during final integrated browser QA.
