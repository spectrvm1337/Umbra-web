import { useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Commands } from './components/Commands'
import { Shortcuts } from './components/Shortcuts'
import { Themes } from './components/Themes'
import { Download } from './components/Download'
import { Footer } from './components/Footer'
import { AppPage } from './pages/AppPage'
import { ThemesDoc } from './pages/ThemesDoc'
import { resumeReveal, suspendReveal } from './lib/reveal'
import { whenScrollSettled } from './lib/scroll'
import './styles/fonts.css'
import './styles/theme.css'
import './styles/buttons.css'
import './styles/sections.css'
import './styles/reveal.css'
import './index.css'

function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Commands />
        <Shortcuts />
        <Themes />
        <Download />
      </main>
      <Footer />
    </>
  )
}

export function App() {
  return (
    // GitHub Pages serves the project from /<repo>/, so the router has to be
    // told where the app actually starts or every route misses.
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/themes" element={<ThemesDoc />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

/**
 * The browser only auto-scrolls to a fragment on a full page load, so a
 * client-side jump from /themes to /#features has to do it by hand — after
 * the target has had a chance to mount.
 *
 * Reveal animations are held for the duration of the scroll: the page must not
 * start animating while the window is still gliding up to the top.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation()
  const firstRun = useRef(true)

  useEffect(() => {
    // A reload has to come up already at the top. Smooth would mean a long
    // ride up from wherever the page was left; only client-side navigation
    // gets the animation.
    const instant = firstRun.current
    firstRun.current = false
    const behavior: ScrollBehavior = instant ? 'auto' : 'smooth'

    let cancelled = false
    suspendReveal()

    // Let the target mount before asking for its position.
    const id = window.setTimeout(() => {
      const el = hash ? document.querySelector(hash) : null
      if (el) el.scrollIntoView({ behavior, block: 'start' })
      else window.scrollTo({ top: 0, left: 0, behavior })

      void whenScrollSettled().then(() => {
        if (!cancelled) resumeReveal()
      })
    }, hash ? 80 : 0)

    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [pathname, hash])

  return null
}
