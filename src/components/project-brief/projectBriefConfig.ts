import type { ContactMethod, ProjectType } from './projectBriefModel'

export const projectBriefSectionConfig = {
  chapterNumber: '08',
  chapterLabel: 'YOUR NEXT MOVE',
  context: 'THE SHIFT / PROJECT BRIEF',
  headline: ['عندك الخطوة الجاية؟', 'نحددها سوا.'],
  supportingLine: 'شاركنا مشروعك، ونحدد معاك أنسب بداية للمرحلة الجاية.',
} as const

export const projectTypeOptions: ReadonlyArray<{ value: ProjectType; label: string }> = [
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'business-website', label: 'Business Website' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'education-platform', label: 'Education Platform' },
  { value: 'portfolio-personal-brand', label: 'Portfolio / Personal Brand' },
  { value: 'custom-web-solution', label: 'Custom Web Solution' },
]

export const contactMethodOptions: ReadonlyArray<{ value: ContactMethod; label: string }> = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
]

export const nextSteps = [
  { number: '01', title: 'نفهم مشروعك', body: 'بنراجع التفاصيل ونحدد الأسئلة المهمة.' },
  { number: '02', title: 'نحدد الخطوة المناسبة', body: 'بنتواصل معاك ونحدد النطاق والاتجاه المناسب.' },
  { number: '03', title: 'نرتب البداية', body: 'بعد الاتفاق بيكون عندنا Scope وخطوة تالية واضحة.' },
] as const

export const contactFieldByMethod = {
  whatsapp: { label: 'رقم واتساب', type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
  phone: { label: 'رقم الهاتف', type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
  email: { label: 'البريد الإلكتروني', type: 'email', inputMode: 'email', autoComplete: 'email' },
} as const
