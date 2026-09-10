import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('chapter labels expose one shared typography and rule vocabulary', async () => {
  const css = await read('src/index.css')

  assert.match(css, /--shift-chapter-size:\s*clamp\(/)
  assert.match(css, /--shift-chapter-weight:\s*\d+/)
  assert.match(css, /--shift-chapter-tracking:\s*[^;]+;/)
  assert.match(css, /--shift-chapter-section-color:\s*[^;]+;/)
  assert.match(css, /--shift-chapter-context-color:\s*[^;]+;/)
  assert.match(css, /--shift-chapter-rule-color:\s*[^;]+;/)
  assert.match(css, /--shift-chapter-rule-width:\s*1px/)
  assert.match(css, /--shift-chapter-rule-gap:\s*[^;]+;/)

  const sharedLayer = css.slice(css.lastIndexOf('/* Shared chapter label vocabulary'))
  for (const selector of [
    '.desktop-meta',
    '.shift-signal__eyebrow',
    '.what-build__meta--section',
    '.selected-work__meta--section',
    '.process-section__chapter',
    '.why-shift__chapter',
    '.faq-section__chapter-index',
  ]) {
    assert.match(sharedLayer, new RegExp(selector.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&')))
  }

  assert.match(sharedLayer, /\.project-brief__topline\s+p/)
  assert.match(sharedLayer, /\.project-brief__chapter/)
  assert.match(sharedLayer, /\.process-section__rail\s*>\s*span\s*\{[^}]*height:\s*var\(--shift-chapter-rule-width\)[^}]*background:\s*var\(--shift-chapter-rule-color\)/s)
})

test('chapter labels keep the approved 01–08 source order and copy', async () => {
  const [app, hero, shift, build, work, process, why, faq, brief] = await Promise.all([
    read('src/App.tsx'),
    read('src/components/ShiftHero.tsx'),
    read('src/components/TheShiftSection.tsx'),
    read('src/components/WhatWeBuildSection.tsx'),
    read('src/components/SelectedWorkSection.tsx'),
    read('src/components/ProcessSection.tsx'),
    read('src/components/WhyShiftSection.tsx'),
    read('src/components/FaqSection.tsx'),
    read('src/components/project-brief/ProjectBriefSection.tsx'),
  ])

  assert.match(hero, /SHIFT \/ DIGITAL PARTNER \/ 01/)
  assert.match(shift, /02\s*\/\s*THE SHIFT/)
  assert.match(build, /03\s*&?nbsp;?\s*\/\s*&?nbsp;?\s*WHAT WE BUILD/)
  assert.match(work, /04\s*&?nbsp;?\s*\/\s*&?nbsp;?\s*SELECTED WORK/)
  assert.match(process, /05\s*\/\s*PROCESS/)
  assert.match(why, /06\s*\/\s*WHY SHIFT/)
  assert.match(faq, /chapterNumber = '07'/)
  assert.match(brief, /chapterNumber = projectBriefSectionConfig\.chapterNumber/)

  const approvedOrder = [
    '<ShiftHero',
    '<TheShiftSection',
    '<WhatWeBuildSection',
    '<SelectedWorkSection',
    '<ProcessSection',
    '<WhyShiftSection',
    '<FaqSection chapterNumber="07" />',
    '<ProjectBriefSection chapterNumber="08" />',
  ]
  let previousPosition = -1
  for (const marker of approvedOrder) {
    const position = app.indexOf(marker)
    assert.ok(position > previousPosition, `homepage order changed around ${marker}`)
    previousPosition = position
  }
})
