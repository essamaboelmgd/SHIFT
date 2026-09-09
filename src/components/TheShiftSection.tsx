const desktopAperture = '/assets/shift-premium-signal-aperture.png'
const mobileAperture = desktopAperture
const desktopOuterOrbit = '/assets/shift-premium-orbit-outer.svg'
const mobileOuterOrbit = '/assets/shift-premium-orbit-outer-mobile.svg'
const secondaryOrbit = '/assets/shift-premium-orbit-secondary.svg'
const currentMarker = '/assets/shift-premium-marker-current.svg'
const currentMarkerMobile = '/assets/shift-premium-marker-current-mobile.svg'
const nextMarker = '/assets/shift-premium-marker-next.svg'
const nextMarkerMobile = '/assets/shift-premium-marker-next-mobile.svg'
const mobileAtmosphere = '/assets/premium-mobile-orange-atmosphere.svg'

const capabilityStages = [
  { key: 'clarity', label: '01 / CLARITY', title: 'وضوح يخلي قيمتك تتشاف' },
  { key: 'presence', label: '02 / PRESENCE', title: 'حضور يليق بالمرحلة اللي وصلت لها' },
  { key: 'momentum', label: '03 / MOMENTUM', title: 'تجربة تسهّل على العميل الخطوة الجاية' },
] as const

function StageMarker({ kind }: { kind: 'current' | 'next' }) {
  const desktopSource = kind === 'current' ? currentMarker : nextMarker
  const mobileSource = kind === 'current' ? currentMarkerMobile : nextMarkerMobile

  return (
    <picture className={`shift-signal__marker shift-signal__marker--${kind}`}>
      <source media="(max-width: 860px)" srcSet={mobileSource} />
      <img src={desktopSource} alt="" aria-hidden="true" />
    </picture>
  )
}

function SignalArtwork() {
  return (
    <div
      className="shift-signal__artwork"
      role="img"
      aria-label="بوابة دائرية داكنة يخرج منها مسار ضوئي برتقالي"
    >
      <picture className="shift-signal__aperture">
        <source media="(max-width: 860px)" srcSet={mobileAperture} />
        <img src={desktopAperture} alt="" aria-hidden="true" />
      </picture>
      <picture className="shift-signal__outer-orbit">
        <source media="(max-width: 860px)" srcSet={mobileOuterOrbit} />
        <img src={desktopOuterOrbit} alt="" aria-hidden="true" />
      </picture>
      <img className="shift-signal__secondary-orbit" src={secondaryOrbit} alt="" aria-hidden="true" />
      <span className="shift-signal__axis" aria-hidden="true" />
    </div>
  )
}

export default function TheShiftSection() {
  return (
    <section
      className="shift-signal"
      id="the-shift"
      aria-labelledby="shift-signal-title"
    >
      <div className="shift-signal__grid" aria-hidden="true" />
      <div className="shift-signal__glow shift-signal__glow--orange" aria-hidden="true" />
      <div className="shift-signal__glow shift-signal__glow--warm" aria-hidden="true" />
      <div className="shift-signal__inner">
        <header className="shift-signal__topline">
          <p className="shift-signal__eyebrow" dir="ltr"><span className="shift-signal__eyebrow-dot" />02 / THE SHIFT</p>
          <p className="shift-signal__scroll" dir="ltr">
            <span className="shift-signal__scroll-desktop">NEXT STAGE ↓</span>
            <span className="shift-signal__scroll-mobile">NEXT STAGE ↓</span>
          </p>
        </header>

        <div className="shift-signal__visual-stage">
          <div className="shift-signal__copy" dir="rtl">
            <p className="shift-signal__copy-kicker" dir="ltr">FROM PRESENCE TO MOMENTUM</p>
            <h2 id="shift-signal-title" className="shift-signal__headline">
              <span className="shift-signal__headline-ar">هنا يبدأ الـ</span>
              <span className="shift-signal__headline-en" dir="ltr">SHIFT.</span>
            </h2>
            <div className="shift-signal__intro">
              <p className="shift-signal__subhead">التغيير مش في الشكل بس.</p>
              <p className="shift-signal__body">
                دي نقلة في الطريقة اللي الناس بتشوف بيها شغلك، وبتفهم قيمتك، وبتبدأ معاك.
              </p>
            </div>
          </div>

          <div className="shift-signal__artwork-slot">
            <span className="shift-signal__artwork-frame" aria-hidden="true" />
            <SignalArtwork />
            <p className="shift-signal__artwork-note" dir="ltr">A BETTER SIGNAL<br />FOR WHAT COMES NEXT</p>
          </div>
        </div>

        <div className="shift-signal__progress-zone">
          <div className="shift-signal__handoff-row">
            <p className="shift-signal__handoff shift-signal__handoff--current" dir="ltr"><span>01</span> CURRENT</p>
            <p className="shift-signal__handoff shift-signal__handoff--next" dir="ltr">NEXT STAGE <span>03</span></p>
          </div>

          <div className="shift-signal__progress" aria-hidden="true">
            <span className="shift-signal__progress-guide" />
            <span className="shift-signal__progress-active" />
            <StageMarker kind="current" />
            <StageMarker kind="next" />
          </div>

          <div className="shift-signal__capability-rail" aria-label="مراحل التحول">
            {capabilityStages.map((stage) => (
              <div className={`shift-signal__capability shift-signal__capability--${stage.key}`} key={stage.key}>
                <span className="shift-signal__capability-label" dir="ltr">{stage.label}</span>
                <span className="shift-signal__capability-title" dir="rtl">{stage.title}</span>
                <span className="shift-signal__capability-arrow" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shift-signal__mobile-atmosphere" aria-hidden="true">
        <img src={mobileAtmosphere} alt="" />
      </div>
    </section>
  )
}
