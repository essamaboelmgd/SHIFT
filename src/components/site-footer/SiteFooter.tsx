import './SiteFooter.css'
import {
  footerNavigation,
  footerSocialLinks,
  siteFooterConfig,
} from './siteFooterConfig'

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
                    {item.shortLabel}
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
              <i aria-hidden="true">/</i>
              <span lang="en" aria-disabled="true">EN</span>
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
