import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'أعمالنا', href: '#work' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'طريقتنا', href: '#process' },
  { label: 'عنّا', href: '#why-shift' },
  { label: 'ابدأ مشروعك', href: '#contact' },
]

export default function StickyNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return

    const updateFallback = () => setIsVisible(hero.getBoundingClientRect().bottom <= 0)
    if (typeof IntersectionObserver === 'undefined') {
      updateFallback()
      window.addEventListener('scroll', updateFallback, { passive: true })
      window.addEventListener('resize', updateFallback)
      return () => {
        window.removeEventListener('scroll', updateFallback)
        window.removeEventListener('resize', updateFallback)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting)
    }, { threshold: 0 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!isVisible) setMenuOpen(false)
  }, [isVisible])

  return (
    <header
      className={`sticky-nav${isVisible ? ' is-visible' : ''}`}
      ref={navRef}
      aria-hidden={!isVisible}
    >
      <a className="sticky-nav__brand" href="#top" aria-label="العودة إلى بداية الصفحة" tabIndex={isVisible ? undefined : -1}>
        <img src="/logo/wordmark-white.png" alt="SHIFT" />
      </a>
      <nav className="sticky-nav__links" aria-label="التنقل الرئيسي">
        {navItems.map((item) => <a href={item.href} key={item.href} tabIndex={isVisible ? undefined : -1}>{item.label}</a>)}
      </nav>
      <button className="sticky-nav__toggle" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} aria-controls="sticky-nav-menu" tabIndex={isVisible ? undefined : -1} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <div
        className={`sticky-nav__menu${menuOpen ? ' is-open' : ''}`}
        id="sticky-nav-menu"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="قائمة التنقل">
          {navItems.map((item) => <a href={item.href} key={item.href} tabIndex={menuOpen ? undefined : -1} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
      </div>
    </header>
  )
}
