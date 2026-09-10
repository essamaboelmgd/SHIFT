import { useEffect } from 'react'
import ShiftHero from './components/ShiftHero'
import TheShiftSection from './components/TheShiftSection'
import SelectedWorkSection from './components/SelectedWorkSection'
import ProcessSection from './components/ProcessSection'
import WhatWeBuildSection from './components/WhatWeBuildSection'
import WhyShiftSection from './components/WhyShiftSection'
import FaqSection from './components/FaqSection'
import ProjectBriefSection from './components/project-brief/ProjectBriefSection'
import SiteFooter from './components/site-footer/SiteFooter'
import StickyNav from './components/StickyNav'

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const updateScrollScene = () => {
      frame = 0
      const hero = document.getElementById('top')
      const heroHeight = hero?.getBoundingClientRect().height ?? window.innerHeight
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(heroHeight, 1)))

      root.style.setProperty('--shift-hero-drift', `${(-progress * 3.2).toFixed(3)}vh`)
    }

    const scheduleScrollScene = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollScene)
    }

    updateScrollScene()
    window.addEventListener('scroll', scheduleScrollScene, { passive: true })
    window.addEventListener('resize', scheduleScrollScene)

    return () => {
      window.removeEventListener('scroll', scheduleScrollScene)
      window.removeEventListener('resize', scheduleScrollScene)
      if (frame) window.cancelAnimationFrame(frame)
      root.style.removeProperty('--shift-hero-drift')
    }
  }, [])

  return (
    <div className="site-shell">
      <ShiftHero />
      <StickyNav />
      <TheShiftSection />
      <WhatWeBuildSection />
      <SelectedWorkSection />
      <ProcessSection />
      <WhyShiftSection />
      <FaqSection chapterNumber="07" />
      <ProjectBriefSection chapterNumber="08" />
      <SiteFooter />
    </div>
  )
}
