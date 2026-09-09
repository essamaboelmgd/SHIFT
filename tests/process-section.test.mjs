import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('Process starts at ALIGN and derives its interactive route from one active stage', async () => {
  const source = await read('src/components/ProcessSection.tsx')

  assert.match(source, /const \[activeStageNumber, setActiveStageNumber\] = useState\('01'\)/)
  assert.match(source, /const activeStage = processStages\.find\(\(stage\) => stage\.number === activeStageNumber\)/)
  assert.match(source, /onClick=\{\(\) => onSelect\(stage\.number\)\}/)
  assert.match(source, /aria-pressed=\{isActive\}/)
  assert.match(source, /ACTIVE \/ \{activeStage\.number\}/)
  assert.match(source, />\{activeStage\.code\}</)
  assert.doesNotMatch(source, /active:\s*(true|false)/)
})

test('Process styles keep controls focusable, motion-safe, and mobile in normal flow', async () => {
  const css = await read('src/index.css')

  assert.match(css, /\.process-route-button:focus-visible/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*process-route-button/)
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.process-route-board\s*\{[\s\S]*height:\s*auto/)
})

test('Process route-marker buttons use 44px hit areas without scaling their glyphs', async () => {
  const css = await read('src/index.css')
  const markerControls = css.slice(css.lastIndexOf('/* Process interaction refinement'))

  assert.match(markerControls, /width:\s*44px/)
  assert.match(markerControls, /height:\s*44px/)
  assert.match(markerControls, /transform:\s*translate\(-50%, -50%\)/)
  assert.match(markerControls, /\.process-route-signature__marker\.process-route-button img\s*\{[\s\S]*width:\s*20px[\s\S]*height:\s*20px/)
  assert.match(markerControls, /@media \(max-width: 899px\)[\s\S]*width:\s*14px[\s\S]*height:\s*14px/)
})
