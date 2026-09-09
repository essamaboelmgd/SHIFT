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
