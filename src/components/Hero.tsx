import { GithubIcon } from './GithubIcon'
import { SplitText } from './Reveal'
import { GITHUB_URL } from '../site'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__title" data-reveal="">
            <img className="hero__mark" src="/logo.png" alt="" width={256} height={256} />
            <SplitText text="Umbra" mode="char" />
          </h1>

          <p className="hero__lead" data-reveal="">
            A minimalist launcher for Windows. Press Alt + Space and everything on
            your drive is in one list.
          </p>

          <div className="hero__actions" data-reveal="">
            <div className="hero__download">
              <a className="btn btn--primary" href="#download">
                Download 0.1.2
              </a>
              <a className="btn-note" href="#download">
                or the portable <code>umbra.exe</code>
              </a>
            </div>

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

          <div className="hero__badges" data-reveal="">
            <span className="badge">Rust + Tauri</span>
            <span className="badge">Windows x64</span>
            <span className="badge">MIT</span>
          </div>
        </div>

        <div className="hero__shot" data-reveal="">
          <img
            src="/umbra-app.png"
            alt="Umbra — search and launch apps"
            width={1112}
            height={826}
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
