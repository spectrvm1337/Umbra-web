import { Link } from 'react-router-dom'

// Exactly the three values each preset stores in THEME_PRESETS (main.js).
// Everything else the swatch shows is derived in CSS with the app's own
// color-mix() formulas, so nothing here is invented.
const THEMES = [
  { name: 'Default', card: '#1e1e1e', text: '#e3e3e3', accent: '#507090' },
  { name: 'OLED', card: '#000000', text: '#e3e3e3', accent: '#507090' },
  { name: 'Flexoki', card: '#1c1b1a', text: '#cecdc3', accent: '#4385be' },
  { name: 'Paper', card: '#f2f0e5', text: '#100f0f', accent: '#205ea6' },
  { name: 'Slate', card: '#16181d', text: '#e3e3e3', accent: '#6c8cb0' },
  { name: 'Cocoa', card: '#231c16', text: '#e3e3e3', accent: '#b08950' },
] as const

export function Themes() {
  return (
    <section className="section" id="themes">
      <p className="section__eyebrow" data-reveal="">Themes</p>
        <h2 className="section__title" data-reveal="">
          Six presets, plus your own&nbsp;CSS
        </h2>
      <p className="section__lead" data-reveal="">
        Colors, opacity, corner radius, glow and borders are all adjustable. Or write a
        theme in CSS and drop it into the <code>themes</code> folder — Umbra loads every
        file from there. See the{' '}
        <Link className="link" to="/themes">
          theming guide
        </Link>
        .
      </p>

      <div className="themes" data-reveal="">
        {THEMES.map((theme) => (
          <div className="theme" key={theme.name}>
            <div
              className="theme__preview"
              style={{ background: `color-mix(in srgb, ${theme.card} 72%, #000)` }}
            >
              <div className="theme__bar theme__bar--long" style={{ background: theme.card }} />
              <div className="theme__bar theme__bar--mid" style={{ background: theme.card }} />
              <div className="theme__bar theme__bar--short" style={{ background: theme.accent }} />
            </div>
            <div className="theme__name">{theme.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
