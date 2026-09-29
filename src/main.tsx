import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { initReveal } from './lib/reveal'

/**
 * 404.html parks the requested path here before bouncing the browser to the
 * real entry point, because GitHub Pages cannot rewrite /themes to index.html.
 * The path always carries the base prefix, which is what the router wants.
 */
const deepLink = (() => {
  try {
    const stored = window.sessionStorage.getItem('umbra-deep-link')
    if (stored) window.sessionStorage.removeItem('umbra-deep-link')
    return stored
  } catch {
    return null
  }
})()

if (deepLink) window.history.replaceState(null, '', deepLink)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

initReveal()
