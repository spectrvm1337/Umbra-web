import { useEffect, useState } from 'react'
import './ThemeToggle.css'

type SiteTheme = 'dark' | 'paper'

const STORAGE_KEY = 'umbra-theme'

function read(): SiteTheme {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'paper' ? 'paper' : 'dark'
  } catch {
    return 'dark'
  }
}

function apply(theme: SiteTheme) {
  const root = document.documentElement
  if (theme === 'paper') root.dataset.theme = 'paper'
  else delete root.dataset.theme
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<SiteTheme>(read)

  useEffect(() => {
    apply(theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* private mode, the choice just will not stick */
    }
  }, [theme])

  const label = theme === 'dark' ? 'Switch to the Paper theme' : 'Switch to the dark theme'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'paper' : 'dark')}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}
