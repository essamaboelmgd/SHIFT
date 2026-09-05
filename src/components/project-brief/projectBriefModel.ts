export const projectTypeValues = [
  'landing-page',
  'business-website',
  'e-commerce',
  'education-platform',
  'portfolio-personal-brand',
  'custom-web-solution',
] as const

export const contactMethodValues = ['whatsapp', 'phone', 'email'] as const

export type ProjectType = (typeof projectTypeValues)[number]
export type ContactMethod = (typeof contactMethodValues)[number]

export type ProjectBriefValues = {
  name: string
  company: string
  projectType: ProjectType | ''
  description: string
  contactMethod: ContactMethod | ''
  contactValue: string
}

export type ProjectBriefPayload = {
  name: string
  company: string
  projectType: ProjectType
  description: string
  contactMethod: ContactMethod
  contactValue: string
  locale: 'ar'
  source: 'homepage-project-brief'
}

export type ProjectBriefErrors = Partial<Record<keyof ProjectBriefValues, string>>
export type ProjectBriefSubmissionAdapter = (payload: ProjectBriefPayload) => Promise<void>

type AdapterResolution = {
  status: 'connected' | 'development-mock' | 'unconnected'
  adapter: ProjectBriefSubmissionAdapter | null
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateProjectBrief(values: ProjectBriefValues): ProjectBriefErrors {
  const errors: ProjectBriefErrors = {}

  if (!values.name.trim()) errors.name = 'اكتب اسمك عشان نعرف نتواصل معاك.'
  if (!values.projectType) errors.projectType = 'اختار نوع المشروع الأقرب لاحتياجك.'
  if (!values.description.trim()) errors.description = 'احكيلنا باختصار عن المشروع والهدف منه.'
  if (!values.contactMethod) errors.contactMethod = 'اختار وسيلة التواصل المناسبة ليك.'

  if (!values.contactValue.trim()) {
    errors.contactValue = 'اكتب وسيلة التواصل عشان نقدر نرد عليك.'
  } else if (values.contactMethod === 'email' && !emailPattern.test(values.contactValue.trim())) {
    errors.contactValue = 'اكتب بريد إلكتروني صحيح.'
  } else if (
    (values.contactMethod === 'phone' || values.contactMethod === 'whatsapp')
    && values.contactValue.replace(/\D/g, '').length < 7
  ) {
    errors.contactValue = 'اكتب رقم تواصل صحيح.'
  }

  return errors
}

export function toProjectBriefPayload(values: ProjectBriefValues): ProjectBriefPayload {
  if (!values.projectType || !values.contactMethod) {
    throw new Error('Project brief must be validated before creating a payload.')
  }

  return {
    name: values.name.trim(),
    company: values.company.trim(),
    projectType: values.projectType,
    description: values.description.trim(),
    contactMethod: values.contactMethod,
    contactValue: values.contactValue.trim(),
    locale: 'ar',
    source: 'homepage-project-brief',
  }
}

export function createDevelopmentMockAdapter(delayMs = 650): ProjectBriefSubmissionAdapter {
  return async () => {
    if (delayMs <= 0) return
    await new Promise<void>((resolve) => setTimeout(resolve, delayMs))
  }
}

export function resolveProjectBriefAdapter({
  isDevelopment,
  adapter,
}: {
  isDevelopment: boolean
  adapter?: ProjectBriefSubmissionAdapter
}): AdapterResolution {
  if (adapter) return { status: 'connected', adapter }
  if (isDevelopment) return { status: 'development-mock', adapter: createDevelopmentMockAdapter() }
  return { status: 'unconnected', adapter: null }
}
