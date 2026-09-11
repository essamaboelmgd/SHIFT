import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

const buildOptions = [
  {
    number: '01',
    slug: 'landing',
    english: 'LANDING',
    result: 'خطوة أسرع',
    title: 'عرضك يوصل من أول لحظة.',
    fit: 'عندك عرض واضح وعايز الناس تفهمه وتعرف تعمل الخطوة الجاية بسرعة.',
    outcome: 'صفحة مركزة توصل الرسالة وتحوّل الاهتمام لتحرك واضح.',
    pricing: 'التسعير بيتحدد حسب نطاق الصفحة ومتطلبات المشروع.',
    kind: 'core',
  },
  {
    number: '02',
    slug: 'business',
    english: 'BUSINESS',
    result: 'حضور أقوى',
    title: 'شغلك ياخد مكانه الطبيعي.',
    fit: 'البيزنس كبر وموقعك لسه مش بيحكي مستوى شغلك.',
    outcome: 'حضور يبني ثقة ويخلّي قرار التواصل أسهل.',
    pricing: 'التسعير بيتحدد حسب نطاق الموقع ومتطلبات المشروع.',
    kind: 'core',
  },
  {
    number: '03',
    slug: 'commerce',
    english: 'COMMERCE',
    result: 'شراء أوضح',
    title: 'الشراء يبقى أسهل.',
    fit: 'عندك منتجات والعميل محتاج طريق أوضح من الاختيار لحد الشراء.',
    outcome: 'تجربة تقلل الاحتكاك وتسهّل على العميل يكمل عملية الشراء.',
    pricing: 'التسعير بيتحدد حسب حجم المتجر ومتطلبات المشروع.',
    kind: 'core',
  },
  {
    number: '04',
    slug: 'learning',
    english: 'LEARNING',
    result: 'تعلم أوضح',
    title: 'خبرتك تتحول لتجربة.',
    fit: 'بتبيع معرفة أو بتدير محتوى تعليمي وعايز تقدمه بشكل منظم.',
    outcome: 'تجربة ترتب المحتوى وتسهّل على المتعلم الوصول والمتابعة.',
    pricing: 'التسعير بيتحدد حسب حجم المحتوى ومتطلبات المنصة.',
    kind: 'core',
  },
  {
    number: '05',
    slug: 'portfolio',
    english: 'PORTFOLIO / PERSONAL BRAND',
    result: 'حضور شخصي',
    title: 'اسمك يسبقك.',
    fit: 'شغلك قائم على خبرتك أو أعمالك.',
    outcome: 'واجهة تجمع شغلك وتحول الانطباع الأول لفرصة.',
    pricing: 'التسعير بيتحدد حسب حجم المحتوى وطريقة العرض.',
    kind: 'core',
  },
  {
    number: '06',
    slug: 'custom',
    english: 'CUSTOM',
    result: 'على مقاسك',
    title: 'حل يتبني حول طريقتك.',
    fit: 'شغلك محتاج منطق خاص، مش قالب جاهز.',
    outcome: 'حل ويب مبني على طريقة شغلك ومتطلباتك الفعلية.',
    pricing: 'التسعير بيتحدد حسب نطاق الحل ومتطلباته.',
    kind: 'custom',
  },
] as const

export default function WhatWeBuildSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeSlug, setActiveSlug] = useState('business')
  const [hasEntered, setHasEntered] = useState(false)
  const activeOption = buildOptions.find((option) => option.slug === activeSlug) ?? buildOptions[1]
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, optionSlug: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveSlug(optionSlug)
      return
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return
    }

    event.preventDefault()
    const currentIndex = buildOptions.findIndex((option) => option.slug === optionSlug)
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1
    const nextOption = buildOptions[(currentIndex + direction + buildOptions.length) % buildOptions.length]
    setActiveSlug(nextOption.slug)
    setTimeout(() => document.getElementById(`build-tab-${nextOption.slug}`)?.focus(), 0)
  }

  const renderDetail = (option: (typeof buildOptions)[number]) => {
    const tabId = `build-tab-${option.slug}`

    return (
      <article
        className="what-build__detail"
        key={option.slug}
        id="build-active-detail"
        role="tabpanel"
        aria-labelledby={tabId}
        aria-live="polite"
      >
        <div className="what-build__detail-signal" aria-hidden="true">
          <svg viewBox="0 0 620 300" role="presentation">
            <path className="what-build__detail-signal-orbit" d="M-24 254C108 42 382 20 646 154" />
            <path className="what-build__detail-signal-route" d="M-18 264C124 286 218 164 318 188S506 258 646 92" />
            <circle className="what-build__detail-signal-node" cx="32" cy="264" r="6" />
            <circle className="what-build__detail-signal-node" cx="318" cy="188" r="6" />
            <circle className="what-build__detail-signal-node what-build__detail-signal-node--active" cx="646" cy="92" r="8" />
          </svg>
        </div>
        <div className="what-build__detail-meta" dir="ltr">
          <span>{option.number} / {option.english}</span>
          <span className="what-build__detail-status">
            {option.kind === 'custom' ? 'CUSTOM PATH' : 'SELECTED PATH'}
          </span>
        </div>

        <h3 id={`build-detail-${option.slug}`}>{option.title}</h3>

        <div className="what-build__detail-copy">
          <p>
            <span className="what-build__detail-label">مناسبة لو</span>
            {option.fit}
          </p>
          <p>
            <span className="what-build__detail-label">النتيجة</span>
            {option.outcome}
          </p>
        </div>

        <div className="what-build__detail-bottom">
          <p className="what-build__detail-pricing">{option.pricing}</p>
          <a className="what-build__detail-cta" href="#contact">
            خلّينا نحدد البداية
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <path d="M5 19 19 5M9 5h10v10" />
              </svg>
            </span>
          </a>
        </div>
      </article>
    )
  }

  const renderTab = (option: (typeof buildOptions)[number]) => {
    const isActive = option.slug === activeOption.slug

    return (
      <button
        className={`what-build__selector-tab${isActive ? ' is-active' : ''}`}
        type="button"
        id={`build-tab-${option.slug}`}
        role="tab"
        aria-selected={isActive}
        aria-controls="build-active-detail"
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveSlug(option.slug)}
        onKeyDown={(event) => handleTabKeyDown(event, option.slug)}
      >
        <span className="what-build__selector-number" dir="ltr">{option.number}</span>
        <span className="what-build__selector-english" dir="ltr">{option.english}</span>
        <span className="what-build__selector-result">{option.result}</span>
      </button>
    )
  }

  const renderSelectorItem = (option: (typeof buildOptions)[number]) => {
    const isActive = option.slug === activeOption.slug

    return (
      <div className={`what-build__selector-item${isActive ? ' is-active' : ''}`} key={option.slug}>
        {renderTab(option)}
        {isActive ? renderDetail(option) : null}
      </div>
    )
  }

  useEffect(() => {
    const section = sectionRef.current

    if (!section || !('IntersectionObserver' in window)) {
      setHasEntered(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`what-build${hasEntered ? ' is-visible' : ''}`}
      id="services"
      aria-labelledby="what-build-title"
    >
      <div className="what-build__canvas">
        <header className="what-build__topline">
          <p className="what-build__meta what-build__meta--section" dir="ltr">03&nbsp; / &nbsp;WHAT WE BUILD</p>
        </header>

        <div className="what-build__lede" dir="rtl">
          <div className="what-build__lede-copy">
            <h2 id="what-build-title" className="what-build__headline">
              مش كل بيزنس
              <br />
              محتاج نفس الموقع.
            </h2>
            <p className="what-build__body">
              الحل الصح يبدأ من المرحلة اللي شغلك فيها، مش من قالب جاهز.
            </p>
          </div>
          <div className="what-build__lede-visual" aria-hidden="true">
            <svg viewBox="0 0 520 250" role="presentation">
              <path className="what-build__lede-orbit" d="M44 200C128 36 332 18 482 132" />
              <path className="what-build__lede-orbit what-build__lede-orbit--accent" d="M40 202C156 198 278 124 474 126" />
              <circle className="what-build__lede-node" cx="44" cy="200" r="5" />
              <circle className="what-build__lede-node what-build__lede-node--active" cx="474" cy="126" r="7" />
            </svg>
          </div>
        </div>

        <div className="what-build__explorer" dir="rtl">
          <nav className="what-build__selector" aria-label="اختار الحل المناسب" role="tablist">
            <p className="what-build__selector-heading">اختار البداية اللي شبه مرحلتك.</p>

            <div className="what-build__selector-list">
              {buildOptions.filter((option) => option.kind === 'core').map(renderSelectorItem)}
            </div>
            <p className="what-build__selector-custom-label" dir="ltr">CUSTOM PATH</p>
            <div className="what-build__selector-custom">
              {buildOptions.filter((option) => option.kind === 'custom').map(renderSelectorItem)}
            </div>
          </nav>
        </div>
      </div>
    </section>
  )
}
