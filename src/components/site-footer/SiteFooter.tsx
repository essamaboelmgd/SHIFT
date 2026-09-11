import './SiteFooter.css'
import {
  footerNavigation,
  footerSocialLinks,
  siteFooterConfig,
} from './siteFooterConfig'
import type { FooterSocialLink } from './siteFooterConfig'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.45L3.5 20.5l1.44-4.28A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="M8.35 7.55c.2-.42.4-.43.72-.44h.6c.18 0 .35.06.46.34l.86 2.04c.08.2.04.38-.08.55l-.65.82c-.13.15-.13.3-.04.47.46.82 1.15 1.52 1.97 1.99.18.1.34.08.47-.07l.9-1.04c.16-.18.35-.2.56-.12l1.93.9c.24.11.35.27.32.52-.1.8-.55 1.54-1.22 1.98-.44.3-1.03.45-1.6.32-2.5-.56-4.48-2.5-5.36-4.83-.43-1.13-.44-2.28.16-3.43Z" />
    </svg>
  )
}

function SocialIcon({ platform }: Pick<FooterSocialLink, 'platform'>) {
  const paths = {
    linkedin: <path d="M6.1 8.7H3.2V21h2.9V8.7ZM4.65 3A1.7 1.7 0 1 0 4.7 6.4 1.7 1.7 0 0 0 4.65 3ZM21 13.95c0-3.7-1.98-5.42-4.62-5.42-2.13 0-3.08 1.17-3.61 1.99V8.7H9.88V21h2.89v-6.09c0-1.6.3-3.15 2.28-3.15 1.95 0 1.98 1.83 1.98 3.25V21H21v-7.05Z" />,
    tiktok: <path d="M14.25 3c.3 2.35 1.62 3.76 3.75 3.91v2.7a7.3 7.3 0 0 1-3.7-1.05v5.7a5.27 5.27 0 1 1-4.56-5.23v2.73a2.64 2.64 0 1 0 1.68 2.46V3h2.83Z" />,
    instagram: <><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.65" cy="6.45" r="1.05" className="site-footer__social-dot" /></>,
    facebook: <path d="M13.55 21v-7.52h2.53l.38-2.94h-2.91V8.67c0-.85.24-1.43 1.46-1.43h1.56V4.61a20.8 20.8 0 0 0-2.28-.12c-2.26 0-3.81 1.38-3.81 3.91v2.14H7.92v2.94h2.56V21h3.07Z" />,
    youtube: <path d="M21 8.15a2.97 2.97 0 0 0-2.09-2.1C17.07 5.55 12 5.55 12 5.55s-5.07 0-6.91.5A2.97 2.97 0 0 0 3 8.15C2.5 10 2.5 12 2.5 12s0 2 .5 3.85a2.97 2.97 0 0 0 2.09 2.1c1.84.5 6.91.5 6.91.5s5.07 0 6.91-.5a2.97 2.97 0 0 0 2.09-2.1c.5-1.85.5-3.85.5-3.85s0-2-.5-3.85ZM10.38 14.4V9.6L14.55 12l-4.17 2.4Z" />,
  }[platform]

  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths}</svg>
}

function EdgeOrbit({ side }: { side: 'start' | 'end' }) {
  return (
    <svg
      className={`site-footer__orbit site-footer__orbit--${side}`}
      viewBox="0 0 300 480"
      fill="none"
      aria-hidden="true"
    >
      <path d="M18 478C84 410 130 321 126 227C122 131 77 57 5 5" />
      <path d="M-34 476C71 380 177 314 220 211C253 132 245 59 210 0" />
      <path d="M-82 468C59 376 184 333 277 238" />
      <circle cx="126" cy="227" r="3" />
    </svg>
  )
}

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const visibleSocialLinks = footerSocialLinks.filter((item) => Boolean(item.url))

  return (
    <footer className="site-footer" aria-labelledby="site-footer-statement" dir="rtl">
      <div className="site-footer__atmosphere" aria-hidden="true" />
      <EdgeOrbit side="start" />
      <EdgeOrbit side="end" />

      <div className="site-footer__canvas">
        <div className="site-footer__brand">
          <a className="site-footer__wordmark" href="#top" aria-label="العودة إلى بداية الصفحة">
            <img src="/logo/wordmark-white.png" alt="SHIFT" />
          </a>

          <div className="site-footer__brand-copy">
            <p className="site-footer__statement" id="site-footer-statement">
              برمجيات تحرّك أعمالك <strong>للأمام.</strong>
            </p>
            <p className="site-footer__statement-en" dir="ltr">
              {siteFooterConfig.englishStatement}
            </p>
          </div>
        </div>

        <div className="site-footer__signal-rule" aria-hidden="true">
          <span />
          <span />
        </div>

        <nav className="site-footer__nav" aria-label="روابط الموقع">
          {footerNavigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="site-footer__information">
          <section className="site-footer__group site-footer__contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title"><span aria-hidden="true" /> تواصل معنا</h2>
            <a href={`mailto:${siteFooterConfig.email}`} dir="ltr">
              <MailIcon />
              <span>{siteFooterConfig.email}</span>
            </a>
            <a
              href={siteFooterConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
              <WhatsAppIcon />
              <span>{siteFooterConfig.whatsappDisplay}</span>
            </a>
          </section>

          <section className="site-footer__group site-footer__social" aria-labelledby="footer-social-title">
            <h2 id="footer-social-title"><span aria-hidden="true" /> تابعنا</h2>
            {visibleSocialLinks.length > 0 ? (
              <div className="site-footer__social-links">
                {visibleSocialLinks.map((item) => (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    key={item.label}
                  >
                    <SocialIcon platform={item.platform} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="site-footer__social-empty">روابطنا قريبًا</p>
            )}
          </section>

          <section className="site-footer__group site-footer__language" aria-labelledby="footer-language-title">
            <h2 id="footer-language-title"><span aria-hidden="true" /> اللغة</h2>
            <div className="site-footer__language-options" dir="ltr" aria-label="اللغة الحالية">
              <span className="is-active" lang="ar" aria-current="true">AR</span>
            </div>
          </section>
        </div>

        <div className="site-footer__baseline">
          <p dir="ltr">© {currentYear} SHIFT. <span dir="rtl">جميع الحقوق محفوظة.</span></p>
          <p dir="ltr">{siteFooterConfig.closingLine}<span aria-hidden="true" /></p>
        </div>
      </div>
    </footer>
  )
}
