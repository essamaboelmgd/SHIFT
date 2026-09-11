/**
 * motion-coherence.test.mjs
 *
 * Focused regression tests for the SHIFT homepage motion system.
 * Covers:
 *   1. Shared motion token presence in :root
 *   2. Global prefers-reduced-motion coverage (transitions + animations + scroll)
 *   3. Visibility safety — no permanent opacity:0 without a JS-gated override
 *   4. Selected Work high-risk interaction architecture preservation
 *   5. No hover-only motion for focus-visible targets (focus parity)
 */

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8').catch(() => '')

// ── 1. Shared motion vocabulary tokens ─────────────────────────────────────

test('Shared motion tokens are declared in :root', async () => {
  const css = await read('src/index.css')

  // Tokens must exist inside :root
  const root = css.match(/:root\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/)?.[1] ?? ''
  assert.match(root, /--dur-interactive:\s*180ms/)
  assert.match(root, /--dur-lift:\s*220ms/)
  assert.match(root, /--ease-out:\s*ease/)
  assert.match(root, /--ease-enter:\s*cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/)
  assert.match(root, /--ease-swipe:\s*cubic-bezier\(0\.22,\s*0\.7,\s*0\.2,\s*1\)/)
})

test('Shared tokens are used for at least the primary interactive hover transitions', async () => {
  const css = await read('src/index.css')

  // The primary-action lift, secondary-action colour+transform, and nav pill
  // transitions should reference the shared variables — not hardcode raw values.
  assert.match(css, /\.primary-action\s*\{[^}]*transition:[^}]*var\(--dur-lift\)/)
  assert.match(css, /\.secondary-action\s*\{[^}]*transition:[^}]*var\(--dur-interactive\)/)
  assert.match(css, /\.desktop-nav__pill\s+a\s*\{[^}]*transition:[^}]*var\(--dur-interactive\)/)
})

// ── 2. Global prefers-reduced-motion coverage ───────────────────────────────

test('Global reduced-motion block zeroes both transition-duration AND animation-duration', async () => {
  const css = await read('src/index.css')

  // These properties must appear inside a prefers-reduced-motion: reduce block.
  // We search across the whole file — the global block sets them on *, not a
  // single nested selector, so we just confirm they exist within any reduce block.
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?transition-duration:\s*0\.01ms\s*!important/
  )
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-duration:\s*0\.01ms\s*!important/
  )
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-iteration-count:\s*1\s*!important/
  )
})


test('Global reduced-motion block disables smooth scroll on html and on *', async () => {
  const css = await read('src/index.css')

  // html rule inside a reduced-motion block
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[^{]*\{[^}]*html[^{]*\{[^}]*scroll-behavior:\s*auto\s*!important/s
  )

  // * rule
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[^{]*\{[^}]*\*[^{]*\{[^}]*scroll-behavior:\s*auto\s*!important/s
  )
})

test('Section-local reduced-motion blocks are present for JS-gated entrance sections', async () => {
  const css = await read('src/index.css')

  // Process section — animations fire on .is-visible
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?process-route-button/)

  // What We Build — v1 elements have opacity:0 initial state; v2 resets them
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?what-build[\s\S]*?animation:\s*none\s*!important/)

  // Hero entrance animations
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?shift-hero\.is-ready[\s\S]*?animation:\s*none\s*!important/)

  // Selected Work wall transitions
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?selected-work__transition-sheet[\s\S]*?animation:\s*none\s*!important/)
})

// ── 3. Visibility safety ─────────────────────────────────────────────────────

test('What We Build v2 cascade includes a standalone topline reset to opacity 1', async () => {
  const css = await read('src/index.css')

  // The v2 layer (around line 8655) has a standalone .what-build__topline rule
  // that explicitly resets opacity:1 and animation:none, overriding the v1
  // opacity:0 assignment. Verify it exists anywhere in the file as a standalone rule.
  assert.match(
    css,
    /\.what-build__topline\s*\{[^}]*opacity:\s*1[^}]*animation:\s*none[^}]*\}/s
  )
})

test('Process section has a JS fallback that adds is-visible when IntersectionObserver is unavailable', async () => {
  const source = await read('src/components/ProcessSection.tsx')

  // The one-liner guard: if (!section || !('IntersectionObserver' in window)) { setHasEntered(true)…
  assert.match(source, /!\('IntersectionObserver' in window\)/)
  assert.match(source, /setHasEntered\(true\)/)
})

test('WhatWeBuild section has a JS fallback that adds is-visible when IntersectionObserver is unavailable', async () => {
  const source = await read('src/components/WhatWeBuildSection.tsx')

  assert.match(source, /!\('IntersectionObserver' in window\)/)
  assert.match(source, /setHasEntered\(true\)/)
})

test('Process right artwork has no stage-response animation or remount key', async () => {
  const source = await read('src/components/ProcessSection.tsx')
  const css = await read('src/index.css')
  const artwork = source.match(/function ProcessRouteArtwork\(\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  const repair = css.slice(css.lastIndexOf('/* Process — approved reference repair'))

  assert.notEqual(artwork, '', 'the fixed route component should exist')
  assert.doesNotMatch(artwork, /activeStageNumber|activeStage|activeIndex|isActive|key=/)
  assert.doesNotMatch(repair, /process-route__active-copy|process-route-copy-in/)
})

test('Project Brief entrance is observer-gated with a visible fallback', async () => {
  const source = await read('src/components/project-brief/ProjectBriefSection.tsx')
  const css = await read('src/components/project-brief/ProjectBriefSection.css')

  assert.match(source, /!\('IntersectionObserver' in window\)/)
  assert.match(source, /setHasEntered\(true\)/)
  assert.match(source, /project-brief\$\{hasEntered \? ' is-visible' : ''\}/)
  assert.match(css, /\.project-brief\.is-visible\s+\.project-brief__intro\s*\{[^}]*animation:/s)
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.project-brief\.is-visible[\s\S]*?animation:\s*none\s*!important/)
})


// ── 4. Selected Work high-risk interaction architecture preservation ──────────

test('Selected Work reduced-motion path commits immediately without running the animation timeline', async () => {
  const source = await read('src/components/SelectedWorkSection.tsx')

  // reducedMotion branch must call commitIndex directly (no animation wait)
  assert.match(source, /reducedMotion[^\n]*\n[^\n]*commitIndex/)
})

test('Selected Work wall animations use --selected-work-duration custom property so they can be tuned independently', async () => {
  const css = await read('src/index.css')

  // v2 and v3 walls use the custom property
  assert.match(css, /var\(--selected-work-duration,\s*680ms\)/)
  assert.match(css, /var\(--selected-work-exit-duration,\s*520ms\)/)
})

// ── 5. Focus parity — focus-visible targets must not rely on hover alone ─────

test('Selected Work preview sheet has focus-visible state that mirrors hover state', async () => {
  const css = await read('src/index.css')

  // preview-arrow must be shown on :focus-visible, not hover alone
  assert.match(
    css,
    /selected-work__preview-sheet:(?:hover|focus-visible)[^{]*selected-work__preview-sheet:(?:focus-visible|hover)/s
  )
})

test('Selected Work controls provide focus-visible feedback', async () => {
  const css = await read('src/index.css')

  assert.match(css, /\.selected-work__controls\s+button:focus-visible/)
})

test('FAQ accordion trigger has focus-visible colour feedback', async () => {
  const css = await read('src/index.css')

  assert.match(css, /\.faq-section__trigger:focus-visible/)
})

// ── 6. No hover-only motion-critical transform without focus-visible parity ──

test('What We Build service-card hover transform also applies on focus-visible', async () => {
  const css = await read('src/index.css')

  // The two selectors must appear adjacent (service card hover + focus-visible)
  assert.match(css, /what-build__service-card:hover[^{]*,\s*\n?[^{]*what-build__service-card:focus-visible/)
})
