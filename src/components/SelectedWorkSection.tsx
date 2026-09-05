import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type SyntheticEvent,
} from 'react'
import { createPortal, flushSync } from 'react-dom'

export type SelectedWorkProject = {
  slug: string
  title: string
  category: string
  shortResult: string
  image: string
  alt: string
  caseStudyUrl: string
}

const FALLBACK_IMAGE = '/assets/shift-glass-field.png'
const TRANSITION_DURATION = 760
const MAX_FRAME_DELTA = 34

export const projects: SelectedWorkProject[] = [
  {
    slug: 'kupecut',
    title: 'KUPECUT',
    category: 'PRODUCT BUILD',
    shortResult: 'تجربة رقمية أوضح تخلي الخدمة أسهل في الفهم والبداية.',
    image: '/assets/selected-work/kupecut.png',
    alt: 'لقطة من موقع Kupecut',
    caseStudyUrl: 'https://kupecut.com',
  },
  {
    slug: 'argossecops',
    title: 'ARGOS SECOPS',
    category: 'SECURITY PLATFORM',
    shortResult: 'حضور رقمي يترجم الخبرة المعقدة إلى ثقة أوضح.',
    image: '/assets/selected-work/argos.png',
    alt: 'لقطة من موقع Argos SecOps',
    caseStudyUrl: 'https://argossecops.net',
  },
]

type Direction = 'next' | 'prev'

type TransitionState =
  | { phase: 'idle' }
  | {
      phase: 'transitioning'
      fromIndex: number
      toIndex: number
      direction: Direction
    }

type TransitionGeometry = {
  previewRect: DOMRect
  mainRect: DOMRect
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

function cubicBezierCoordinate(t: number, first: number, second: number) {
  const inverse = 1 - t
  return (3 * inverse * inverse * t * first) + (3 * inverse * t * t * second) + (t * t * t)
}

function premiumEase(progress: number) {
  let lower = 0
  let upper = 1
  let parameter = progress

  for (let iteration = 0; iteration < 10; iteration += 1) {
    parameter = (lower + upper) / 2
    const x = cubicBezierCoordinate(parameter, 0.22, 0.36)

    if (x < progress) lower = parameter
    else upper = parameter
  }

  return cubicBezierCoordinate(parameter, 1, 1)
}

function segmentProgress(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return premiumEase((progress - start) / (end - start))
}

function mix(from: number, to: number, progress: number) {
  return from + ((to - from) * progress)
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget

  if (!image.src.endsWith(FALLBACK_IMAGE)) {
    image.src = FALLBACK_IMAGE
  }
}

function SheetVisual({
  project,
  projectIndex,
  className,
  decorative = false,
  sheetRef,
}: {
  project: SelectedWorkProject
  projectIndex: number
  className: string
  decorative?: boolean
  sheetRef?: (element: HTMLDivElement | null) => void
}) {
  return (
    <div className={`selected-work__sheet ${className}`} ref={sheetRef}>
      <div className="selected-work__sheet-surface">
        <span className="selected-work__sheet-index" dir="ltr">
          {formatIndex(projectIndex)} / PROJECT
        </span>
        <img
          src={project.image}
          alt={decorative ? '' : project.alt}
          aria-hidden={decorative ? true : undefined}
          onError={handleImageError}
        />
        <span className="selected-work__sheet-wash" aria-hidden="true" />
        <span className="selected-work__sheet-caption" dir="ltr">
          {project.category}
        </span>
      </div>
    </div>
  )
}

function ProjectFooter({
  project,
  projectIndex,
  className,
  hidden = false,
  layerRef,
}: {
  project: SelectedWorkProject
  projectIndex: number
  className: string
  hidden?: boolean
  layerRef?: (element: HTMLElement | null) => void
}) {
  return (
    <article
      className={`selected-work__footer-layer ${className}`}
      aria-hidden={hidden}
      ref={layerRef}
    >
      <div className="selected-work__footer-meta" dir="ltr">
        <span>{formatIndex(projectIndex)} / {project.category}</span>
        <span>CASE STUDY / {project.slug}</span>
      </div>
      <div className="selected-work__footer-main">
        <div>
          <h3 dir="ltr">{project.title}</h3>
          <p>{project.shortResult}</p>
        </div>
        <a
          className="selected-work__case-study"
          href={project.caseStudyUrl}
          target="_blank"
          rel="noreferrer"
          tabIndex={hidden ? -1 : undefined}
        >
          <span>VIEW CASE STUDY</span>
          <span className="selected-work__case-study-arrow" aria-hidden="true">↗</span>
        </a>
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

function PreviewSheet({
  project,
  projectIndex,
  onClick,
  className = '',
  previewRef,
  style,
  tabIndex,
}: {
  project: SelectedWorkProject
  projectIndex: number
  onClick?: () => void
  className?: string
  previewRef?: (element: HTMLButtonElement | null) => void
  style?: CSSProperties
  tabIndex?: number
}) {
  return (
    <button
      className={`selected-work__preview-sheet ${className}`}
      type="button"
      onClick={onClick}
      aria-label={`Open next project: ${project.title}`}
      ref={previewRef}
      style={style}
      tabIndex={tabIndex}
    >
      <SheetVisual project={project} projectIndex={projectIndex} className="selected-work__preview-visual" decorative />
      <PreviewChrome project={project} />
    </button>
  )
}

function TransitionOverlay({
  project,
  projectIndex,
  rect,
  overlayRef,
}: {
  project: SelectedWorkProject
  projectIndex: number
  rect: DOMRect
  overlayRef: (element: HTMLDivElement | null) => void
}) {
  if (typeof document === 'undefined') return null

  const style = {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  }

  return createPortal(
    <div
      className="selected-work__transition-overlay"
      ref={overlayRef}
      style={style}
      aria-hidden="true"
    >
      <SheetVisual
        project={project}
        projectIndex={projectIndex}
        className="selected-work__preview-visual selected-work__transition-overlay-visual"
        decorative
      />
      <div className="selected-work__transition-overlay-chrome">
        <PreviewChrome project={project} />
      </div>
    </div>,
    document.body,
  )
}

function ProjectControls({
  activeIndex,
  projectCount,
  onStep,
  disabled,
}: {
  activeIndex: number
  projectCount: number
  onStep: (step: 1 | -1) => void
  disabled: boolean
}) {
  return (
    <div className="selected-work__controls" aria-label="Project controls" dir="ltr">
      <button type="button" onClick={() => onStep(-1)} aria-label="Previous project" disabled={disabled}>
        <span>PREV</span>
        <span aria-hidden="true">←</span>
      </button>
      <span className="selected-work__counter" aria-hidden="true">
        {formatIndex(activeIndex)} <span>/</span> {formatCount(projectCount)}
      </span>
      <button type="button" onClick={() => onStep(1)} aria-label="Next project" disabled={disabled}>
        <span>NEXT</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}

export default function SelectedWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [transition, setTransition] = useState<TransitionState>({ phase: 'idle' })
  const [reducedMotion, setReducedMotion] = useState(false)
  const transitionRef = useRef<TransitionState>({ phase: 'idle' })
  const geometryRef = useRef<TransitionGeometry | null>(null)
  const pointerStartRef = useRef<number | null>(null)
  const mainStageRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLButtonElement | null>(null)
  const outgoingRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const outgoingFooterRef = useRef<HTMLElement | null>(null)
  const incomingFooterRef = useRef<HTMLElement | null>(null)
  const newPreviewRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener?.('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference)
  }, [])

  const beginTransition = useCallback((step: 1 | -1) => {
    if (projects.length < 2 || transitionRef.current.phase === 'transitioning') return

    const mainStage = mainStageRef.current
    const preview = previewRef.current
    const toIndex = wrapIndex(activeIndex + step)

    if (reducedMotion || !mainStage || !preview) {
      setActiveIndex(toIndex)
      return
    }

    const nextTransition: TransitionState = {
      phase: 'transitioning',
      fromIndex: activeIndex,
      toIndex,
      direction: step === 1 ? 'next' : 'prev',
    }

    geometryRef.current = {
      previewRect: preview.getBoundingClientRect(),
      mainRect: mainStage.getBoundingClientRect(),
    }
    transitionRef.current = nextTransition
    setTransition(nextTransition)
  }, [activeIndex, reducedMotion])

  useLayoutEffect(() => {
    if (transition.phase !== 'transitioning') return undefined

    const geometry = geometryRef.current
    const overlay = overlayRef.current
    const outgoing = outgoingRef.current
    const outgoingFooter = outgoingFooterRef.current
    const incomingFooter = incomingFooterRef.current
    const newPreview = newPreviewRef.current

    if (!geometry || !overlay || !outgoing || !outgoingFooter || !incomingFooter || !newPreview) {
      flushSync(() => setActiveIndex(transition.toIndex))
      transitionRef.current = { phase: 'idle' }
      setTransition({ phase: 'idle' })
      return undefined
    }

    const { mainRect, previewRect } = geometry
    const isNext = transition.direction === 'next'
    const overlayStart = isNext
      ? previewRect
      : new DOMRect(mainRect.left - mainRect.width * 1.08, mainRect.top, mainRect.width, mainRect.height)

    overlay.style.left = `${overlayStart.left}px`
    overlay.style.top = `${overlayStart.top}px`
    overlay.style.width = `${overlayStart.width}px`
    overlay.style.height = `${overlayStart.height}px`

    const overlayChrome = overlay.querySelector<HTMLElement>('.selected-work__transition-overlay-chrome')
    const overlayImage = overlay.querySelector<HTMLElement>('.selected-work__transition-overlay-visual img')

    let cancelled = false
    let animationFrame = 0
    let commitFrame = 0
    let elapsedTime = 0
    let previousTimestamp: number | null = null

    const renderFrame = (progress: number) => {
      const outgoingProgress = segmentProgress(progress, 0.02, 0.5)
      const outgoingFade = segmentProgress(progress, 0.38, 0.66)
      const overlayProgress = segmentProgress(progress, isNext ? 0.08 : 0.02, 0.79)
      const chromeProgress = segmentProgress(progress, 0.12, 0.4)
      const outgoingFooterProgress = segmentProgress(progress, 0.33, 0.48)
      const incomingFooterProgress = segmentProgress(progress, 0.56, 0.75)
      const newPreviewProgress = segmentProgress(progress, 0.81, 1)
      const outgoingTravel = mix(0, isNext ? -112 : 112, outgoingProgress)
      const outgoingScale = mix(1, 0.985, outgoingProgress)
      const outgoingOpacity = outgoingFade < 0.46
        ? mix(1, 0.65, outgoingFade / 0.46)
        : mix(0.65, 0, (outgoingFade - 0.46) / 0.54)

      outgoing.style.transform = `translate3d(${outgoingTravel}%, 0, 0) scale(${outgoingScale})`
      outgoing.style.opacity = `${outgoingOpacity}`

      overlay.style.left = `${mix(overlayStart.left, mainRect.left, overlayProgress)}px`
      overlay.style.top = `${mix(overlayStart.top, mainRect.top, overlayProgress)}px`
      overlay.style.width = `${mix(overlayStart.width, mainRect.width, overlayProgress)}px`
      overlay.style.height = `${mix(overlayStart.height, mainRect.height, overlayProgress)}px`
      overlay.style.borderRadius = `${mix(isNext ? 17 : 28, 28, overlayProgress)}px ${mix(isNext ? 2 : 4, 4, overlayProgress)}px ${mix(isNext ? 17 : 28, 28, overlayProgress)}px ${mix(isNext ? 2 : 4, 4, overlayProgress)}px`

      if (overlayChrome) {
        overlayChrome.style.opacity = `${isNext ? 1 - chromeProgress : 0}`
        overlayChrome.style.transform = `translate3d(0, ${mix(0, -8, chromeProgress)}px, 0)`
      }

      if (overlayImage) {
        overlayImage.style.opacity = `${mix(isNext ? 0.72 : 1, 1, overlayProgress)}`
        overlayImage.style.filter = `saturate(${mix(isNext ? 0.8 : 0.86, 0.86, overlayProgress)}) contrast(${mix(isNext ? 1.1 : 1.06, 1.06, overlayProgress)})`
      }

      outgoingFooter.style.opacity = `${1 - outgoingFooterProgress}`
      outgoingFooter.style.transform = `translate3d(0, ${mix(0, -12, outgoingFooterProgress)}px, 0)`
      incomingFooter.style.opacity = `${incomingFooterProgress}`
      incomingFooter.style.transform = `translate3d(0, ${mix(12, 0, incomingFooterProgress)}px, 0)`
      newPreview.style.opacity = `${newPreviewProgress}`
      newPreview.style.transform = `translate3d(${mix(16, 0, newPreviewProgress)}px, 0, 0) scale(${mix(0.97, 1, newPreviewProgress)})`
    }

    const completeTransition = () => {
      if (cancelled || transitionRef.current.phase !== 'transitioning') return

      renderFrame(1)
      flushSync(() => setActiveIndex(transition.toIndex))

      commitFrame = requestAnimationFrame(() => {
        if (cancelled) return
        transitionRef.current = { phase: 'idle' }
        geometryRef.current = null
        setTransition({ phase: 'idle' })
      })
    }

    const advanceTimeline = (timestamp: number) => {
      if (cancelled) return
      if (previousTimestamp !== null) {
        elapsedTime += Math.min(timestamp - previousTimestamp, MAX_FRAME_DELTA)
      }
      previousTimestamp = timestamp

      const progress = Math.min(elapsedTime / TRANSITION_DURATION, 1)
      renderFrame(progress)

      if (progress < 1) animationFrame = requestAnimationFrame(advanceTimeline)
      else completeTransition()
    }

    renderFrame(0)
    animationFrame = requestAnimationFrame(advanceTimeline)

    return () => {
      cancelled = true
      cancelAnimationFrame(animationFrame)
      cancelAnimationFrame(commitFrame)
    }
  }, [transition])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      beginTransition(1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      beginTransition(-1)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (transitionRef.current.phase === 'transitioning') return
    if (event.pointerType === 'mouse' && event.button !== 0) return

    pointerStartRef.current = event.clientX
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current === null) return

    const delta = event.clientX - pointerStartRef.current
    pointerStartRef.current = null

    if (Math.abs(delta) >= 48) {
      beginTransition(delta < 0 ? 1 : -1)
    }
  }

  const handlePointerCancel = () => {
    pointerStartRef.current = null
  }

  const isTransitioning = transition.phase === 'transitioning'
  const fromIndex = isTransitioning ? transition.fromIndex : activeIndex
  const toIndex = isTransitioning ? transition.toIndex : activeIndex
  const activeProject = projects[activeIndex]
  const fromProject = projects[fromIndex]
  const toProject = projects[toIndex]
  const previewIndex = wrapIndex(activeIndex + 1)
  const previewProject = projects[previewIndex]
  const nextPreviewIndex = wrapIndex(toIndex + 1)
  const nextPreviewProject = projects[nextPreviewIndex]
  const geometry = geometryRef.current

  if (!activeProject || !fromProject || !toProject || !previewProject) return null

  return (
    <section className="selected-work" id="work" aria-labelledby="selected-work-title">
      <div className="selected-work__canvas">
        <header className="selected-work__topline">
          <p className="selected-work__meta" dir="ltr">SHIFT / EDITORIAL WALL</p>
          <p className="selected-work__meta selected-work__meta--section" dir="ltr">04&nbsp; / &nbsp;SELECTED WORK</p>
        </header>

        <div className="selected-work__intro">
          <div className="selected-work__intro-copy">
            <h2 id="selected-work-title">
              شغل حقيقي،
              <br />
              <span>يتحرك لقدّام.</span>
            </h2>
          </div>
          <p className="selected-work__intro-note">
            مش مجرد واجهات. كل مشروع هنا أخد فكرته وشغله لمكان أوضح.
          </p>
        </div>

        <div className="selected-work__explorer" role="region" aria-label="المشاريع المختارة">
          <div
            className={`selected-work__stage${isTransitioning ? ' is-transitioning' : ''}`}
            data-direction={isTransitioning ? transition.direction : undefined}
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
            <div className="selected-work__visuals" ref={mainStageRef}>
              <div className="selected-work__visual-viewport">
                {(!isTransitioning || activeIndex === toIndex) && (
                  <SheetVisual
                    project={activeProject}
                    projectIndex={activeIndex}
                    className="selected-work__active-sheet"
                  />
                )}
                {isTransitioning && (
                  <SheetVisual
                    project={fromProject}
                    projectIndex={fromIndex}
                    className="selected-work__transition-sheet selected-work__transition-sheet--outgoing"
                    decorative
                    sheetRef={(element) => { outgoingRef.current = element }}
                  />
                )}
              </div>
            </div>

            <PreviewSheet
              project={previewProject}
              projectIndex={previewIndex}
              onClick={() => beginTransition(1)}
              previewRef={(element) => { previewRef.current = element }}
              style={isTransitioning ? { visibility: 'hidden' } : undefined}
              tabIndex={isTransitioning ? -1 : undefined}
            />

            {isTransitioning && nextPreviewProject && (
              <PreviewSheet
                project={nextPreviewProject}
                projectIndex={nextPreviewIndex}
                className="selected-work__preview-sheet--new"
                previewRef={(element) => { newPreviewRef.current = element }}
                tabIndex={-1}
              />
            )}

            <div className="selected-work__stage-footer" aria-live="polite" aria-atomic="true">
              {!isTransitioning && (
                <ProjectFooter
                  project={activeProject}
                  projectIndex={activeIndex}
                  className="selected-work__footer-layer--active"
                />
              )}
              {isTransitioning && (
                <>
                  <ProjectFooter
                    project={fromProject}
                    projectIndex={fromIndex}
                    className="selected-work__footer-layer--outgoing"
                    hidden
                    layerRef={(element) => { outgoingFooterRef.current = element }}
                  />
                  <ProjectFooter
                    project={toProject}
                    projectIndex={toIndex}
                    className="selected-work__footer-layer--incoming"
                    hidden
                    layerRef={(element) => { incomingFooterRef.current = element }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="selected-work__control-rail">
            <p className="selected-work__control-label">SHIFT / NEXT FRAME</p>
            <ProjectControls
              activeIndex={activeIndex}
              projectCount={projects.length}
              onStep={beginTransition}
              disabled={isTransitioning}
            />
            <p className="selected-work__control-hint">SWIPE / CLICK / ARROWS</p>
          </div>
        </div>
      </div>

      {isTransitioning && geometry && (
        <TransitionOverlay
          project={toProject}
          projectIndex={toIndex}
          rect={transition.direction === 'next' ? geometry.previewRect : geometry.mainRect}
          overlayRef={(element) => { overlayRef.current = element }}
        />
      )}
    </section>
  )
}
