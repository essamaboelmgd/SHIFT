import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type SyntheticEvent,
} from 'react'

export type SelectedWorkProject = {
  slug: string
  title: string
  category: string
  shortResult: string
  image: string
  alt: string
  projectUrl?: string
  proof?: string
  width: number
  height: number
}

const FALLBACK_IMAGE = '/assets/shift-glass-field.png'
const TRANSITION_DURATION = 640
const PROJECT_HANDOFF = 0.42

export const projects: SelectedWorkProject[] = [
  {
    slug: 'kupecut',
    title: 'KUPECUT',
    category: 'PRODUCT BUILD',
    shortResult: 'تجربة رقمية أوضح تخلي الخدمة أسهل في الفهم والبداية.',
    image: '/assets/selected-work/kupecut.webp',
    alt: 'لقطة من موقع Kupecut',
    projectUrl: 'https://kupecut.com',
    proof: '14K+ users',
    width: 5096,
    height: 2588,
  },
  {
    slug: 'argossecops',
    title: 'ARGOS SECOPS',
    category: 'SECURITY PLATFORM',
    shortResult: 'حضور رقمي يترجم الخبرة المعقدة إلى ثقة أوضح.',
    image: '/assets/selected-work/argos.webp',
    alt: 'لقطة من موقع Argos SecOps',
    width: 3814,
    height: 1934,
  },
]

type Direction = 'next' | 'prev'

type WorkTimeline =
  | { phase: 'idle'; activeIndex: number }
  | {
      phase: 'transitioning'
      fromIndex: number
      toIndex: number
      direction: Direction
      progress: number
    }

function wrapIndex(index: number) {
  return (index + projects.length) % projects.length
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function formatCount(count: number) {
  return String(count).padStart(2, '0')
}

function clamp(value: number) {
  return Math.max(0, Math.min(value, 1))
}

function easeOutCubic(value: number) {
  return 1 - ((1 - clamp(value)) ** 3)
}

function getDisplayIndex(timeline: WorkTimeline) {
  if (timeline.phase === 'idle') return timeline.activeIndex
  return timeline.progress < PROJECT_HANDOFF ? timeline.fromIndex : timeline.toIndex
}

function getMotionStyles(timeline: WorkTimeline) {
  if (timeline.phase === 'idle') {
    return { main: undefined, metadata: undefined, preview: undefined }
  }

  const isOutgoing = timeline.progress < PROJECT_HANDOFF
  const localProgress = isOutgoing
    ? easeOutCubic(timeline.progress / PROJECT_HANDOFF)
    : easeOutCubic((timeline.progress - PROJECT_HANDOFF) / (1 - PROJECT_HANDOFF))
  const direction = timeline.direction === 'next' ? -1 : 1
  const opacity = isOutgoing ? 1 - localProgress : localProgress
  const visualOffset = isOutgoing
    ? direction * 7 * localProgress
    : direction * -5 * (1 - localProgress)
  const metadataOffset = isOutgoing ? -8 * localProgress : 8 * (1 - localProgress)

  return {
    main: {
      opacity,
      transform: `translate3d(${visualOffset}%, 0, 0) scale(${isOutgoing ? 1 - (localProgress * 0.012) : 0.988 + (localProgress * 0.012)})`,
    } satisfies CSSProperties,
    metadata: {
      opacity,
      transform: `translate3d(0, ${metadataOffset}px, 0)`,
    } satisfies CSSProperties,
    preview: {
      opacity: Math.max(0.06, opacity),
      transform: `translate3d(0, ${isOutgoing ? localProgress * 5 : (1 - localProgress) * 5}px, 0)`,
    } satisfies CSSProperties,
  }
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget
  if (!image.src.endsWith(FALLBACK_IMAGE)) image.src = FALLBACK_IMAGE
}

function SheetVisual({ project, projectIndex, className, decorative = false, style }: {
  project: SelectedWorkProject
  projectIndex: number
  className: string
  decorative?: boolean
  style?: CSSProperties
}) {
  return (
    <div className={`selected-work__sheet ${className}`} data-project={project.slug} style={style}>
      <div className="selected-work__sheet-surface">
        <span className="selected-work__sheet-index" dir="ltr">{formatIndex(projectIndex)} / PROJECT</span>
        <img
          src={project.image}
          width={project.width}
          height={project.height}
          loading="lazy"
          decoding="async"
          alt={decorative ? '' : project.alt}
          aria-hidden={decorative ? true : undefined}
          onError={handleImageError}
        />
        <span className="selected-work__sheet-wash" aria-hidden="true" />
        <span className="selected-work__sheet-caption" dir="ltr">{project.category}</span>
      </div>
    </div>
  )
}

function ProjectFooter({ project, projectIndex, style }: {
  project: SelectedWorkProject
  projectIndex: number
  style?: CSSProperties
}) {
  return (
    <article
      className="selected-work__footer-layer selected-work__footer-layer--active"
      data-project={project.slug}
      style={style}
    >
      <div className="selected-work__footer-meta" dir="ltr">
        <span>{formatIndex(projectIndex)} / {project.category}</span>
        <span>PROJECT / {project.slug}</span>
      </div>
      <div className="selected-work__footer-main">
        <div>
          <div className="selected-work__title-row">
            <h3 dir="ltr">{project.title}</h3>
            {project.proof && <span className="selected-work__proof" dir="ltr">{project.proof}</span>}
          </div>
          <p>{project.shortResult}</p>
        </div>
        {project.projectUrl && (
          <a className="selected-work__case-study" href={project.projectUrl} target="_blank" rel="noreferrer">
            <span>شوف المشروع</span>
            <span className="selected-work__case-study-arrow" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  )
}

function PreviewChrome({ project }: { project: SelectedWorkProject }) {
  return (
    <>
      <span className="selected-work__preview-label" dir="ltr">NEXT PROJECT</span>
      <span className="selected-work__preview-title" dir="ltr">{project.title}</span>
      <span className="selected-work__preview-marker" aria-hidden="true">↗</span>
    </>
  )
}

function PreviewSheet({ project, projectIndex, onClick, disabled, style }: {
  project: SelectedWorkProject
  projectIndex: number
  onClick: () => void
  disabled: boolean
  style?: CSSProperties
}) {
  return (
    <button
      className="selected-work__preview-sheet"
      type="button"
      onClick={onClick}
      aria-label={`Open next project: ${project.title}`}
      data-project={project.slug}
      disabled={disabled}
      style={style}
    >
      <SheetVisual project={project} projectIndex={projectIndex} className="selected-work__preview-visual" decorative />
      <PreviewChrome project={project} />
    </button>
  )
}

function ProjectControls({ activeIndex, projectCount, onStep, disabled }: {
  activeIndex: number
  projectCount: number
  onStep: (step: 1 | -1) => void
  disabled: boolean
}) {
  return (
    <div className="selected-work__controls" aria-label="Project controls" dir="ltr">
      <button type="button" onClick={() => onStep(-1)} aria-label="Previous project" disabled={disabled}>
        <span>PREV</span><span aria-hidden="true">←</span>
      </button>
      <span className="selected-work__counter" aria-live="polite" aria-atomic="true">
        {formatIndex(activeIndex)} <span>/</span> {formatCount(projectCount)}
      </span>
      <button type="button" onClick={() => onStep(1)} aria-label="Next project" disabled={disabled}>
        <span>NEXT</span><span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

export default function SelectedWorkSection() {
  const [timeline, setTimeline] = useState<WorkTimeline>({ phase: 'idle', activeIndex: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const transitionLockRef = useRef(false)
  const pointerStartRef = useRef<number | null>(null)

  const commitIndex = useCallback((activeIndex: number) => {
    transitionLockRef.current = false
    setTimeline({ phase: 'idle', activeIndex })
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    updateMotionPreference()
    mediaQuery.addEventListener?.('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference)
  }, [])

  const navigate = useCallback((step: 1 | -1) => {
    if (projects.length < 2 || transitionLockRef.current) return
    const activeIndex = timeline.phase === 'idle' ? timeline.activeIndex : timeline.toIndex
    const toIndex = wrapIndex(activeIndex + step)

    if (reducedMotion) {
      commitIndex(toIndex)
      return
    }

    transitionLockRef.current = true
    setTimeline({
      phase: 'transitioning',
      fromIndex: activeIndex,
      toIndex,
      direction: step === 1 ? 'next' : 'prev',
      progress: 0,
    })
  }, [commitIndex, reducedMotion, timeline])

  const timelinePhase = timeline.phase
  const transitionTarget = timeline.phase === 'transitioning' ? timeline.toIndex : -1

  useEffect(() => {
    if (timelinePhase !== 'transitioning' || transitionTarget < 0) return undefined
    let animationFrame = 0
    let startedAt: number | null = null
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(animationFrame)
      commitIndex(transitionTarget)
    }

    const advance = (timestamp: number) => {
      if (startedAt === null) startedAt = timestamp
      const progress = clamp((timestamp - startedAt) / TRANSITION_DURATION)
      setTimeline((current) => current.phase === 'transitioning' ? { ...current, progress } : current)
      if (progress >= 1) finish()
      else animationFrame = requestAnimationFrame(advance)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') finish()
    }

    if (document.visibilityState === 'hidden') finish()
    else {
      document.addEventListener('visibilitychange', handleVisibilityChange)
      animationFrame = requestAnimationFrame(advance)
    }

    return () => {
      finished = true
      cancelAnimationFrame(animationFrame)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [commitIndex, timelinePhase, transitionTarget])

  useEffect(() => {
    if (reducedMotion && timeline.phase === 'transitioning') commitIndex(timeline.toIndex)
  }, [commitIndex, reducedMotion, timeline.phase, transitionTarget])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      navigate(1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      navigate(-1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (transitionLockRef.current) return
    // Keep desktop clicks native: capturing a mouse pointer from the stage retargets
    // the button's pointerup/click back to the stage. Touch alone needs capture so a
    // swipe that leaves the stage can still be completed consistently.
    if (event.pointerType !== 'touch') return
    pointerStartRef.current = event.clientX
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId)
    } catch {
      // Synthetic and already-cancelled pointers can reject capture; swipe tracking remains local.
    }
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current === null) return
    const delta = event.clientX - pointerStartRef.current
    pointerStartRef.current = null
    if (Math.abs(delta) >= 48) navigate(delta < 0 ? 1 : -1)
  }

  const handlePointerCancel = () => {
    pointerStartRef.current = null
  }

  const isTransitioning = timeline.phase === 'transitioning'
  const displayIndex = getDisplayIndex(timeline)
  const displayProject = projects[displayIndex]
  const previewIndex = wrapIndex(displayIndex + 1)
  const previewProject = projects[previewIndex]
  const motionStyles = getMotionStyles(timeline)

  if (!displayProject || !previewProject) return null

  return (
    <section className="selected-work" id="work" aria-labelledby="selected-work-title">
      <div className="selected-work__canvas">
        <header className="selected-work__topline">
          <p className="selected-work__meta" dir="ltr">SHIFT / EDITORIAL WALL</p>
          <p className="selected-work__meta selected-work__meta--section" dir="ltr">04&nbsp; / &nbsp;SELECTED WORK</p>
        </header>

        <div className="selected-work__intro">
          <div className="selected-work__intro-copy">
            <h2 id="selected-work-title">شغل حقيقي،<br /><span>يتحرك لقدّام.</span></h2>
          </div>
          <p className="selected-work__intro-note">مش مجرد واجهات. كل مشروع هنا أخد فكرته وشغله لمكان أوضح.</p>
        </div>

        <div className="selected-work__explorer" role="region" aria-label="المشاريع المختارة">
          <div
            className={`selected-work__stage${isTransitioning ? ' is-transitioning' : ''}`}
            data-direction={isTransitioning ? timeline.direction : undefined}
            data-phase={timeline.phase}
            data-progress={isTransitioning ? timeline.progress.toFixed(3) : '1.000'}
            data-display-index={displayIndex}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="تصفح المشاريع المختارة باستخدام الأسهم أو السحب"
            aria-busy={isTransitioning}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className="selected-work__visuals">
              <div className="selected-work__visual-viewport">
                <SheetVisual
                  project={displayProject}
                  projectIndex={displayIndex}
                  className="selected-work__active-sheet"
                  style={motionStyles.main}
                />
              </div>
            </div>

            <div className="selected-work__stage-footer" aria-live="polite" aria-atomic="true">
              <ProjectFooter project={displayProject} projectIndex={displayIndex} style={motionStyles.metadata} />
            </div>

            <PreviewSheet
              project={previewProject}
              projectIndex={previewIndex}
              onClick={() => navigate(1)}
              disabled={isTransitioning}
              style={motionStyles.preview}
            />

            <div className="selected-work__control-rail">
              <p className="selected-work__control-label">SHIFT / NEXT FRAME</p>
              <ProjectControls
                activeIndex={displayIndex}
                projectCount={projects.length}
                onStep={navigate}
                disabled={isTransitioning}
              />
              <p className="selected-work__control-hint">SWIPE / CLICK / ARROWS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
