import { useEffect, useRef, useState } from 'react'

const buildOptions = [
  {
    number: '01',
    slug: 'landing',
    english: 'LANDING',
    title: 'صفحة هبوط',
    result: 'حركة أسرع',
    description: 'لما محتاج عرضك يتحرك بسرعة.',
  },
  {
    number: '02',
    slug: 'business',
    english: 'BUSINESS',
    title: 'موقع شركة',
    result: 'حضور أثبت',
    description: 'لحضور يليق بمستوى شغلك.',
  },
  {
    number: '03',
    slug: 'commerce',
    english: 'COMMERCE',
    title: 'متجر إلكتروني',
    result: 'بيع أوضح',
    description: 'لتجربة شراء أوضح وأسهل.',
  },
  {
    number: '04',
    slug: 'learning',
    english: 'LEARNING',
    title: 'منصة تعليم',
    result: 'تجربة تعليم',
    description: 'لإدارة المحتوى والرحلة التعليمية.',
  },
  {
    number: '05',
    slug: 'custom',
    english: 'CUSTOM',
    title: 'حل مخصص',
    result: 'على مقاسك',
    description: 'لما الحل يحتاج أكتر من قالب.',
  },
] as const

export default function WhatWeBuildSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const activeOption = buildOptions[activeIndex]

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
      data-active-index={activeIndex}
      aria-labelledby="what-build-title"
    >
      <div className="what-build__canvas">
        <div className="what-build__grid" aria-hidden="true" />
        <div className="what-build__glow what-build__glow--orange" aria-hidden="true" />
        <div className="what-build__glow what-build__glow--blue" aria-hidden="true" />
        <div className="what-build__watermark" aria-hidden="true">WEB</div>

        <header className="what-build__topline">
          <p className="what-build__meta what-build__meta--section" dir="ltr">03&nbsp; / &nbsp;WHAT WE BUILD</p>
          <p className="what-build__meta" dir="ltr">WEB FIRST&nbsp; / &nbsp;NEXT STAGE</p>
        </header>

        <div className="what-build__intro">
          <div className="what-build__copy" dir="rtl">
            <p className="what-build__eyebrow">الأساس اللي شغلك محتاجه دلوقتي</p>
            <h2 id="what-build-title" className="what-build__headline">
              مش كل بيزنس
              <br />
              محتاج نفس الموقع.
            </h2>
            <p className="what-build__body">
              بنختار الحل المناسب لمرحلتك،
              <br />
              ونبنيه عشان يشتغل معاك.
            </p>
            <p className="what-build__direction" dir="ltr">WEB FIRST&nbsp; / &nbsp;BUILT FOR THE NEXT MOVE</p>
          </div>

          <div className="what-build__system" dir="rtl">
            <div className="what-build__system-head">
              <div className="what-build__system-head-meta">
                <p dir="ltr">WEB FIRST</p>
                <span dir="ltr">{activeOption.number} / ACTIVE MODE</span>
              </div>
              <h3>
                موقع يشتغل
                <br />
                مع مرحلة شغلك.
              </h3>
            </div>

            <div className="what-build__system-focus" id="build-active-detail" key={activeOption.slug} aria-live="polite">
              <div className="what-build__system-focus-topline">
                <span dir="ltr">{activeOption.number} / {activeOption.english}</span>
                <span>{activeOption.result}</span>
              </div>
              <strong>{activeOption.title}</strong>
              <p>{activeOption.description}</p>
            </div>

            <div className="what-build__system-rule" aria-hidden="true" />

            <div className="what-build__stack" role="group" aria-label="اختيارات حلول الويب">
              {buildOptions.map((option, index) => (
                <button
                  className={`what-build__stack-row${index === activeIndex ? ' is-active' : ''}`}
                  key={option.slug}
                  type="button"
                  aria-pressed={index === activeIndex}
                  aria-controls="build-active-detail"
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="what-build__stack-number" dir="ltr">{option.number}</span>
                  <span className="what-build__stack-english" dir="ltr">{option.english}</span>
                  <span className="what-build__stack-arabic">{option.result}</span>
                </button>
              ))}
            </div>

            <p className="what-build__system-foot" dir="ltr">ONE SYSTEM&nbsp; / &nbsp;MANY WAYS TO MOVE</p>
          </div>
        </div>

        <div className="what-build__offer">
          <div className="what-build__offer-intro" dir="rtl">
            <p className="what-build__offer-kicker" dir="ltr">THE OFFER&nbsp; / &nbsp;ONE FOCUS</p>
            <h3>حلول ويب واضحة<br />لخطوتك الجاية.</h3>
            <p>
              من صفحة هبوط سريعة لمتجر أو منصة تعليمية،
              <br />
              كل حل له دور واضح في نمو شغلك.
            </p>
            <span>اختار البداية. نكمّل معاك من هناك.</span>
          </div>

          <div className="what-build__services" role="group" aria-label="خدمات الويب">
            {buildOptions.map((option, index) => (
              <button
                className={`what-build__service-card${index === activeIndex ? ' is-active' : ''}`}
                key={option.slug}
                type="button"
                aria-pressed={index === activeIndex}
                aria-controls="build-active-detail"
                onClick={() => setActiveIndex(index)}
              >
                <span className="what-build__service-code" dir="ltr">{option.number}&nbsp; / &nbsp;{option.english}</span>
                <strong>{option.title}</strong>
                <span>{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        <footer className="what-build__footer">
          <a className="what-build__cta" href="#contact">
            ابدأ من الحل المناسب لمرحلتك
            <span aria-hidden="true">↗</span>
          </a>
          <p dir="ltr">SHIFT&nbsp; / &nbsp;WHAT WE BUILD&nbsp; / &nbsp;03</p>
          <span className="what-build__footer-rule" aria-hidden="true" />
        </footer>
      </div>
    </section>
  )
}
