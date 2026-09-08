import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

const marker = '/* iPhone Safari: stable viewport + normal-flow primary content. */'
const start = css.indexOf(marker)
const end = css.indexOf('/* Why SHIFT', start)
const mobileHero = start >= 0 && end > start ? css.slice(start, end) : ''

test('mobile hero follows content height without reserving a viewport-sized tail', () => {
  assert.match(mobileHero, /\.shift-hero\s*\{[^}]*height:\s*auto[^}]*min-height:\s*0/s)
  assert.doesNotMatch(mobileHero, /\.shift-hero\s*\{[^}]*min-height:\s*100(?:vh|svh|dvh)/s)

  assert.match(mobileHero, /\.shift-hero__canvas\s*\{[^}]*height:\s*auto/s)
  assert.doesNotMatch(mobileHero, /\.shift-hero__canvas\s*\{[^}]*min-height:/s)
})

test('mobile hero primary copy remains in normal document flow', () => {
  assert.match(mobileHero, /\.hero-copy\s*\{[^}]*position:\s*relative[^}]*display:\s*flex[^}]*flex-direction:\s*column/s)

  for (const selector of [
    '.hero-copy__eyebrow',
    '.hero-copy h1',
    '.hero-copy__support',
    '.hero-copy__actions',
  ]) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    assert.match(mobileHero, new RegExp(`${escaped}\\s*\\{[^}]*position:\\s*static`, 's'))
  }
})

test('mobile hero canvas grows naturally and reserves iPhone safe areas', () => {
  assert.match(mobileHero, /\.shift-hero__canvas\s*\{[^}]*position:\s*relative[^}]*height:\s*auto/s)
  assert.doesNotMatch(mobileHero, /\.shift-hero__canvas\s*\{[^}]*min-height:/s)
  assert.match(mobileHero, /env\(safe-area-inset-top\)/)
  assert.match(mobileHero, /env\(safe-area-inset-bottom\)/)
  assert.match(html, /viewport-fit=cover/)
})
