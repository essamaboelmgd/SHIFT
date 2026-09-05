import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createDevelopmentMockAdapter,
  resolveProjectBriefAdapter,
  toProjectBriefPayload,
  validateProjectBrief,
  type ProjectBriefSubmissionAdapter,
  type ProjectBriefValues,
} from '../src/components/project-brief/projectBriefModel.ts'

const validValues: ProjectBriefValues = {
  name: '  عصام  ',
  company: '  SHIFT  ',
  projectType: 'business-website',
  description: '  نحتاج موقعًا يوضح قيمة الشركة والخدمات بشكل أفضل.  ',
  contactMethod: 'whatsapp',
  contactValue: '  +20 100 000 0000  ',
}

test('requires only the fields needed to understand and contact a lead', () => {
  const errors = validateProjectBrief({
    name: '',
    company: '',
    projectType: '',
    description: '',
    contactMethod: '',
    contactValue: '',
  })

  assert.deepEqual(Object.keys(errors).sort(), [
    'contactMethod',
    'contactValue',
    'description',
    'name',
    'projectType',
  ])
  assert.equal(errors.company, undefined)
})

test('validates email when email is the preferred contact method', () => {
  const errors = validateProjectBrief({
    ...validValues,
    contactMethod: 'email',
    contactValue: 'not-an-email',
  })

  assert.equal(errors.contactValue, 'اكتب بريد إلكتروني صحيح.')
})

test('rejects implausibly short phone values without enforcing a country format', () => {
  const errors = validateProjectBrief({
    ...validValues,
    contactMethod: 'phone',
    contactValue: '1234',
  })

  assert.equal(errors.contactValue, 'اكتب رقم تواصل صحيح.')
})

test('builds a trimmed backend-ready payload with stable metadata', () => {
  assert.deepEqual(toProjectBriefPayload(validValues), {
    name: 'عصام',
    company: 'SHIFT',
    projectType: 'business-website',
    description: 'نحتاج موقعًا يوضح قيمة الشركة والخدمات بشكل أفضل.',
    contactMethod: 'whatsapp',
    contactValue: '+20 100 000 0000',
    locale: 'ar',
    source: 'homepage-project-brief',
  })
})

test('allows a local success adapter only when development mode is explicit', async () => {
  const resolved = resolveProjectBriefAdapter({ isDevelopment: true })

  assert.equal(resolved.status, 'development-mock')
  assert.notEqual(resolved.adapter, null)
  await resolved.adapter?.(toProjectBriefPayload(validValues))
})

test('keeps production unconnected when no real adapter is injected', () => {
  const resolved = resolveProjectBriefAdapter({ isDevelopment: false })

  assert.equal(resolved.status, 'unconnected')
  assert.equal(resolved.adapter, null)
})

test('uses an injected real adapter in production', () => {
  const adapter: ProjectBriefSubmissionAdapter = async () => undefined
  const resolved = resolveProjectBriefAdapter({ isDevelopment: false, adapter })

  assert.equal(resolved.status, 'connected')
  assert.equal(resolved.adapter, adapter)
})

test('development mock resolves without transmitting data', async () => {
  const adapter = createDevelopmentMockAdapter(0)
  await assert.doesNotReject(adapter(toProjectBriefPayload(validValues)))
})
