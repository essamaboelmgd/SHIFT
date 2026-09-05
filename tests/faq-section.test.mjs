import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), 'utf8').catch(() => '')

test('FAQ exposes a configurable chapter and accessible accordion semantics', async () => {
  const source = await read('src/components/FaqSection.tsx')

  assert.match(source, /chapterNumber = '07'/)
  assert.match(source, /aria-expanded=/)
  assert.match(source, /aria-controls=/)
  assert.match(source, /role="region"/)
  assert.match(source, /مدة تنفيذ واضحة/)
  assert.match(source, /نطاق واضح/)
  assert.match(source, /طريقة عمل أو منطق خاص/)
})

test('FAQ is integrated after Why SHIFT and its styles stay scoped', async () => {
  const [app, css] = await Promise.all([
    read('src/App.tsx'),
    read('src/index.css'),
  ])

  assert.ok(app.indexOf('<FaqSection') > app.indexOf('<WhyShiftSection'))
  assert.match(css, /\.faq-section\s*\{/)
  assert.match(css, /grid-template-rows:\s*0fr/)
  assert.doesNotMatch(css, /\.faq-section[^}]*box-shadow:/s)
})
