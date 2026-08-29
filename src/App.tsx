import { useEffect } from 'react'
import ShiftHero from './components/ShiftHero'
import PremiumSignalSection from './components/PremiumSignalSection'
import ProcessSection from './components/ProcessSection'

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
      root.style.setProperty('--premium-signal-drift', `${((1 - progress) * 2.4).toFixed(3)}vh`)
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
      root.style.removeProperty('--premium-signal-drift')
    }
  }, [])

  return (
    <div className="site-shell">
      <ShiftHero />
      <PremiumSignalSection />
      <ProcessSection />
    </div>
  )
}
