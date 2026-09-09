import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8').catch(() => '')

test('Selected Work uses one authoritative timeline without portal or duplicated content layers', async () => {
  const source = await read('src/components/SelectedWorkSection.tsx')

  assert.match(source, /type WorkTimeline =/)
  assert.match(source, /progress: number/)
  assert.match(source, /const displayIndex = getDisplayIndex\(timeline\)/)
  assert.equal((source.match(/<ProjectFooter/g) ?? []).length, 1)
  assert.equal((source.match(/className="selected-work__active-sheet"/g) ?? []).length, 1)
  assert.doesNotMatch(source, /createPortal|flushSync|TransitionOverlay|geometryRef|outgoingFooterRef|incomingFooterRef/)
})

test('Selected Work routes every interaction through the same locked navigation path', async () => {
  const source = await read('src/components/SelectedWorkSection.tsx')

  assert.match(source, /const navigate = useCallback/)
  assert.match(source, /if \(transitionLockRef\.current\) return/)
  assert.match(source, /onClick=\{\(\) => navigate\(1\)\}/)
  assert.match(source, /onStep=\{navigate\}/)
  assert.match(source, /navigate\(delta < 0 \? 1 : -1\)/)
  assert.match(source, /navigate\(1\)/)
  assert.match(source, /navigate\(-1\)/)
  assert.match(source, /document\.visibilityState === 'hidden'/)
  assert.match(source, /reducedMotion[\s\S]*commitIndex/)
})

test('Selected Work reserves pointer capture for touch swipe tracking so mouse button clicks retain their native target', async () => {
  const source = await read('src/components/SelectedWorkSection.tsx')

  assert.match(source, /if \(event\.pointerType !== 'touch'\) return/)
  assert.match(source, /event\.currentTarget\.setPointerCapture\?\.\(event\.pointerId\)/)
  assert.doesNotMatch(source, /if \(event\.pointerType === 'mouse' && event\.button !== 0\) return[\s\S]{0,220}setPointerCapture/)
})

test('Selected Work keeps truthful project links and proof', async () => {
  const source = await read('src/components/SelectedWorkSection.tsx')

  assert.match(source, /proof: '14K\+ users'/)
  assert.doesNotMatch(source, /slug: 'argossecops'[\s\S]{0,220}proof:/)
  assert.match(source, />شوف المشروع</)
  assert.doesNotMatch(source, /VIEW CASE STUDY|CASE STUDY \/|caseStudyUrl/)
  assert.match(source, /projectUrl: 'https:\/\/kupecut\.com'/)
  assert.doesNotMatch(source, /projectUrl: 'https:\/\/argossecops\.net'/)
})

test('Selected Work mobile flow is active visual, local metadata, preview, then controls', async () => {
  const [source, css] = await Promise.all([
    read('src/components/SelectedWorkSection.tsx'),
    read('src/index.css'),
  ])
  const visual = source.indexOf('className="selected-work__visuals"')
  const footer = source.indexOf('className="selected-work__stage-footer"')
  const preview = source.indexOf('<PreviewSheet')
  const controls = source.indexOf('className="selected-work__control-rail"')

  assert.ok(visual > 0 && visual < footer && footer < preview && preview < controls)
  assert.match(css, /\/\* Selected Work stabilization — coherent timeline and mobile flow\. \*\//)
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.selected-work__stage-footer\s*\{[\s\S]*order:\s*2/)
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.selected-work__preview-sheet\s*\{[\s\S]*order:\s*3/)
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.selected-work__control-rail\s*\{[\s\S]*order:\s*4/)
  assert.match(css, /\.selected-work__visuals\s*\{[\s\S]*aspect-ratio:\s*1\.28/)
  assert.match(css, /\.selected-work__stage-footer\s*\{[\s\S]*min-height:\s*clamp\(140px, 42vw, 158px\)/)
  assert.match(css, /\.selected-work__preview-sheet\s*\{[\s\S]*width:\s*min\(66%, 250px\)[\s\S]*height:\s*88px/)
  assert.match(css, /overflow-x:\s*clip/)
})
