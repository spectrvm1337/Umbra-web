import { GithubIcon } from './GithubIcon'
import { GITHUB_URL, RELEASES_URL } from '../site'

export function Download() {
  return (
    <section className="section" id="download">
      <div className="download">
        <p className="section__eyebrow">Download</p>
        <h2 className="download__title">Give Umbra a try</h2>
        <p className="download__lead">
          Version 0.1.2 — beta. Either the NSIS installer or the portable{' '}
          <code>umbra.exe</code> with no install step.
        </p>

        <div className="cta-row">
          <a className="btn btn--primary" href={RELEASES_URL} target="_blank" rel="noreferrer">
            Download 0.1.2
          </a>

          <a
            className="btn--square"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code on GitHub"
          >
            <GithubIcon />
          </a>
        </div>

        <div className="hero__badges">
          <span className="badge">Alt + Space</span>
          <span className="badge">Windows x64</span>
          <span className="badge">MIT</span>
        </div>
      </div>
    </section>
  )
}
