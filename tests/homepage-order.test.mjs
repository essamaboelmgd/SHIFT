import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

const sourceFiles = [
  'src/App.tsx',
  'src/components/ShiftHero.tsx',
  'src/components/TheShiftSection.tsx',
  'src/components/WhatWeBuildSection.tsx',
  'src/components/SelectedWorkSection.tsx',
  'src/components/ProcessSection.tsx',
  'src/components/WhyShiftSection.tsx',
  'src/components/FaqSection.tsx',
  'src/components/project-brief/ProjectBriefSection.tsx',
  'src/components/project-brief/projectBriefConfig.ts',
  'src/components/site-footer/SiteFooter.tsx',
  'src/components/site-footer/siteFooterConfig.ts',
]

test('homepage renders the approved section order without testimonials', async () => {
  const app = await read('src/App.tsx')
  const order = [
    '<ShiftHero',
    '<TheShiftSection',
    '<WhatWeBuildSection',
    '<SelectedWorkSection',
    '<ProcessSection',
    '<WhyShiftSection',
    '<FaqSection',
    '<ProjectBriefSection',
    '<SiteFooter',
  ]

  const positions = order.map((component) => app.indexOf(component))
  assert.ok(positions.every((position) => position >= 0), 'all approved sections must be rendered')
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
  assert.doesNotMatch(app, /testimonial/i)
  assert.doesNotMatch(app, /chapterNumber="09"/)
})

test('homepage chapter labels use the approved 01–08 sequence', async () => {
  const sources = await Promise.all(sourceFiles.map(read))
  const [app, hero, shift, build, work, process, why, faq, brief, briefConfig] = sources

  assert.match(hero, /SHIFT \/ DIGITAL PARTNER \/ 01/)
  assert.match(shift, /02\s*\/\s*THE SHIFT/)
  assert.match(build, /03(?:&nbsp;|\s)*\/\s*(?:&nbsp;|\s)*WHAT WE BUILD/)
  assert.match(work, /04(?:&nbsp;|\s)*\/(?:&nbsp;|\s)*SELECTED WORK/)
  assert.match(process, /05\s*\/\s*PROCESS/)
  assert.doesNotMatch(process, /03\s*\/\s*PROCESS/)
  assert.match(why, /06\s*\/\s*WHY SHIFT/)
  assert.match(faq, /chapterNumber = '07'/)
  assert.match(briefConfig, /chapterNumber: '08'/)
  assert.match(app, /<FaqSection chapterNumber="07" \/>/)
  assert.match(app, /<ProjectBriefSection chapterNumber="08" \/>/)
})

test('all static internal homepage hashes resolve to one preserved id', async () => {
  const files = await readdir(new URL('../src', import.meta.url), { recursive: true })
  const source = await Promise.all(files.filter((file) => /\.(tsx?|css)$/.test(file)).map((file) => read(`src/${file}`)))
  const combined = source.join('\n')
  const idMatches = [...combined.matchAll(/\bid="([a-z][a-z0-9-]*)"/g)].map((match) => match[1])
  const ids = new Set(idMatches)
  const duplicateIds = idMatches.filter((id, index) => idMatches.indexOf(id) !== index)
  const hashes = new Set([...combined.matchAll(/(?:href\s*:\s*|href\s*=\s*|querySelector\s*\()\s*[`']#([a-z][a-z0-9-]*)/g)].map((match) => match[1]))

  assert.deepEqual(duplicateIds, [])
  assert.deepEqual([...hashes].filter((hash) => !ids.has(hash)), [])
  for (const id of ['top', 'the-shift', 'services', 'work', 'process', 'why-shift', 'faq', 'contact']) {
    assert.equal(ids.has(id), true, `missing preserved section id: ${id}`)
  }
})
