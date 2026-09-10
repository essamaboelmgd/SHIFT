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
  assert.match(component, /function SocialIcon/)
  assert.match(component, /<SocialIcon platform=\{item\.platform\} \/>/)
  assert.doesNotMatch(component, /\{item\.shortLabel\}/)
  assert.match(config, /shift\.software\.eg@gmail\.com/)
  assert.match(config, /\+20 155 6538 323/)
  assert.match(config, /https:\/\/wa\.me\/201556538323/)
  assert.match(config, /href: '#work'/)
  assert.match(config, /href: '#services'/)
  assert.match(config, /href: '#process'/)
  assert.match(config, /href: '#why-shift'/)
  assert.match(config, /href: '#contact'/)
})

test('footer social links use configured platforms rather than text abbreviations', async () => {
  const config = await read('src/components/site-footer/siteFooterConfig.ts')

  assert.match(config, /platform: 'linkedin'/)
  assert.match(config, /platform: 'tiktok'/)
  assert.match(config, /platform: 'instagram'/)
  assert.match(config, /platform: 'facebook'/)
  assert.match(config, /platform: 'youtube'/)
  assert.doesNotMatch(config, /shortLabel:/)
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

test('footer mobile contract creates a compact ordered vertical composition', async () => {
  const styles = await read('src/components/site-footer/SiteFooter.css')
  const mobileStart = styles.indexOf('@media (max-width: 760px)')
  const mobileEnd = styles.indexOf('@media (max-width: 380px)', mobileStart)
  const mobileStyles = styles.slice(mobileStart, mobileEnd)

  assert.match(mobileStyles, /\.site-footer__wordmark\s*\{[^}]*order:\s*1;/s)
  assert.match(mobileStyles, /\.site-footer__brand-copy\s*\{[^}]*order:\s*2;/s)
  assert.match(mobileStyles, /\.site-footer__information\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;/s)
  assert.match(mobileStyles, /\.site-footer__contact\s*\{[^}]*order:\s*1;/s)
  assert.match(mobileStyles, /\.site-footer__social\s*\{[^}]*order:\s*2;/s)
  assert.match(mobileStyles, /\.site-footer__language\s*\{[^}]*order:\s*3;/s)
  assert.match(mobileStyles, /\.site-footer__canvas\s*\{[^}]*padding:\s*36px 20px 14px;/s)
  assert.match(mobileStyles, /\.site-footer__group\s*\{[^}]*padding:\s*12px 0;/s)
  assert.match(mobileStyles, /\.site-footer__language\s*\{[^}]*border-bottom:\s*0;/s)
  assert.match(mobileStyles, /\.site-footer__contact a\s*\{[^}]*min-height:\s*44px;/s)
  assert.match(mobileStyles, /\.site-footer__contact a span\s*\{[^}]*overflow-wrap:\s*anywhere;/s)
})

test('footer mobile contract keeps the hierarchy compact without shrinking touch targets', async () => {
  const styles = await read('src/components/site-footer/SiteFooter.css')
  const mobileStart = styles.indexOf('@media (max-width: 760px)')
  const mobileEnd = styles.indexOf('@media (max-width: 380px)', mobileStart)
  const mobileStyles = styles.slice(mobileStart, mobileEnd)

  assert.match(mobileStyles, /\.site-footer__brand\s*\{[^}]*gap:\s*16px;/s)
  assert.match(mobileStyles, /\.site-footer__signal-rule\s*\{[^}]*margin-top:\s*24px;/s)
  assert.match(mobileStyles, /\.site-footer__nav\s*\{[^}]*padding:\s*8px 0 10px;/s)
  assert.match(mobileStyles, /\.site-footer__social-links\s*\{[^}]*gap:\s*14px;/s)
  assert.match(mobileStyles, /\.site-footer__information\s*\{[^}]*padding:\s*4px 0 8px;/s)
  assert.match(mobileStyles, /\.site-footer__group\s*\{[^}]*padding:\s*12px 0;/s)
  assert.match(mobileStyles, /\.site-footer__baseline\s*\{[^}]*padding:\s*16px 0 6px;/s)
  assert.match(mobileStyles, /\.site-footer__nav a\s*\{[^}]*min-height:\s*44px;/s)
  assert.match(mobileStyles, /\.site-footer__contact a\s*\{[^}]*min-height:\s*44px;/s)
  assert.match(styles, /\.site-footer__social-links a\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px;/s)
})
