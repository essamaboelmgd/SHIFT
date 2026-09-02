import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

const buildOptions = [
  {
    number: '01',
    slug: 'landing',
    english: 'LANDING',
    result: 'حركة أسرع',
    title: 'عرضك يوصل من أول لحظة.',
    fit: 'عندك عرض واضح وعايز الناس تفهمه وتتحرك بسرعة.',
    outcome: 'صفحة مركزة تخلي الخطوة الجاية أسهل.',
    pricing: 'التسعير حسب نطاق الصفحة ومرحلة الإطلاق.',
    kind: 'core',
  },
  {
    number: '02',
    slug: 'business',
    english: 'BUSINESS',
    result: 'حضور أثبت',
    title: 'شغلك ياخد مكانه الطبيعي.',
    fit: 'البيزنس كبر وموقعك لسه مش بيحكي مستوى شغلك.',
    outcome: 'حضور يبني ثقة ويخلّي قرار التواصل أسهل.',
    pricing: 'التسعير حسب المرحلة وعدد الصفحات المطلوبة.',
    kind: 'core',
  },
  {
    number: '03',
    slug: 'commerce',
    english: 'COMMERCE',
    result: 'بيع أوضح',
    title: 'الشراء يبقى أسهل.',
    fit: 'عندك منتجات والعميل محتاج طريق أوضح للشراء.',
    outcome: 'تجربة تخلي الاختيار والشراء يكملوا من غير لخبطة.',
    pricing: 'التسعير حسب حجم المتجر ومتطلبات الشراء.',
    kind: 'core',
  },
  {
    number: '04',
    slug: 'learning',
    english: 'LEARNING',
    result: 'تجربة تعليم',
    title: 'خبرتك تتحول لتجربة.',
    fit: 'بتبيع معرفة أو بتدير محتوى تعليمي.',
    outcome: 'رحلة منظمة تخلي قيمتك أسهل في المتابعة.',
    pricing: 'التسعير حسب حجم المحتوى ورحلة التعلم.',
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
    pricing: 'التسعير حسب حجم الأعمال وطريقة العرض.',
    kind: 'core',
  },
  {
    number: '06',
    slug: 'custom',
    english: 'CUSTOM',
    result: 'على مقاسك',
    title: 'حل يتبني حول طريقتك.',
    fit: 'شغلك محتاج منطق خاص، مش قالب جاهز.',
    outcome: 'تجربة مصممة على طريقة شغلك الحقيقية.',
    pricing: 'التسعير حسب المرحلة والمتطلبات الخاصة.',
    kind: 'custom',
  },
] as const

export default function WhatWeBuildSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeSlug, setActiveSlug] = useState('business')
  const [hasEntered, setHasEntered] = useState(false)
  const activeOption = buildOptions.find((option) => option.slug === activeSlug) ?? buildOptions[1]
  const activeTabId = `build-tab-${activeOption.slug}`
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
  }
  const renderTab = (option: (typeof buildOptions)[number]) => {
    const isActive = option.slug === activeOption.slug

    return (
      <button
        className={`what-build__selector-tab${isActive ? ' is-active' : ''}`}
        key={option.slug}
        type="button"
        id={`build-tab-${option.slug}`}
        role="tab"
        aria-selected={isActive}
        aria-controls="build-active-detail"
        onClick={() => setActiveSlug(option.slug)}
        onKeyDown={(event) => handleTabKeyDown(event, option.slug)}
      >
        <span className="what-build__selector-number" dir="ltr">{option.number}</span>
        <span className="what-build__selector-english" dir="ltr">{option.english}</span>
        <span className="what-build__selector-result">{option.result}</span>
      </button>
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
          <h2 id="what-build-title" className="what-build__headline">
            مش كل بيزنس
            <br />
            محتاج نفس الموقع.
          </h2>
          <p className="what-build__body">
            الحل الصح يبدأ من المرحلة اللي شغلك فيها، مش من قالب جاهز.
          </p>
        </div>

        <div className="what-build__explorer" dir="rtl">
          <article
            className="what-build__detail"
            key={activeOption.slug}
            id="build-active-detail"
            role="tabpanel"
            aria-labelledby={activeTabId}
            aria-live="polite"
          >
            <div className="what-build__detail-meta" dir="ltr">
              <span>{activeOption.number} / {activeOption.english}</span>
              <span className="what-build__detail-status">
                {activeOption.kind === 'custom' ? 'CUSTOM PATH' : 'SELECTED PATH'}
              </span>
            </div>

            <h3 id={activeTabId}>{activeOption.title}</h3>

            <div className="what-build__detail-copy">
              <p>
                <span className="what-build__detail-label">مناسبة لو</span>
                {activeOption.fit}
              </p>
              <p>
                <span className="what-build__detail-label">النتيجة</span>
                {activeOption.outcome}
              </p>
            </div>

            <div className="what-build__detail-bottom">
              <p className="what-build__detail-pricing">{activeOption.pricing}</p>
              <a className="what-build__detail-cta" href="#contact">
                خلّينا نحدد البداية
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <nav className="what-build__selector" aria-label="اختار الحل المناسب" role="tablist">
            <p className="what-build__selector-heading">اختار البداية اللي شبه مرحلتك.</p>

            <div className="what-build__selector-list">
              {buildOptions.filter((option) => option.kind === 'core').map(renderTab)}
            </div>
            <p className="what-build__selector-custom-label" dir="ltr">CUSTOM PATH</p>
            <div className="what-build__selector-custom">
              {buildOptions.filter((option) => option.kind === 'custom').map(renderTab)}
            </div>
          </nav>
        </div>
      </div>
    </section>
  )
}
