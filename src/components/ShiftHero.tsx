import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'أعمالنا', href: '#work' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'آلية العمل', href: '#process' },
  { label: 'عنّا', href: '#about' },
]

function Wordmark({ variant }: { variant: 'desktop' | 'mobile' }) {
  return (
    <span className={`wordmark wordmark--${variant}`} aria-label="SHIFT">
      <img src="/logo/wordmark-white.png" alt="" />
    </span>
  )
}

function SignalArrow({ className = '', variant = 'desktop' }: { className?: string; variant?: 'desktop' | 'mobile' }) {
  const source = variant === 'mobile' ? '/assets/mobile-primary-arrow.svg' : '/assets/primary-arrow.svg'
  return <img aria-hidden="true" className={`signal-arrow ${className}`} src={source} alt="" />
}

function scrollToTarget(href: string, close?: () => void) {
  close?.()
  const target = document.querySelector(href) ?? document.querySelector('#next-stage')
  if (target instanceof HTMLElement) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }
}

export default function ShiftHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const updateCanvasScale = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const referenceWidth = isMobile ? 390 : 1440
      const scale = Math.min(hero.clientWidth / referenceWidth, hero.clientHeight / 900)
      hero.style.setProperty('--canvas-scale', String(Math.max(scale, 0.1)))
      hero.style.setProperty('--canvas-width', `${referenceWidth * scale}px`)
      hero.style.setProperty('--canvas-height', `${900 * scale}px`)
    }

    updateCanvasScale()
    const observer = new ResizeObserver(updateCanvasScale)
    observer.observe(hero)
    window.addEventListener('resize', updateCanvasScale)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateCanvasScale)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  return (
    <main ref={heroRef} className="shift-hero" id="top" aria-labelledby="hero-title">
      <div className="shift-hero__canvas">
        <img
          className="shift-hero__asset shift-hero__asset--desktop"
          src="/assets/shift-glass-field.png"
          alt=""
          aria-hidden="true"
        />
        <div className="shift-hero__atmosphere shift-hero__atmosphere--orange" aria-hidden="true">
          <img src="/assets/desktop-orange-atmosphere.svg" alt="" />
        </div>
        <div className="shift-hero__atmosphere shift-hero__atmosphere--blue" aria-hidden="true">
          <img src="/assets/desktop-blue-atmosphere.svg" alt="" />
        </div>
        <div className="shift-hero__atmosphere shift-hero__atmosphere--warm" aria-hidden="true">
          <img src="/assets/desktop-warm-atmosphere.svg" alt="" />
        </div>
        <div className="shift-hero__atmosphere shift-hero__atmosphere--mobile-orange" aria-hidden="true">
          <img src="/assets/mobile-orange-atmosphere.svg" alt="" />
        </div>
        <div className="shift-hero__atmosphere shift-hero__atmosphere--mobile-blue" aria-hidden="true">
          <img src="/assets/mobile-blue-atmosphere.svg" alt="" />
        </div>
        <div className="shift-grid" aria-hidden="true" />
        <div className="shift-hero__vignette" aria-hidden="true" />

        <header className="desktop-nav">
          <a className="desktop-nav__cta primary-action" href="#contact" onClick={(event) => { event.preventDefault(); scrollToTarget('#contact') }}>
            ابدأ مشروعك
            <SignalArrow />
          </a>

          <img className="desktop-nav__dot" src="/assets/orange-dot.svg" alt="" aria-hidden="true" />

          <nav className="desktop-nav__pill" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); scrollToTarget(item.href) }}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="desktop-nav__brand">
            <span>CREATIVE SOLUTIONS</span>
            <a href="#top" aria-label="العودة إلى الصفحة الرئيسية">
              <Wordmark variant="desktop" />
            </a>
          </div>
        </header>

        <p className="desktop-meta">SHIFT / DIGITAL PARTNER / 01</p>

        <header className="mobile-nav">
          <button
            className="mobile-nav__menu"
            type="button"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <img src="/assets/mobile-menu.svg" alt="" aria-hidden="true" />
            <span />
            <span />
            <span />
          </button>
          <a href="#top" aria-label="العودة إلى الصفحة الرئيسية">
            <Wordmark variant="mobile" />
          </a>
        </header>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          <nav aria-label="قائمة الموبايل">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); scrollToTarget(item.href, () => setMenuOpen(false)) }}>
                {item.label}
              </a>
            ))}
            <a className="mobile-menu__cta" href="#contact" onClick={(event) => { event.preventDefault(); scrollToTarget('#contact', () => setMenuOpen(false)) }}>
              ابدأ مشروعك
              <SignalArrow variant="mobile" />
            </a>
          </nav>
        </div>

        <section className="hero-copy">
          <p className="hero-copy__eyebrow">للشركات اللي كبرت عن موقعها الحالي</p>
          <h1 id="hero-title">
            <span>موقعك لازم</span>
            <span className="hero-copy__accent">يواكب نمو شغلك.</span>
          </h1>
          <p className="hero-copy__support">نصمّم ونبني مواقع تخلي حضورك مناسب للمرحلة اللي وصلت لها.</p>

          <div className="hero-copy__actions">
            <a className="primary-action" href="#contact" onClick={(event) => { event.preventDefault(); scrollToTarget('#contact') }}>
              ابدأ مشروعك
              <SignalArrow variant="mobile" />
            </a>
            <a className="secondary-action" href="#work" onClick={(event) => { event.preventDefault(); scrollToTarget('#work') }}>
              شوف شغلنا
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <div className="mobile-bottom-glow" aria-hidden="true" />

        <div className="mobile-visual-stage" aria-hidden="true">
          <img src="/assets/shift-glass-field.png" alt="" />
          <div className="mobile-visual-stage__fade" />
          <span className="mobile-visual-stage__accent" />
        </div>

        <div className="next-stage-bridge" id="next-stage">
          <span id="contact" className="anchor-target" aria-hidden="true" />
          <span className="next-stage-bridge__meta">01&nbsp; / &nbsp;NEXT STAGE</span>
          <p>المرحلة الجاية تبدأ من واجهتك.</p>
          <span className="next-stage-bridge__arrow" aria-hidden="true">
            <img src="/assets/mobile-bridge-arrow.svg" alt="" />
            <span>↗</span>
          </span>
        </div>

        <footer className="hero-footer">
          <span className="hero-footer__capabilities">STRATEGY&nbsp;&nbsp; / &nbsp;&nbsp;DESIGN&nbsp;&nbsp; / &nbsp;&nbsp;BUILD</span>
          <a className="hero-footer__scroll" href="#next-stage" onClick={(event) => { event.preventDefault(); scrollToTarget('#next-stage') }}>
            SCROLL TO MOVE <span aria-hidden="true">↓</span>
          </a>
          <p className="hero-footer__line">كل نقلة مهمة تبدأ من الواجهة الصح.</p>
          <span className="hero-footer__rule" aria-hidden="true" />
        </footer>
      </div>
    </main>
  )
}
