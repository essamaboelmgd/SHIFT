import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import test from 'node:test'

const selectedWorkSource = readFileSync(
  new URL('../src/components/SelectedWorkSection.tsx', import.meta.url),
  'utf8'
)
const theShiftSource = readFileSync(
  new URL('../src/components/TheShiftSection.tsx', import.meta.url),
  'utf8'
)
const whyShiftSource = readFileSync(
  new URL('../src/components/WhyShiftSection.tsx', import.meta.url),
  'utf8'
)
const heroSource = readFileSync(
  new URL('../src/components/ShiftHero.tsx', import.meta.url),
  'utf8'
)

test('Selected Work, Aperture, and Why Shift use verified existing WebP assets without nonexistent responsive sources', () => {
  // Selected Work uses verified WebP paths
  assert.match(selectedWorkSource, /image:\s*'\/assets\/selected-work\/kupecut\.webp'/)
  assert.match(selectedWorkSource, /image:\s*'\/assets\/selected-work\/argos\.webp'/)

  // Selected Work does not reference nonexistent AVIF variants or speculative srcset
  assert.doesNotMatch(selectedWorkSource, /\.avif/)
  assert.doesNotMatch(selectedWorkSource, /avifSrcSet/)
  assert.doesNotMatch(selectedWorkSource, /webpSrcSet/)
  assert.doesNotMatch(selectedWorkSource, /<picture/)
  assert.doesNotMatch(selectedWorkSource, /<source/)
  assert.doesNotMatch(selectedWorkSource, /480w|800w|1200w|1600w|3814w|5096w/)

  // Aperture uses verified existing WebP and does not reference nonexistent AVIF/responsive files
  assert.match(theShiftSource, /desktopAperture = '\/assets\/shift-premium-signal-aperture\.webp'/)
  assert.doesNotMatch(theShiftSource, /\.avif/)
  assert.doesNotMatch(theShiftSource, /APERTURE_AVIF_SRC_SET/)
  assert.doesNotMatch(theShiftSource, /APERTURE_WEBP_SRC_SET/)
  assert.match(theShiftSource, /<img[\s\S]*?className="shift-signal__aperture"[\s\S]*?src=\{desktopAperture\}/)

  // Why Shift founder portrait uses verified existing WebP without nonexistent candidates
  assert.match(whyShiftSource, /image:\s*'\/assets\/why-shift\/founder-portrait\.webp'/)
  assert.doesNotMatch(whyShiftSource, /\.avif/)
  assert.doesNotMatch(whyShiftSource, /600w|1122w/)
  assert.doesNotMatch(whyShiftSource, /<picture/)
})

test('Hero remains eager/high-priority while below-fold images are lazy and async', () => {
  // Hero artwork must remain eager and high priority LCP
  assert.match(heroSource, /loading="eager"/)
  assert.match(heroSource, /fetchpriority:\s*['"]high['"]/)
  assert.match(heroSource, /decoding="async"/)

  // Selected Work image must be lazy and async, NOT high fetchPriority
  assert.match(selectedWorkSource, /loading="lazy"/)
  assert.match(selectedWorkSource, /decoding="async"/)
  assert.doesNotMatch(selectedWorkSource, /fetchpriority="high"/)

  // TheShift aperture must be lazy and async, NOT high fetchPriority
  assert.match(theShiftSource, /loading="lazy"/)
  assert.match(theShiftSource, /decoding="async"/)
  assert.doesNotMatch(theShiftSource, /fetchpriority="high"/)

  // WhyShift portrait must be lazy and async
  assert.match(whyShiftSource, /loading="lazy"/)
  assert.match(whyShiftSource, /decoding="async"/)
})

test('Images specify stable intrinsic dimensions matching actual raster pixels', () => {
  // Selected Work dimensions matching actual WebP rasters (Kupecut: 5096x2588, Argos: 3814x1934)
  assert.match(selectedWorkSource, /width:\s*5096,\s*height:\s*2588/)
  assert.match(selectedWorkSource, /width:\s*3814,\s*height:\s*1934/)
  assert.match(selectedWorkSource, /width=\{project\.width\}/)
  assert.match(selectedWorkSource, /height=\{project\.height\}/)

  // Aperture dimensions matching actual WebP raster (1254x1254)
  assert.match(theShiftSource, /width=\{1254\}[\s\S]*?height=\{1254\}/)

  // Founder portrait dimensions matching actual WebP raster (1122x1402)
  assert.match(whyShiftSource, /width:\s*1122,\s*height:\s*1402/)
  assert.match(whyShiftSource, /width=\{founder\.width\}[\s\S]*?height=\{founder\.height\}/)
})

test('Selected Work preserves single authoritative navigation, fallback, proof, and link behavior without speculative preloading', () => {
  // Speculative preloader removed
  assert.doesNotMatch(selectedWorkSource, /new Image\(\)/)
  assert.doesNotMatch(selectedWorkSource, /preloader\.src/)

  // Single authoritative preview sheet
  assert.match(selectedWorkSource, /<PreviewSheet[\s\S]*?project=\{previewProject\}/)

  // Reliable image error fallback
  assert.match(selectedWorkSource, /const FALLBACK_IMAGE = '\/assets\/shift-glass-field\.png'/)
  assert.match(selectedWorkSource, /onError=\{handleImageError\}/)
  assert.match(selectedWorkSource, /if \(!image\.src\.endsWith\(FALLBACK_IMAGE\)\) image\.src = FALLBACK_IMAGE/)

  // Truthful proof and link behaviors
  assert.match(selectedWorkSource, /proof: '14K\+ users'/)
  assert.match(selectedWorkSource, /projectUrl: 'https:\/\/kupecut\.com'/)
})

test('Every referenced local asset in production components exists on disk with nonzero size', () => {
  const sources = [
    { name: 'SelectedWorkSection.tsx', content: selectedWorkSource },
    { name: 'TheShiftSection.tsx', content: theShiftSource },
    { name: 'WhyShiftSection.tsx', content: whyShiftSource },
    { name: 'ShiftHero.tsx', content: heroSource },
  ]

  const assetRegex = /(?:\/assets|\/logo)\/[^\s'",]+/g
  const referencedPaths = new Set()

  for (const { content } of sources) {
    let match
    while ((match = assetRegex.exec(content)) !== null) {
      referencedPaths.add(match[0])
    }
  }

  assert.ok(referencedPaths.size > 0, 'Should find referenced asset paths')

  for (const assetPath of referencedPaths) {
    const fileUrl = new URL('../public' + assetPath, import.meta.url)
    assert.ok(
      existsSync(fileUrl),
      `Referenced asset must exist on disk: ${assetPath}`
    )
    const stats = statSync(fileUrl)
    assert.ok(
      stats.size > 0,
      `Referenced asset must have nonzero byte size: ${assetPath} (${stats.size} B)`
    )
  }
})
