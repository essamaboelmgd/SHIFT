import { useEffect, useRef, useState } from 'react'

const processStages = [
  {
    number: '01',
    code: 'ALIGN',
    title: 'نحدد السؤال',
    body: 'نفهم هدفك قبل ما نرسم الحل.',
    active: false,
  },
  {
    number: '02',
    code: 'SHAPE',
    title: 'نصمم الاتجاه',
    body: 'نحوّل الفكرة لتجربة واضحة ومميزة.',
    active: true,
  },
  {
    number: '03',
    code: 'BUILD',
    title: 'نطلعها للنور',
    body: 'نبنيها بسرعة محسوبة ومستعدة للنمو.',
    active: false,
  },
] as const

function RouteMarker({
  variant,
  placement,
  muted = false,
  className = '',
}: {
  variant: 'desktop' | 'mobile'
  placement: 'panel' | 'board'
  muted?: boolean
  className?: string
}) {
  const desktopSource = placement === 'panel'
    ? muted
      ? '/assets/process-route-mark-panel-desktop-outer.svg'
      : '/assets/process-route-mark-panel-desktop-active.svg'
    : muted
      ? '/assets/process-route-mark-desktop-muted.svg'
      : '/assets/process-route-mark-desktop-active.svg'
  const mobileSource = muted
    ? '/assets/process-route-mark-mobile-muted.svg'
    : '/assets/process-route-mark-mobile-active.svg'

  return (
    <picture>
      <source media="(max-width: 899px)" srcSet={mobileSource} />
      <img className={className} src={variant === 'mobile' ? mobileSource : desktopSource} alt="" aria-hidden="true" />
    </picture>
  )
}

function RouteSignature() {
  return (
    <div className="process-route-signature" aria-hidden="true">
      <span className="process-route-signature__label" dir="ltr">THE METHOD&nbsp; / &nbsp;03 MOVES</span>
      <span className="process-route-signature__active" dir="ltr">ACTIVE / 02</span>
      <span className="process-route-signature__word" dir="ltr">ROUTE</span>
      <div className="process-route-signature__track">
        <span className="process-route-signature__track-base" />
        <span className="process-route-signature__track-active" />
        <RouteMarker placement="panel" variant="desktop" className="process-route-signature__marker process-route-signature__marker--one" />
        <RouteMarker placement="panel" variant="desktop" className="process-route-signature__marker process-route-signature__marker--two" />
        <RouteMarker placement="panel" variant="desktop" muted className="process-route-signature__marker process-route-signature__marker--three" />
      </div>
      <span className="process-route-signature__legend process-route-signature__legend--one process-route-signature__legend--desktop" dir="ltr">CLARITY</span>
      <span className="process-route-signature__legend process-route-signature__legend--two process-route-signature__legend--desktop" dir="ltr">FORM</span>
      <span className="process-route-signature__legend process-route-signature__legend--three process-route-signature__legend--desktop" dir="ltr">MOMENTUM</span>
      <span className="process-route-signature__legend--mobile" dir="ltr">CLARITY&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;FORM&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;MOMENTUM</span>
    </div>
  )
}

function RouteBoard() {
  return (
    <div className="process-route-board" role="group" aria-label="مراحل العمل">
      <div className="process-route-board__index" aria-hidden="true">
        <span className="process-route-board__spine" />
        <RouteMarker placement="board" variant="desktop" className="process-route-board__marker process-route-board__marker--one" />
        <RouteMarker placement="board" variant="desktop" className="process-route-board__marker process-route-board__marker--two" />
        <RouteMarker placement="board" variant="desktop" muted className="process-route-board__marker process-route-board__marker--three" />
        <span className="process-route-board__number process-route-board__number--one">01</span>
        <span className="process-route-board__number process-route-board__number--two">02</span>
        <span className="process-route-board__number process-route-board__number--three">03</span>
      </div>

      <span className="process-route-board__divider process-route-board__divider--one" aria-hidden="true" />
      <span className="process-route-board__divider process-route-board__divider--two" aria-hidden="true" />

      <div className="process-route-board__rows" role="list">
        {processStages.map((stage) => (
          <article
            className={`process-route-row${stage.active ? ' is-active' : ''}`}
            key={stage.number}
            role="listitem"
          >
            <span className="process-route-row__code" dir="ltr">
              {stage.number}&nbsp; / &nbsp;{stage.code}
            </span>
            <h3 className="process-route-row__title" dir="auto">{stage.title}</h3>
            <p className="process-route-row__body" dir="auto">{stage.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

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
      { threshold: 0.18 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`process-section${hasEntered ? ' is-visible' : ''}`}
      id="process"
      aria-labelledby="process-title"
    >
      <div className="process-section__canvas">
        <div className="process-section__grid" aria-hidden="true" />
        <div className="process-section__glow process-section__glow--orange" aria-hidden="true" />
        <div className="process-section__glow process-section__glow--warm" aria-hidden="true" />
        <div className="process-section__atmosphere process-section__atmosphere--desktop" aria-hidden="true">
          <img src="/assets/process-orange-atmosphere.svg" alt="" />
        </div>

        <p className="process-section__meta process-section__meta--section" dir="ltr">03 / PROCESS</p>
        <p className="process-section__meta process-section__meta--context" dir="ltr">
          <span className="process-section__meta--context-desktop">THE SHIFT&nbsp; / &nbsp;NEXT</span>
          <span className="process-section__meta--context-mobile">THE SHIFT</span>
        </p>

        <div className="process-section__copy">
          <p className="process-section__eyebrow"><span className="process-section__eyebrow-dot" />هنا يبدأ الـ SHIFT</p>
          <h2 id="process-title" className="process-section__headline">
            <span>مش بنبني موقع وخلاص.</span>
            <span className="process-section__headline-accent">بنرتّب الخطوة الجاية.</span>
          </h2>
          <p className="process-section__body">من أول سؤال لحد أول زيارة، كل قرار له دور.</p>
        </div>

        <RouteSignature />

        <p className="process-section__route-label process-section__route-label--desktop" dir="ltr">THE THREE MOVES</p>
        <p className="process-section__route-label process-section__route-label--mobile" dir="ltr">THE THREE MOVES&nbsp; / &nbsp;ONE WAY</p>
        <p className="process-section__route-promise" dir="ltr">A CLEARER WAY FORWARD</p>
        <RouteBoard />

        <p className="process-section__result">كل خطوة أوضح من اللي قبلها.</p>
        <p className="process-section__footer" dir="ltr">SHIFT / NEXT STAGE&nbsp; ↗</p>
        <span className="process-section__footer-rule" aria-hidden="true" />
      </div>
    </section>
  )
}
