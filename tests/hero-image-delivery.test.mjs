import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const component = readFileSync(new URL('../src/components/ShiftHero.tsx', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

const responsiveCandidates = [480, 900, 1280, 1672]

test('hero artwork exposes every optimized responsive candidate', () => {
  for (const width of responsiveCandidates) {
    assert.match(component, new RegExp(`shift-glass-field-${width}\\.webp ${width}w`))
  }

  assert.match(component, /srcSet=\{HERO_ARTWORK_MOBILE_SRC_SET\}/)
  assert.match(component, /srcSet=\{HERO_ARTWORK_DESKTOP_SRC_SET\}/)
  assert.match(component, /sizes=\{HERO_ARTWORK_SIZES\}/)
})

test('both hero artwork instances are stable high-priority LCP images', () => {
  const artworkCount = component.match(/<HeroArtwork/g)?.length ?? 0
  const eagerCount = component.match(/loading="eager"/g)?.length ?? 0
  const priorityCount = component.match(/fetchPriority="high"/g)?.length ?? 0
  const asyncCount = component.match(/decoding="async"/g)?.length ?? 0
  const dimensionCount = component.match(/width=\{1672\}[\s\S]*?height=\{941\}/g)?.length ?? 0

  assert.equal(artworkCount, 2)
  assert.equal(eagerCount, 1)
  assert.equal(priorityCount, 1)
  assert.equal(asyncCount, 1)
  assert.equal(dimensionCount, 1)
})

test('document preloads one media-matched responsive WebP candidate', () => {
  const preloads = html.match(/<link\s+[^>]*rel="preload"[^>]*as="image"[^>]*>/g) ?? []
  const mobilePreload = preloads.find((link) => link.includes('media="(max-width: 899px)"')) ?? ''
  const desktopPreload = preloads.find((link) => link.includes('media="(min-width: 900px)"')) ?? ''

  assert.equal(preloads.length, 2)
  assert.match(mobilePreload, /type="image\/webp"/)
  assert.match(mobilePreload, /fetchpriority="high"/)
  assert.match(mobilePreload, /imagesrcset="[^"]*shift-glass-field-480\.webp 480w[^"]*shift-glass-field-1280\.webp 1280w[^"]*"/)
  assert.doesNotMatch(mobilePreload, /shift-glass-field-1672\.webp/)
  assert.match(desktopPreload, /shift-glass-field-1672\.webp 1672w/)
  assert.match(desktopPreload, /imagesizes="100vw"/)
})
