import { useEffect, useRef, useState } from 'react'

const capabilityStages = [
  { key: 'momentum', label: '03 / MOMENTUM', title: 'خطوة أسهل للعميل' },
  { key: 'presence', label: '02 / PRESENCE', title: 'حضور يليق بالمرحلة' },
  { key: 'clarity', label: '01 / CLARITY', title: 'وضوح يخلي قيمتك تتشاف' },
]

function SignalVisual({ variant }: { variant: 'desktop' | 'mobile' }) {
  const isMobile = variant === 'mobile'

  return (
    <div
      className={`premium-signal__visual premium-signal__visual--${variant}`}
      role="img"
      aria-label="بوابة دائرية داكنة يخرج منها مسار ضوئي برتقالي"
    >
      <img
        className="premium-signal__aperture"
        src={isMobile ? '/assets/shift-premium-signal-aperture-mobile.png' : '/assets/shift-premium-signal-aperture.png'}
        alt=""
        aria-hidden="true"
      />
      <img
        className="premium-signal__orbit premium-signal__orbit--outer"
        src={isMobile ? '/assets/shift-premium-orbit-outer-mobile.svg' : '/assets/shift-premium-orbit-outer.svg'}
        alt=""
        aria-hidden="true"
      />
      <img
        className="premium-signal__orbit premium-signal__orbit--signal"
        src={isMobile ? '/assets/shift-premium-orbit-signal-mobile.svg' : '/assets/shift-premium-orbit-signal.svg'}
        alt=""
        aria-hidden="true"
      />
      {!isMobile && (
        <img
          className="premium-signal__orbit premium-signal__orbit--secondary"
          src="/assets/shift-premium-orbit-secondary.svg"
          alt=""
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function StageMarker({ kind }: { kind: 'current' | 'next' }) {
  return (
    <picture
      className={`premium-signal__stage-marker premium-signal__stage-marker--${kind}`}
    >
      <source
        media="(max-width: 899px)"
        srcSet={`/assets/shift-premium-marker-${kind}-mobile.svg`}
      />
      <img src={`/assets/shift-premium-marker-${kind}.svg`} alt="" aria-hidden="true" />
    </picture>
  )
}

export default function PremiumSignalSection() {
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
      className={`premium-signal${hasEntered ? ' is-visible' : ''}`}
      id="the-shift"
      aria-labelledby="the-shift-title"
    >
      <div className="premium-signal__canvas">
        <div className="premium-signal__grid" aria-hidden="true" />

        <p className="premium-signal__meta premium-signal__meta--section" dir="ltr">
          02 / THE SHIFT
        </p>
        <p className="premium-signal__meta premium-signal__meta--scroll" dir="ltr">
          <span className="premium-signal__scroll-label premium-signal__scroll-label--desktop">SCROLL TO SHIFT</span>
          <span className="premium-signal__scroll-label premium-signal__scroll-label--mobile">SCROLL / SHIFT</span>
        </p>

        <p className="premium-signal__watermark" aria-hidden="true" dir="ltr">
          SHIFT
        </p>

        <div className="premium-signal__visual-wrap" aria-hidden="true">
          <SignalVisual variant="desktop" />
        </div>
        <div className="premium-signal__visual-wrap premium-signal__visual-wrap--mobile" aria-hidden="true">
          <SignalVisual variant="mobile" />
        </div>

        <div className="premium-signal__copy">
          <h2 id="the-shift-title" className="premium-signal__headline" dir="ltr">
            <span className="premium-signal__headline-ar">هنا يبدأ الـ</span>
            <span className="premium-signal__headline-en" dir="ltr">SHIFT.</span>
          </h2>
          <div className="premium-signal__intro-copy" dir="rtl">
            <p className="premium-signal__subhead">التغيير مش في الشكل بس.</p>
            <p className="premium-signal__body">
              دي نقلة في الطريقة اللي الناس بتشوف بيها شغلك، وبتفهم قيمتك، وبتبدأ معاك.
            </p>
          </div>
        </div>

        <p className="premium-signal__signal-tag" dir="ltr">SIGNAL / 02</p>

        <div className="premium-signal__handoff premium-signal__handoff--current" dir="ltr">
          <span>CURRENT</span>
          <StageMarker kind="current" />
        </div>
        <div className="premium-signal__handoff premium-signal__handoff--next" dir="ltr">
          <span>NEXT STAGE</span>
          <StageMarker kind="next" />
        </div>

        <div className="premium-signal__signal-line" aria-hidden="true" />

        <div className="premium-signal__capability-rail" aria-label="مراحل التحول">
          {capabilityStages.map((stage) => (
            <div className="premium-signal__capability" key={stage.key}>
              <span className="premium-signal__capability-label" dir="ltr">{stage.label}</span>
              <span className="premium-signal__capability-title" dir="auto">{stage.title}</span>
            </div>
          ))}
        </div>

        <p className="premium-signal__footer-cue" dir="ltr">SCROLL TO SHIFT</p>
      </div>
    </section>
  )
}
