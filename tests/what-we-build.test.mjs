import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8').catch(() => '')

test('What We Build keeps one authoritative active detail inside the selected service row', async () => {
  const component = await read('src/components/WhatWeBuildSection.tsx')

  assert.match(component, /const \[activeSlug, setActiveSlug\] = useState\('business'\)/)
  assert.match(component, /const renderDetail = \(option: \(typeof buildOptions\)\[number\]\)/)
  assert.match(component, /className=\{`what-build__selector-item\$\{isActive \? ' is-active' : ''\}`\}/)
  assert.match(component, /\{isActive \? renderDetail\(option\) : null\}/)
  assert.equal((component.match(/className="what-build__detail"/g) ?? []).length, 1)
  assert.match(component, /role="tablist"/)
  assert.match(component, /role="tabpanel"/)
})

test('What We Build final refinement preserves desktop split placement and removes the mobile two-column selector', async () => {
  const css = await read('src/index.css')
  const marker = '/* What We Build responsive refinement. */'
  const refinement = css.slice(css.lastIndexOf(marker))

  assert.ok(refinement.length > marker.length, 'final refinement block is missing')
  assert.match(refinement, /@media \(min-width: 900px\)[\s\S]*\.what-build__selector,[\s\S]*display: contents/)
  assert.match(refinement, /\.what-build__selector-item\s*\{[\s\S]*display: contents/)
  assert.match(refinement, /@media \(max-width: 899px\)[\s\S]*\.what-build__selector,[\s\S]*display: block/)
  assert.match(refinement, /@media \(max-width: 899px\)[\s\S]*\.what-build__selector-item\s*\{[\s\S]*display: block/)
  assert.doesNotMatch(refinement, /grid-template-columns:\s*repeat\(2/)
  assert.match(refinement, /\.what-build__selector-english\s*\{[\s\S]*font-size:\s*clamp\(/)
  assert.match(refinement, /\.what-build__selector-result\s*\{[\s\S]*font-size:\s*clamp\(/)
  assert.match(refinement, /\.what-build__selector-number\s*\{[\s\S]*font-size:\s*clamp\(/)
  assert.match(refinement, /\.what-build__selector-tab\s*\{[\s\S]*min-height:\s*clamp\(/)
})
