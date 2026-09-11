import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('index.html contains truthful non-domain-dependent metadata, icons, and JSON-LD', () => {
  const html = read('index.html')

  // Document setup
  assert.match(html, /<!doctype html>/i)
  assert.match(html, /<html\s+lang="ar"\s+dir="rtl">/)
  assert.match(html, /<meta\s+charset="UTF-8"\s*\/>/)
  assert.match(html, /<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1,\s*viewport-fit=cover"\s*\/>/)
  assert.match(html, /<meta\s+name="theme-color"\s+content="#0A0A0A"\s*\/>/)
  assert.match(html, /<title>SHIFT — موقعك يواكب نمو أعمالك<\/title>/)
  assert.match(html, /<meta\s+name="description"\s+content="SHIFT — مواقع وحلول ويب تعكس مستوى أعمالك اليوم وتدعم نموك في المرحلة الجاية."\s*\/>/)

  // Icons
  assert.match(html, /<link\s+rel="icon"\s+type="image\/svg\+xml"\s+href="\/favicon\.svg"\s*\/>/)
  assert.doesNotMatch(html, /rel="apple-touch-icon"/i)

  // OpenGraph metadata
  assert.match(html, /<meta\s+property="og:type"\s+content="website"\s*\/>/)
  assert.match(html, /<meta\s+property="og:site_name"\s+content="SHIFT"\s*\/>/)
  assert.match(html, /<meta\s+property="og:locale"\s+content="ar_EG"\s*\/>/)
  assert.match(html, /<meta\s+property="og:title"\s+content="SHIFT — موقعك يواكب نمو أعمالك"\s*\/>/)
  assert.match(html, /<meta\s+property="og:description"\s+content="SHIFT — مواقع وحلول ويب تعكس مستوى أعمالك اليوم وتدعم نموك في المرحلة الجاية."\s*\/>/)
  assert.doesNotMatch(html, /property="og:image(?::alt)?"/i)

  // Twitter Card metadata
  assert.match(html, /<meta\s+name="twitter:card"\s+content="summary"\s*\/>/)
  assert.match(html, /<meta\s+name="twitter:title"\s+content="SHIFT — موقعك يواكب نمو أعمالك"\s*\/>/)
  assert.match(html, /<meta\s+name="twitter:description"\s+content="SHIFT — مواقع وحلول ويب تعكس مستوى أعمالك اليوم وتدعم نموك في المرحلة الجاية."\s*\/>/)
  assert.doesNotMatch(html, /name="twitter:image(?::alt)?"/i)

  // Crucial: No domain-dependent URL fields when production origin is unknown
  assert.doesNotMatch(html, /rel="canonical"/i)
  assert.doesNotMatch(html, /property="og:url"/i)
  assert.doesNotMatch(html, /name="twitter:url"/i)

  // Minimal supported JSON-LD
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(jsonLdMatch, 'JSON-LD script tag must exist')
  const schema = JSON.parse(jsonLdMatch[1])

  assert.equal(schema['@context'], 'https://schema.org')
  assert.equal(schema['@type'], 'Organization')
  assert.equal(schema.name, 'SHIFT')
  assert.equal(schema.alternateName, 'SHIFT Creative Solutions')
  assert.equal(schema.email, 'shift.software.eg@gmail.com')
  assert.equal(schema.telephone, '+20 155 6538 323')
  assert.equal(schema.logo, undefined, 'schema.logo must not use a relative URL')
  assert.deepEqual(schema.sameAs, [
    'https://www.linkedin.com/company/shift-software-eg',
    'https://www.tiktok.com/@shift.software.eg',
    'https://www.instagram.com/shift.software.eg',
    'https://www.facebook.com/shift.software.eg',
    'https://www.youtube.com/@shift.software',
  ])
  assert.equal(schema.contactPoint['@type'], 'ContactPoint')
  assert.equal(schema.contactPoint.telephone, '+20 155 6538 323')
  assert.equal(schema.url, undefined, 'schema.url must not invent a production domain')
  assert.equal(schema['@id'], undefined, 'schema.@id must not invent a production domain')
})

test('robots.txt and llms.txt are valid and grounded in repository evidence', () => {
  const robots = read('public/robots.txt')
  assert.match(robots, /User-agent:\s*\*/)
  assert.match(robots, /Allow:\s*\//)
  assert.doesNotMatch(robots, /Sitemap:\s*https?:\/\//i, 'sitemap with fake origin must not be published')

  const llms = read('public/llms.txt')
  assert.match(llms, /^# SHIFT/m)
  assert.match(llms, /shift\.software\.eg@gmail\.com/)
  assert.match(llms, /\+20 155 6538 323/)
  assert.match(llms, /https:\/\/wa\.me\/201556538323/)
  assert.match(llms, /01 \/ ALIGN/)
  assert.match(llms, /02 \/ SHAPE/)
  assert.match(llms, /03 \/ BUILD/)
  assert.match(llms, /Kupecut/)
  assert.match(llms, /Argos SecOps/)
  assert.match(llms, /Deep Background.*#050505/)
  assert.match(llms, /Logo Black.*#111111/)
  assert.match(llms, /Off White.*#FDFBF9/)
  assert.match(llms, /Signal Orange.*#FE5E0E/)
  assert.doesNotMatch(llms, /https?:\/\/(?!wa\.me|kupecut\.com)[^\s)]+/, 'no invented domain URLs in llms.txt')
  assert.equal(existsSync(new URL('../public/sitemap.xml', import.meta.url)), false, 'no fake sitemap file in public')
})

test('branded static/Vite-compatible 404 artifact is present and accessible', () => {
  assert.ok(existsSync(new URL('../public/404.html', import.meta.url)), 'public/404.html must exist')
  const content404 = read('public/404.html')
  assert.match(content404, /<!doctype html>/i)
  assert.match(content404, /<html\s+lang="ar"\s+dir="rtl">/)
  assert.match(content404, /<meta\s+name="theme-color"\s+content="#0A0A0A"\s*\/>/)
  assert.match(content404, /<meta\s+name="robots"\s+content="noindex,\s*follow"\s*\/>/)
  assert.match(content404, /SHIFT — الصفحة غير موجودة \(404\)/)
  assert.match(content404, /\/logo\/wordmark-white\.png/)
  assert.match(content404, /href="\/"/)
  assert.match(content404, /https:\/\/wa\.me\/201556538323/)
  assert.match(content404, /new Date\(\)\.getFullYear\(\)/)
})

test('content and link hygiene: no dead locales, no stale contact data, real social links preserved', () => {
  const footerComp = read('src/components/site-footer/SiteFooter.tsx')
  const footerConfig = read('src/components/site-footer/siteFooterConfig.ts')
  const theShift = read('src/components/TheShiftSection.tsx')

  // No dead EN locale
  assert.doesNotMatch(footerComp, /<span[^>]*lang="en"[^>]*>EN<\/span>/)

  // No commented placeholder watermarks/tags
  assert.doesNotMatch(theShift, /{\/\*<div className="shift-signal__watermark".*\*\/}/)
  assert.doesNotMatch(theShift, /{\/\*<p className="shift-signal__signal-tag".*\*\/}/)

  // Stale fake contact data must be absent from footer config
  assert.doesNotMatch(footerConfig, /hello@shift-labs\.com/)
  assert.doesNotMatch(footerConfig, /\+20 100 000 0000/)

  // Real contact data must be present
  assert.match(footerConfig, /shift\.software\.eg@gmail\.com/)
  assert.match(footerConfig, /\+20 155 6538 323/)
  assert.match(footerConfig, /https:\/\/wa\.me\/201556538323/)

  // Real social links must all be valid URLs
  const socialMatches = [...footerConfig.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1])
  assert.ok(socialMatches.length >= 5)
  for (const url of socialMatches) {
    assert.ok(url.startsWith('https://'), `Social URL must be https: ${url}`)
  }

  // Dynamic copyright year in footer
  assert.match(footerComp, /new Date\(\)\.getFullYear\(\)/)
})

test('all static assets referenced in index.html and 404.html resolve in public directory', () => {
  const indexHtml = read('index.html')
  const notFoundHtml = read('public/404.html')

  const extractAssetPaths = (html) => {
    const matches = [...html.matchAll(/(?:href|src|imagesrcset)="([^"]+)"/g)]
    const paths = []
    for (const match of matches) {
      const val = match[1]
      // Skip external URLs, data URLs, hashes
      if (val.startsWith('http') || val.startsWith('#') || val.startsWith('data:')) continue
      // If it's a srcset, split by comma
      if (val.includes('.webp ') || val.includes('.png ')) {
        const parts = val.split(',').map((p) => p.trim().split(/\s+/)[0])
        paths.push(...parts.filter((p) => p.startsWith('/')))
      } else if (val.startsWith('/')) {
        paths.push(val)
      }
    }
    return paths
  }

  const allPaths = new Set([...extractAssetPaths(indexHtml), ...extractAssetPaths(notFoundHtml)])
  for (const assetPath of allPaths) {
    // If it's root '/', it's home link, skip
    if (assetPath === '/') continue
    const target = assetPath.startsWith('/src/')
      ? new URL(`..${assetPath}`, import.meta.url)
      : new URL(`../public${assetPath}`, import.meta.url)
    assert.ok(existsSync(target), `Asset or source file must exist: ${assetPath}`)
  }
})
