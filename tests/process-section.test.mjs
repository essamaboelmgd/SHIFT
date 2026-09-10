import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('Process keeps selection state on the editorial rail while the right artwork stays fixed', async () => {
  const source = await read('src/components/ProcessSection.tsx')
  const css = await read('src/index.css')
  const artwork = source.match(/function ProcessRouteArtwork\(\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
  const repair = css.slice(css.lastIndexOf('/* Process — approved reference repair'))

  assert.match(source, /const \[activeStageNumber, setActiveStageNumber\] = useState\('01'\)/)
  assert.match(source, /const activeStage = processStages\.find\(\(stage\) => stage\.number === activeStageNumber\)/)
  assert.match(source, /onClick=\{\(\) => selectStage\(stage\.number\)\}/)
  assert.match(source, /aria-pressed=\{isActive\}/)
  assert.match(source, /<ProcessRouteArtwork\s*\/>/)
  assert.match(source, /className="process-stage-progress"[^>]*style=\{progressStyle\}/)
  assert.notEqual(artwork, '', 'the right artwork should be isolated in a state-free component')
  assert.match(artwork, /className="process-route"/)
  assert.match(artwork, /className="process-route__word"[^>]*>ALIGN<\/p>/)
  assert.match(artwork, /className="process-route__ghost"[^>]*>01<\/p>/)
  assert.match(artwork, /IDEA(?:&nbsp;|\s|→)+DIRECTION(?:&nbsp;|\s|→)+IMPACT/)
  assert.equal((artwork.match(/process-route__gate process-route__gate--[123]/g) ?? []).length, 3)
  assert.match(artwork, /process-route__gate--1[\s\S]*>01<\//)
  assert.match(artwork, /process-route__gate--2[\s\S]*>02<\//)
  assert.match(artwork, /process-route__gate--3[\s\S]*>03<\//)
  assert.equal((artwork.match(/\bis-origin\b/g) ?? []).length, 1)
  assert.match(artwork, /process-route__gate process-route__gate--1 is-origin/)
  assert.doesNotMatch(artwork, /process-route__gate process-route__gate--[23] is-origin/)
  assert.match(repair, /\.process-route__gate\.is-origin\s*\{[^}]*border-color:\s*var\(--process-orange\)[^}]*color:\s*var\(--process-orange\)[^}]*box-shadow:/)
  assert.match(repair, /\.process-route__gate\.is-origin i\s*\{[^}]*background:\s*#ffad19[^}]*box-shadow:/)
  assert.match(artwork, /process-route__path/)
  assert.match(artwork, /process-route__curve--bright/)
  assert.doesNotMatch(artwork, /activeStageNumber|activeStage|activeIndex|isActive|key=/)
  assert.doesNotMatch(artwork, /process-route__active-copy|process-route-signature|process-route-board/)
  assert.doesNotMatch(source, /active:\s*(true|false)/)
})

test('Process uses the approved chapter copy and only the three approved stages', async () => {
  const source = await read('src/components/ProcessSection.tsx')

  assert.match(source, /05 \/ PROCESS/)
  assert.match(source, /THE SHIFT \/ THE ROUTE/)
  assert.match(source, /من الفكرة لحد الإطلاق، كل خطوة ليها دور\./)
  assert.match(source, /مش بنبني موقع وخلاص\./)
  assert.match(source, /بنرتب الخطوة الجاية\./)
  assert.match(source, /بنبدأ بفهم شغلك والهدف، نرتب الاتجاه والتجربة، وبعدها نبني ونختبر ونطلق\./)
  assert.match(source, /نفهم شغلك، الهدف، ومين المفروض الموقع يخاطبه قبل ما نقرر أي حل\./)
  assert.match(source, /نرتب المحتوى والتجربة ونحوّل الفكرة لاتجاه واضح قبل التطوير\./)
  assert.match(source, /نبني، نختبر، ونطلق تجربة سريعة ومحسوبة ومستعدة للمرحلة الجاية\./)
  assert.doesNotMatch(source, /CLARITY|FORM|MOMENTUM/)
  assert.equal((source.match(/number: '0[123]'/g) ?? []).length, 3)
})

test('Process styles keep controls focusable, motion-safe, and mobile in normal flow', async () => {
  const css = await read('src/index.css')

  assert.match(css, /\.process-route-button:focus-visible/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*process-route-button/)
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.process-section__canvas\s*\{[\s\S]*height:\s*auto/)
  assert.match(css, /@media \(max-width: 899px\)[\s\S]*\.process-section__layout\s*\{[\s\S]*flex-direction:\s*column/)
})

test('Process uses an editorial route rather than the rejected panel and card treatment', async () => {
  const source = await read('src/components/ProcessSection.tsx')
  const css = await read('src/index.css')
  const repair = css.slice(css.lastIndexOf('/* Process — approved reference repair'))

  assert.match(source, /process-route__word/)
  assert.match(source, /process-route__curve--bright/)
  assert.doesNotMatch(source, /process-route-signature|process-route-board/)
  assert.match(repair, /\.process-stage\s*\{[^}]*border-bottom:\s*1px solid/)
  assert.match(repair, /@media \(max-width: 899px\)[\s\S]*\.process-section__layout\s*\{[\s\S]*flex-direction:\s*column/)
  assert.match(repair, /\.process-stage-progress__button\s*\{[\s\S]*min-height:\s*54px/)
})

test('Process pins desktop structure to LTR while keeping Arabic editorial copy RTL', async () => {
  const css = await read('src/index.css')
  const repair = css.slice(css.lastIndexOf('/* Process — approved reference repair'))

  assert.match(repair, /\.process-section__rail\s*\{[\s\S]*direction:\s*ltr/)
  assert.match(repair, /\.process-section__layout\s*\{[\s\S]*direction:\s*ltr/)
  assert.match(repair, /\.process-section__editorial\s*\{[\s\S]*direction:\s*rtl/)
  assert.match(repair, /\.process-stage__button\s*\{[\s\S]*direction:\s*ltr/)
  assert.match(repair, /\.process-route\s*\{[\s\S]*direction:\s*ltr/)
})
