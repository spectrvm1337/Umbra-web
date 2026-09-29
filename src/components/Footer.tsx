import { Link } from 'react-router-dom'
import { GithubIcon } from './GithubIcon'
import { GITHUB_URL, NAV_LINKS, RELEASES_URL } from '../site'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link className="footer__logo" to="/">
            <img className="footer__mark" src="/logo.png" alt="" width={256} height={256} />
            Umbra
          </Link>
          <p className="footer__copy">A minimalist launcher for Windows.</p>
        </div>

        <nav className="footer__col">
          <span className="footer__heading">Sections</span>
          {NAV_LINKS.map((link) => (
            <Link className="footer__link" key={link.href} to={`/${link.href}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer__col">
          <span className="footer__heading">Project</span>
          <a
            className="footer__link footer__link--icon"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            GitHub
          </a>
          <a className="footer__link" href={RELEASES_URL} target="_blank" rel="noreferrer">
            Releases
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 spectrvm1337</span>
        <span>Written in Rust, wrapped in Tauri</span>
      </div>
    </footer>
  )
}
