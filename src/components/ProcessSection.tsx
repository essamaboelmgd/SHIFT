import { useEffect, useRef, useState } from 'react'

const processStages = [
  { number: '01', code: 'ALIGN', title: 'نحدد السؤال.', body: 'نفهم شغلك، الهدف، ومين المفروض الموقع يخاطبه قبل ما نقرر أي حل.' },
  { number: '02', code: 'SHAPE', title: 'نصمم الاتجاه.', body: 'نرتب المحتوى والتجربة ونحوّل الفكرة لاتجاه واضح قبل التطوير.' },
  { number: '03', code: 'BUILD', title: 'نطلعها للنور.', body: 'نبني، نختبر، ونطلق تجربة سريعة ومحسوبة ومستعدة للمرحلة الجاية.' },
] as const

type ProcessStage = (typeof processStages)[number]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [activeStageNumber, setActiveStageNumber] = useState('01')
  const activeStage = processStages.find((stage) => stage.number === activeStageNumber) ?? processStages[0]
  const activeIndex = processStages.findIndex((stage) => stage.number === activeStage.number)
  const progressStyle = { '--process-progress': `${activeIndex * 50}%` } as React.CSSProperties

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) { setHasEntered(true); return undefined }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHasEntered(true); observer.disconnect() }
    }, { threshold: 0.18 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const selectStage = (number: ProcessStage['number']) => setActiveStageNumber(number)

  return (
    <section ref={sectionRef} className={`process-section${hasEntered ? ' is-visible' : ''}`} id="process" aria-labelledby="process-title">
      <div className="process-section__canvas" style={progressStyle}>
        <header className="process-section__rail">
          <p className="process-section__chapter" dir="ltr">05 / PROCESS</p>
          <span aria-hidden="true" />
          <p className="process-section__context" dir="ltr">THE SHIFT / THE ROUTE</p>
        </header>

        <div className="process-section__layout">
          <div className="process-section__editorial">
            <div className="process-section__copy">
              <p className="process-section__eyebrow">من الفكرة لحد الإطلاق، كل خطوة ليها دور.</p>
              <h2 id="process-title" className="process-section__headline">
                <span>مش بنبني موقع وخلاص.</span>
                <span className="process-section__headline-accent">بنرتب الخطوة الجاية.</span>
              </h2>
              <p className="process-section__body">بنبدأ بفهم شغلك والهدف، نرتب الاتجاه والتجربة، وبعدها نبني ونختبر ونطلق.</p>
            </div>

            <div className="process-stage-progress" aria-label="تقدم مراحل العمل">
              <div className="process-stage-progress__line" aria-hidden="true"><span /></div>
              {processStages.map((stage) => {
                const isActive = stage.number === activeStage.number
                return <button key={stage.number} className={`process-stage-progress__button process-route-button${isActive ? ' is-active' : ''}`} type="button" aria-label={`المرحلة ${stage.number}: ${stage.code}`} aria-pressed={isActive} onClick={() => selectStage(stage.number)}><span aria-hidden="true" /><b>{stage.number}</b></button>
              })}
            </div>

            <div className="process-stage-list" role="list" aria-label="مراحل العمل">
              {processStages.map((stage) => {
                const isActive = stage.number === activeStage.number
                return (
                  <div className="process-stage" role="listitem" key={stage.number}>
                    <button className={`process-stage__button process-route-button${isActive ? ' is-active' : ''}`} type="button" aria-pressed={isActive} onClick={() => selectStage(stage.number)}>
                      <span className="process-stage__code" dir="ltr"><b>{stage.number}</b> / {stage.code}</span>
                      <span className="process-stage__copy"><strong>{stage.title}</strong><span>{stage.body}</span></span>
                      <span className="process-stage__arrow" aria-hidden="true">→</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="process-route" aria-live="polite">
            <div className="process-route__heading"><p dir="ltr">CURRENT STAGE</p><span aria-hidden="true" /></div>
            <p className="process-route__word" dir="ltr">{activeStage.code}</p>
            <p className="process-route__sequence" dir="ltr">IDEA&nbsp;&nbsp; → &nbsp;&nbsp;DIRECTION&nbsp;&nbsp; → &nbsp;&nbsp;IMPACT</p>
            <p className="process-route__ghost" aria-hidden="true">{activeStage.number}</p>
            <div className="process-route__path" aria-hidden="true">
              <span className="process-route__curve process-route__curve--soft" />
              <span className="process-route__curve process-route__curve--bright" />
              {processStages.map((stage, index) => <span className={`process-route__gate process-route__gate--${index + 1}${index === activeIndex ? ' is-active' : ''}`} key={stage.number}><i /><b>{stage.number}</b></span>)}
            </div>
            <div className="process-route__active-copy"><span dir="ltr">{activeStage.number} / {activeStage.code}</span><strong>{activeStage.title}</strong><p>{activeStage.body}</p></div>
          </div>
        </div>

        <footer className="process-section__footer"><span dir="ltr">A BETTER WEB AHEAD</span><i /><span dir="ltr">SHIFT / PROCESS</span></footer>
      </div>
    </section>
  )
}
