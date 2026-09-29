import { Link } from 'react-router-dom'
import { GithubIcon } from './GithubIcon'
import { ThemeToggle } from './ThemeToggle'
import { GITHUB_URL, NAV_LINKS } from '../site'
import './Nav.css'

export function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        {/* Client-side navigation, so it never reloads the current page */}
        <Link className="nav__logo" to="/">
          <img className="nav__mark" src="/logo.png" alt="" width={256} height={256} />
          Umbra
        </Link>

        <nav className="nav__links">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} className="nav__link" to={`/${link.href}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav__end">
          <ThemeToggle />

          <a
            className="btn btn--ghost nav__cta"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span className="btn__icon">
              <GithubIcon />
            </span>
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
