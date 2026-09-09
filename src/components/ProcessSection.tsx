import { useEffect, useRef, useState } from 'react'

const processStages = [
  { number: '01', code: 'ALIGN', title: 'نحدد السؤال', body: 'نفهم هدفك قبل ما نرسم الحل.', signal: 'CLARITY' },
  { number: '02', code: 'SHAPE', title: 'نصمم الاتجاه', body: 'نحوّل الفكرة لتجربة واضحة ومميزة.', signal: 'FORM' },
  { number: '03', code: 'BUILD', title: 'نطلعها للنور', body: 'نبنيها بسرعة محسوبة ومستعدة للنمو.', signal: 'MOMENTUM' },
] as const

type ProcessStage = (typeof processStages)[number]
type StageProps = { activeStage: ProcessStage; activeIndex: number; onSelect: (number: ProcessStage['number']) => void }
const stageStyle = (activeIndex: number) => ({ '--process-progress': `${activeIndex * 50}%` } as React.CSSProperties)

function RouteMarker({ placement, active, className = '' }: { placement: 'panel' | 'board'; active: boolean; className?: string }) {
  const source = placement === 'panel'
    ? active ? '/assets/process-route-mark-panel-desktop-active.svg' : '/assets/process-route-mark-panel-desktop-outer.svg'
    : active ? '/assets/process-route-mark-desktop-active.svg' : '/assets/process-route-mark-desktop-muted.svg'
  return <img className={className} src={source} alt="" aria-hidden="true" />
}

function RouteSignature({ activeStage, activeIndex, onSelect }: StageProps) {
  return <div className="process-route-signature" style={stageStyle(activeIndex)}>
    <span className="process-route-signature__label" dir="ltr">THE METHOD&nbsp; / &nbsp;03 MOVES</span>
    <span className="process-route-signature__active" dir="ltr">ACTIVE / {activeStage.number}</span>
    <span className="process-route-signature__word" dir="ltr">{activeStage.code}</span>
    <div className="process-route-signature__track" aria-label="اختيار مرحلة العمل">
      <span className="process-route-signature__track-base" aria-hidden="true" /><span className="process-route-signature__track-active" aria-hidden="true" />
      {processStages.map((stage, index) => {
        const isActive = stage.number === activeStage.number
        return <button aria-label={`المرحلة ${stage.number}: ${stage.code}`} aria-pressed={isActive} className={`process-route-button process-route-signature__marker process-route-signature__marker--${index + 1}${isActive ? ' is-active' : ''}`} key={stage.number} onClick={() => onSelect(stage.number)} type="button"><RouteMarker placement="panel" active={index <= activeIndex} /></button>
      })}
    </div>
    {processStages.map((stage, index) => <span className={`process-route-signature__legend process-route-signature__legend--${index + 1} process-route-signature__legend--desktop${stage.number === activeStage.number ? ' is-active' : ''}`} dir="ltr" key={stage.number}>{stage.signal}</span>)}
    <span className="process-route-signature__legend--mobile" dir="ltr">{activeStage.signal} / ACTIVE MOVE</span>
  </div>
}

function RouteBoard({ activeStage, activeIndex, onSelect }: StageProps) {
  return <div className="process-route-board" role="group" aria-label="مراحل العمل" style={stageStyle(activeIndex)}>
    <div className="process-route-board__index" aria-hidden="true">
      <span className="process-route-board__spine" />
      {processStages.map((stage, index) => <RouteMarker active={index <= activeIndex} className={`process-route-board__marker process-route-board__marker--${index + 1}`} key={stage.number} placement="board" />)}
      {processStages.map((stage, index) => <span className={`process-route-board__number process-route-board__number--${index + 1}${stage.number === activeStage.number ? ' is-active' : ''}`} key={stage.number}>{stage.number}</span>)}
    </div>
    <div className="process-route-board__rows" role="list">
      {processStages.map((stage) => {
        const isActive = stage.number === activeStage.number
        return <div className="process-route-row" key={stage.number} role="listitem"><button aria-pressed={isActive} className={`process-route-button process-route-row__button${isActive ? ' is-active' : ''}`} onClick={() => onSelect(stage.number)} type="button"><span className="process-route-row__code" dir="ltr">{stage.number}&nbsp; / &nbsp;{stage.code}</span><span className="process-route-row__title" dir="auto">{stage.title}</span><span className="process-route-row__body" dir="auto">{stage.body}</span></button></div>
      })}
    </div>
  </div>
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [activeStageNumber, setActiveStageNumber] = useState('01')
  const activeStage = processStages.find((stage) => stage.number === activeStageNumber) ?? processStages[0]
  const activeIndex = processStages.findIndex((stage) => stage.number === activeStage.number)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) { setHasEntered(true); return undefined }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setHasEntered(true); observer.disconnect() } }, { threshold: 0.18 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return <section ref={sectionRef} className={`process-section${hasEntered ? ' is-visible' : ''}`} id="process" aria-labelledby="process-title"><div className="process-section__canvas">
    <div className="process-section__grid" aria-hidden="true" /><div className="process-section__glow process-section__glow--orange" aria-hidden="true" /><div className="process-section__glow process-section__glow--warm" aria-hidden="true" /><div className="process-section__atmosphere process-section__atmosphere--desktop" aria-hidden="true"><img src="/assets/process-orange-atmosphere.svg" alt="" /></div>
    <p className="process-section__meta process-section__meta--section" dir="ltr">05 / PROCESS</p><p className="process-section__meta process-section__meta--context" dir="ltr"><span className="process-section__meta--context-desktop">THE SHIFT&nbsp; / &nbsp;NEXT</span><span className="process-section__meta--context-mobile">THE SHIFT</span></p>
    <div className="process-section__copy"><p className="process-section__eyebrow"><span className="process-section__eyebrow-dot" />هنا يبدأ الـ SHIFT</p><h2 id="process-title" className="process-section__headline"><span>مش بنبني موقع وخلاص.</span><span className="process-section__headline-accent">بنرتب الخطوة الجاية.</span></h2><p className="process-section__body">من أول سؤال لحد أول زيارة، كل قرار له دور.</p></div>
    <RouteSignature activeIndex={activeIndex} activeStage={activeStage} onSelect={setActiveStageNumber} />
    <p className="process-section__route-label process-section__route-label--desktop" dir="ltr">THE THREE MOVES</p><p className="process-section__route-label process-section__route-label--mobile" dir="ltr">THE THREE MOVES&nbsp; / &nbsp;ONE WAY</p><p className="process-section__route-promise" dir="ltr">A CLEARER WAY FORWARD</p>
    <RouteBoard activeIndex={activeIndex} activeStage={activeStage} onSelect={setActiveStageNumber} />
    <p className="process-section__result">{activeStage.body}</p><p className="process-section__footer" dir="ltr">SHIFT / NEXT STAGE&nbsp; ↗</p><span className="process-section__footer-rule" aria-hidden="true" />
  </div></section>
}
