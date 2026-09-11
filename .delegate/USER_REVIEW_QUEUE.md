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

## Final Integrated Release Candidate

- **Status:** `AUTO_VERIFIED — USER REVIEW PENDING`
- **Commit SHA:** `5a98ad8` (integrated implementation HEAD before this QA ledger)
- **What changed:** No additional product change; this card covers the integrated Homepage V1 stabilization result across ordering, interactions, accessibility, performance, motion, discovery, and 404 behavior.
- **Important decisions:** Automated/browser verification is evidence, not user acceptance. Mobile Hero and What We Build remain previously accepted; Selected Work remains repaired but pending physical-device review.
- **Automated checks:** All 13 Node test files and production build passed. Chrome/CDP verified real-coordinate mouse NEXT/PREV at 1440×900 and 1280×800 for three cycles each, keyboard navigation, 390×844 touch swipe/mobile hierarchy, synchronized project state, reduced motion, zero horizontal overflow, and the static 404 response.
- **Manual checks:** Review the complete homepage narrative and chapter order; repeat Selected Work NEXT/PREV with a normal physical mouse for several cycles and confirm no dead zone/flashing/desync; verify the deliberate mobile Selected Work hierarchy and swipe on a phone; activate What We Build and Process with pointer/keyboard; inspect focus states, image loading, and motion with reduced motion both off and on; open the branded 404 and verify real links.
- **Known limitations:** Physical hardware feel and subjective visual/motion acceptance remain yours. No deployment or fresh Lighthouse score was performed. Origin-dependent SEO/social fields await a production domain.
- **Related follow-up:** Mark individual cards `USER_ACCEPTED` only after explicit manual confirmation; add deployment-origin metadata during the deployment workflow.

## Final Frontend Repair Round — Process

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commits:** `ab3b257`, `5fc00bc`
- **Changes:** Rebuilt section 05 around the approved editorial split and route reference; retained only ALIGN / SHAPE / BUILD with the approved Arabic content and coherent stage selection. The targeted QA repair fixed the RTL-induced desktop mirroring so editorial content/stages sit left and the route sits right; mobile remains a deliberate linear composition.
- **Automated/rendered checks:** Process and motion tests pass. Chrome rendered checks covered desktop and mobile, real pointer and keyboard stage changes, 0/50/100% progress synchronization, reduced motion, and overflow. Targeted recheck confirmed the reference orientation at 1920×1080 and 1440×900 and coherent mobile cycling at 390×844.
- **Manual review:** Compare desktop directly with the approved Process reference; cycle all stages by pointer and keyboard; inspect the route, active copy, hierarchy, and phone layout.

## Final Frontend Repair Round — Project Brief

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `12bc20e`
- **Changes:** Refined panel proportions, centered heading hierarchy, thin framing, fields/options, CTA, and mobile order while preserving the complete frontend form model, validation, payload adapter boundary, and success/error behavior. Mobile places the form before What Happens Next.
- **Automated/rendered checks:** Model and visual-contract tests pass. Chrome desktop/mobile renders, pointer field/option use, validation focus/error behavior, local development success state, touch sizing, overflow, and reduced-motion visibility were checked.
- **Manual review:** Compare desktop with the approved Project Brief reference; inspect mobile scanning order, field comfort, helper/error text, CTA weight, and the form/steps relationship.

## Final Frontend Repair Round — Footer

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `feb31ca`
- **Changes:** Replaced social abbreviations with platform icons for the five real configured URLs, retained safe external-link attributes and dynamic year, and tightened mobile hierarchy/spacing without rebuilding the footer.
- **Automated/rendered checks:** Footer tests pass. Chrome mobile render and center hit-testing confirmed all five social links are visible, enabled, HTTPS, and 44px targets with no overflow.
- **Manual review:** Inspect mobile stacking and vertical length; verify each real social destination and hover/focus treatment.

## Final Frontend Repair Round — Compact Sticky Navbar

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commits:** `feb31ca`, `4a5c421`
- **Changes:** Added a separate post-Hero compact navigation using the real logo and existing anchors. Desktop shows compact links/CTA; mobile uses an accessible menu with Escape, outside-click, and selection closing. Added stable anchor offsets; Hero navigation itself was not redesigned.
- **Automated/rendered checks:** Accessibility/order/anchor tests pass. Chrome verified hidden-in-Hero and stable post-Hero states, real pointer menu use, Escape and selection close, valid destinations, and Process/Contact landing clearance on desktop/mobile.
- **Manual review:** Scroll through the Hero threshold; use every desktop anchor; open/close the mobile menu and confirm the compact state feels native and stable.

## Final Frontend Repair Round — Motion

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `3fbf615`
- **Audit:** Existing Hero drift/entrance, Selected Work timeline, What We Build state feedback, FAQ accordion, shared timing tokens, and global reduced-motion coverage were retained. Footer remains nearly static; Sticky Nav already had a restrained entrance.
- **Changes:** Added only a keyed 180ms Process active-copy/gate response and a subtle observer-gated Project Brief structural entrance with visible fallbacks. Reduced-motion paths force complete visible content and remove transitions.
- **Manual review:** Judge the Process change response and Project Brief entrance at normal motion; enable reduced motion and confirm immediate complete content.

## Final Frontend Repair Round — Launch Hygiene

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `34b99e8`
- **Changes:** Corrected `llms.txt` to the approved #050505 / #111111 / #FDFBF9 / #FE5E0E palette while preserving current one-page services, work, process, and contact facts. Robots remains crawlable. No fake sitemap/domain was published because no production origin exists in repository evidence. The approved 404 was not redesigned.
- **Automated checks:** Launch tests pass; production build copies `public/404.html` byte-for-byte to `dist/404.html`; referenced assets and home navigation remain valid.
- **Deployment-only:** Once the real production origin/provider is known, create a one-URL homepage sitemap, add its absolute URL to robots, add origin-dependent canonical/social/schema fields if desired, and verify unknown routes return the approved page with a true HTTP 404 rather than an SPA 200 fallback.

## Final Frontend Repair Round — Rendered QA

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Candidate:** `5fc00bc`
- **Full rendered matrix:** Chrome at 1920×1080, 1536×864, 1440×900, 1366×768, 1280×800, 1280×720, 1024×768, 768×1024, 430×932, 393×852, 390×844, 375×812, and 360×800. Firefox static renders at 1440×900 and 390×844; Firefox interaction assertions were not claimed because its headless anchor captures painted too early.
- **Initial blockers:** Process desktop orientation mirrored; sticky anchors concealed section starts; Chrome warned about Hero `fetchPriority` casing.
- **Repairs/recheck:** `5fc00bc` fixed Process orientation and `4a5c421` fixed anchor offset plus emitted lowercase `fetchpriority` without changing Hero layout. Targeted Chrome recheck at 1920×1080, 1440×900, and 390×844 confirmed all three fixes, zero console errors/warnings/page errors, no horizontal overflow, coherent mobile Process cycling, safe anchor landings, and reduced-motion completeness.
- **Final repository gates:** `node --test tests/*.test.mjs tests/*.test.ts` — 15/15 suites pass; `npm run build` — pass (46 modules); `cmp public/404.html dist/404.html` — pass; `git diff --check` — pass.
- **Known limitations:** Visual taste, physical-device feel, and explicit user acceptance remain manual. Four local image requests were aborted only during immediate QA reload/resize navigation; final renders contained the assets and no console/page error occurred.

## Focused Manual Review Repair — Process Static Artwork

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `40f5cff`
- **Changes:** Kept the restrained left-side ALIGN / SHAPE / BUILD selection, but fully separated the approved right-side ALIGN route artwork from stage state. The artwork no longer changes, remounts, or animates when a stage row is selected.
- **Automated/rendered checks:** Process/motion contracts and the full Node suite pass. Chrome at 1440×900, 768×900, and 390×844 verified the editorial split/stacked mobile layout and no overflow. Real pointer selection cycled ALIGN → SHAPE → BUILD while identical artwork crop hashes confirmed the right composition stayed fixed.
- **Manual review:** Compare desktop directly with the approved Process reference; select all three left rows and confirm only left-side emphasis/progress changes; inspect the intentional mobile stack.

## Focused Manual Review Repair — Project Brief Composition

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `1a1e83a`
- **Changes:** Recovered the stronger prior visual direction with richer framing, headline signal, field and CTA treatment. The What Happens Next panel now uses a full-height flex/grid composition with evenly distributed steps while the form model, validation, payload, and adapter remain unchanged.
- **Automated/rendered checks:** The existing Project Brief contract and full Node suite pass. Chrome at 1440×900 showed a primary 629px form column and equal-height 469px companion panel; 390×844 preserved headline → form → steps order with comfortable controls and no overflow.
- **Manual review:** Confirm the desktop form remains primary while the companion panel feels complete; inspect mobile hierarchy, field comfort, error/help text, and CTA weight.

## Focused Manual Review Repair — Footer Mobile

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `ee00aed`
- **Changes:** Reorganized only the mobile breakpoint into a compact brand → navigation → contact → social → language → baseline flow. Existing real links, five social icons, and desktop styling remain intact.
- **Automated/rendered checks:** Footer contracts and full Node suite pass. Chrome at 390×844 confirmed clean stacking, five 44×44px social targets, and no overlap or horizontal overflow; 1440×900 confirmed the desktop structure remains intact.
- **Manual review:** Inspect mobile grouping, vertical length, contact wrapping, social alignment, and closing baseline; spot-check desktop for unchanged proportions.

## Focused Manual Review Repair — Chapter Labels

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Commit:** `9db71ed`
- **Changes:** Added one shared typography/color/rule vocabulary for the recurring number / slash / English label family while preserving each section's established positioning and geometry. No section copy or order changed.
- **Automated/rendered checks:** A new consistency/order regression contract and all 15 checked-in Node test files pass. Chrome at 1440×900 and 390×844 confirmed consistent Inter 600 labels at 10px/9px with coherent tracking; Selected Work retains its intentional mobile-hidden chapter label.
- **Manual review:** Scan chapters 01–08 for a coherent family while confirming accepted section layouts remain unchanged.

## Focused Manual Review Repair — Final Rendered QA

- **Status:** `AUTO_VERIFIED — USER_REVIEW_PENDING`
- **Candidate:** `9db71ed`
- **Browser/viewports:** Google Chrome 151.0.7922.71 at 1440×900, 768×900, and 390×844.
- **Result:** All four focused workstreams passed targeted rendered review; accepted Hero, The SHIFT, What We Build, Selected Work, Why SHIFT, and FAQ showed no obvious regression. Every tested viewport had `scrollWidth === clientWidth`; the console had zero errors/exceptions.
- **Notes:** Chrome emitted one timing warning for the existing Hero `shift-glass-field-900.webp` preload. This round did not reopen accepted Hero delivery. A raw QA scroll that forcibly aligned Process exactly to viewport top could place its rail below the fixed nav; the tested real sticky-nav anchor path retains the previously verified landing offset.
- **Final gates:** `node --test tests/*.test.mjs` — 15/15 test files pass; `npm run build` — pass (46 modules); `git diff --check` — pass; `cmp public/404.html dist/404.html` — pass.
