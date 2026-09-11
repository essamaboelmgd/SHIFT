import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

test('fixed-nav section anchors reserve one shared scroll offset', () => {
  assert.match(css, /--shift-anchor-offset:\s*88px/)

  const targetRule = css.match(
    /#services,\s*#work,\s*#process,\s*#why-shift,\s*#contact\s*\{([^}]*)\}/
  )

  assert.ok(targetRule, 'all sticky-nav section targets should share one rule')
  assert.match(targetRule[1], /scroll-margin-top:\s*var\(--shift-anchor-offset\)/)
})
