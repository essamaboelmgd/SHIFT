import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Project Brief uses a form-led, lightly framed desktop composition', () => {
  const css = read('src/components/project-brief/ProjectBriefSection.css')
  const composition = css.match(/\.project-brief__composition\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  const frame = css.match(/\.project-brief__form-frame,\s*\.project-brief__route\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  const trail = css.match(/\.project-brief__route-art \.project-brief__trail-glow\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''

  assert.match(composition, /grid-template-columns:\s*minmax\(0, 1\.34fr\)\s+minmax\(320px, 1fr\)/)
  assert.match(composition, /max-width:\s*1120px/)
  assert.match(frame, /border-radius:\s*14px/)
  assert.match(trail, /stroke-width:\s*2/)
})

test('Project Brief keeps fields and steps comfortable in the mobile flow', () => {
  const css = read('src/components/project-brief/ProjectBriefSection.css')
  const mobile = css.match(/@media \(max-width: 760px\)\s*\{([\s\S]*)/)?.[1] ?? ''

  assert.match(css, /\.project-brief__field input\s*\{[\s\S]*?min-height:\s*52px/)
  assert.match(css, /\.project-brief__option > span\s*\{[\s\S]*?min-height:\s*46px/)
  assert.match(mobile, /\.project-brief__composition\s*\{[\s\S]*?grid-template-columns:\s*1fr/)
  assert.match(mobile, /\.project-brief__form-frame\s*\{[\s\S]*?order:\s*1/)
  assert.match(mobile, /\.project-brief__route\s*\{[\s\S]*?order:\s*2/)
})
