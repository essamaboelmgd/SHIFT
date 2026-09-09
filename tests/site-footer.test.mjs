import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8').catch(() => '')

test('footer uses configured data, the real logo, and semantic navigation', async () => {
  const [component, config] = await Promise.all([
    read('src/components/site-footer/SiteFooter.tsx'),
    read('src/components/site-footer/siteFooterConfig.ts'),
  ])

  assert.match(component, /<footer/)
  assert.match(component, /<nav/)
  assert.match(component, /\/logo\/wordmark-white\.png/)
  assert.match(component, /new Date\(\)\.getFullYear\(\)/)
  assert.match(component, /filter\(\(item\) => Boolean\(item\.url\)\)/)
  assert.match(component, /target="_blank"/)
  assert.match(component, /rel="noopener noreferrer"/)
  assert.match(config, /shift\.software\.eg@gmail\.com/)
  assert.match(config, /\+20 155 6538 323/)
  assert.match(config, /https:\/\/wa\.me\/201556538323/)
  assert.match(config, /href: '#work'/)
  assert.match(config, /href: '#services'/)
  assert.match(config, /href: '#process'/)
  assert.match(config, /href: '#why-shift'/)
  assert.match(config, /href: '#contact'/)
})

test('footer is isolated and integrated after the project brief', async () => {
  const [app, styles] = await Promise.all([
    read('src/App.tsx'),
    read('src/components/site-footer/SiteFooter.css'),
  ])

  assert.ok(app.indexOf('<SiteFooter') > app.indexOf('<ProjectBriefSection'))
  assert.match(styles, /\.site-footer\s*\{/)
  assert.match(styles, /@media \(max-width: 760px\)/)
  assert.doesNotMatch(styles, /overflow-x:\s*(auto|scroll)/)
})
