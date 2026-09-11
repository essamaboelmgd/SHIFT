import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('What We Build uses a roving tab stop and moves focus with arrow navigation', () => {
  const component = read('src/components/WhatWeBuildSection.tsx')

  assert.match(component, /role="tab"/)
  assert.match(component, /aria-selected=\{isActive\}/)
  assert.match(component, /tabIndex=\{isActive \? 0 : -1\}/)
  assert.match(component, /document\.getElementById\(`build-tab-\$\{nextOption\.slug\}`\)\?\.focus\(\)/)
})

test('compact interactive controls retain 44px minimum touch targets', () => {
  const css = read('src/index.css')

  assert.match(css, /\.what-build__topline\s*\{[^}]*min-height:\s*44px/)
  const selectedWorkControlRules = css.match(/\.selected-work__controls button\s*\{[^}]*min-height:\s*44px/g) ?? []
  assert.ok(selectedWorkControlRules.length >= 3)
})

test('verified contact details are preserved', () => {
  const config = read('src/components/site-footer/siteFooterConfig.ts')

  assert.match(config, /shift\.software\.eg@gmail\.com/)
  assert.match(config, /\+20 155 6538 323/)
  assert.match(config, /https:\/\/wa\.me\/201556538323/)
  assert.doesNotMatch(config, /hello@shift-labs\.com|\+20 100 000 0000/)
})

test('compact sticky navigation has accessible disclosure behavior and real anchors', () => {
  const component = read('src/components/StickyNav.tsx')
  const css = read('src/index.css')

  assert.match(component, /IntersectionObserver/)
  assert.match(component, /setIsVisible\(!entry\.isIntersecting\)/)
  assert.match(component, /aria-expanded=\{menuOpen\}/)
  assert.match(component, /aria-controls="sticky-nav-menu"/)
  assert.match(component, /aria-hidden=\{!isVisible\}/)
  assert.match(component, /tabIndex=\{isVisible \? undefined : -1\}/)
  assert.match(component, /tabIndex=\{menuOpen \? undefined : -1\}/)
  assert.match(component, /event\.key === 'Escape'/)
  assert.match(component, /contains\(event\.target as Node\)/)
  assert.match(component, /href: '#work'/)
  assert.match(component, /href: '#services'/)
  assert.match(component, /href: '#process'/)
  assert.match(component, /href: '#why-shift'/)
  assert.match(component, /href: '#contact'/)
  assert.match(component, /\/logo\/wordmark-white\.png/)
  assert.match(css, /Sticky Nav/)
  assert.match(css, /\.sticky-nav\s*\{[^}]*visibility:\s*hidden/)
  assert.match(css, /\.sticky-nav\.is-visible\s*\{[^}]*visibility:\s*visible/)
  assert.match(css, /\.sticky-nav__toggle\s*\{[^}]*min-height:\s*44px/)
})
