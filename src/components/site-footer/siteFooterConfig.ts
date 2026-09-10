export type FooterSocialLink = {
  label: string
  platform: 'linkedin' | 'tiktok' | 'instagram' | 'facebook' | 'youtube'
  url: string
}

export const siteFooterConfig = {
  email: 'shift.software.eg@gmail.com',
  whatsappDisplay: '+20 155 6538 323',
  whatsappUrl: 'https://wa.me/201556538323',
  statement: 'برمجيات تحرّك أعمالك للأمام.',
  englishStatement: 'SOFTWARE THAT MOVES BUSINESS FORWARD.',
  closingLine: 'MAKING WHAT MOVES NEXT',
} as const

export const footerNavigation = [
  { label: 'أعمالنا', href: '#work' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'طريقتنا', href: '#process' },
  { label: 'عنّا', href: '#why-shift' },
  { label: 'تواصل معنا', href: '#contact' },
] as const

// Add real URLs here; entries with an empty URL are intentionally not rendered.
export const footerSocialLinks: ReadonlyArray<FooterSocialLink> = [
  { label: 'LinkedIn', platform: 'linkedin', url: 'https://www.linkedin.com/company/shift-software-eg' },
  { label: 'TikTok', platform: 'tiktok', url: 'https://www.tiktok.com/@shift.software.eg' },
  { label: 'Instagram', platform: 'instagram', url: 'https://www.instagram.com/shift.software.eg' },
  { label: 'Facebook', platform: 'facebook', url: 'https://www.facebook.com/shift.software.eg' },
  { label: 'YouTube', platform: 'youtube', url: 'https://www.youtube.com/@shift.software' },
]




