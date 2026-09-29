import { useState } from 'react'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Reveal, SplitText } from '../components/Reveal'
import { ThemePreview } from './preview/ThemePreview'
import { ALL_VARS, NEO_BRUTAL_CSS, SOLARIZED_CSS, TEMPLATE_CSS } from './themeData'
import './ThemesDoc.css'

const PRESETS = [
  { label: 'Template', css: TEMPLATE_CSS },
  { label: 'Neo-Brutal', css: NEO_BRUTAL_CSS },
  { label: 'Solarized', css: SOLARIZED_CSS },
] as const

// Umbra applies these to <html> as inline styles on every theme change, so a
// plain `:root` rule loses to them. They need !important in a custom file.
const INLINE_VARS = new Set([
  '--card-bg',
  '--text',
  '--accent',
  '--card-radius',
  '--card-h',
  '--card-border-w',
  '--glow-size',
])

export function ThemesDoc() {
  const [css, setCss] = useState(TEMPLATE_CSS)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css)
    } catch {
      /* clipboard blocked, the textarea stays selectable */
    }
  }

  return (
    <>
      <Nav />
      <main className="doc">
        <header className="doc__head">
          <p className="section__eyebrow" data-reveal="">
            Documentation
          </p>
          <h1 className="doc__title" data-reveal="">
            <SplitText text="Custom themes" mode="word" />
          </h1>
          <p className="doc__lead" data-reveal="">
            Umbra is styled entirely with CSS custom properties. Redefine the variables
            in your own file and the whole interface changes — no rebuild, no restart.
          </p>
        </header>

        <section className="doc__section">
          <Reveal as="div">
            <h2 className="doc__h2">1. Create the file</h2>
            <ol className="doc__steps">
              <li>Open Umbra settings and press the + swatch next to the theme presets.</li>
              <li>
                Create a new file with a <code>.css</code> extension, for example{' '}
                <code>my_theme.css</code>.
              </li>
              <li>Reopen settings. Your theme now shows up in the presets list.</li>
            </ol>
          </Reveal>
        </section>

        <section className="doc__section">
          <Reveal as="div">
            <h2 className="doc__h2">2. Try it here first</h2>
            <p className="doc__text">
              Edit the CSS on the right. The panel on the left is the real interface at
              its real size — switch tabs to walk through results, settings and popups.
            </p>
          </Reveal>

          <div className="lab" data-reveal="">
            <div className="lab__preview">
              <ThemePreview css={css} />
            </div>

            <div className="lab__editor">
              <div className="lab__bar">
                <span className="lab__tabs">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      className="lab__tab"
                      onClick={() => setCss(preset.css)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </span>
                <button type="button" className="lab__copy" onClick={copy}>
                  Copy
                </button>
              </div>
              <textarea
                className="lab__code"
                value={css}
                spellCheck={false}
                onChange={(event) => setCss(event.target.value)}
                aria-label="Theme CSS"
              />
            </div>
          </div>
        </section>

        <section className="doc__section">
          <Reveal as="div">
            <h2 className="doc__h2">3. Variables you can override</h2>
            <p className="doc__text">
              Every property Umbra reads from <code>:root</code>. The fallback column is the
              value shipped with the Default preset.
            </p>
          </Reveal>

          <div className="vars" data-reveal="">
            {ALL_VARS.map((variable) => (
              <div className="vars__row" key={variable.name}>
                <code className="vars__name">
                  {variable.name}
                  {INLINE_VARS.has(variable.name) && (
                    <span className="vars__flag" title="needs !important">
                      !
                    </span>
                  )}
                </code>
                <span className="vars__desc">{variable.desc}</span>
                <code className="vars__fallback">{variable.fallback}</code>
              </div>
            ))}
          </div>

          <p className="doc__note" data-reveal="">
            The <b>!</b> marks the seven variables Umbra writes directly onto{' '}
            <code>&lt;html&gt;</code> as inline styles. Inline styles beat a normal
            <code>:root</code> rule, so those need <code>!important</code> in your file
            or the in-app sliders will keep overwriting them.
          </p>
        </section>

        <section className="doc__section">
          <Reveal as="div">
            <h2 className="doc__h2">4. Go beyond variables</h2>
            <p className="doc__text">
              Your CSS is injected straight into the running app, so ordinary selectors work
              too. Restyle, hide or animate specific elements. The Neo-Brutal preset in the
              tabs above does nothing but this.
            </p>
            <div className="sels">
              {[
                '#search-box',
                '.result-item',
                '.result-name mark',
                '.result-pin',
                '#context-menu',
                '#content-menu',
                '.settings-row',
                '.seg-btn',
                '.stepper-btn',
                '.toggle',
                '.toggle-knob',
                '.swatch',
                '.align-cell',
                '.settings-text-btn',
                '.special-card',
                '#hint',
                '#empty-state',
                '.drag-bar',
              ].map((sel) => (
                <code className="sels__item" key={sel}>
                  {sel}
                </code>
              ))}
            </div>
            <p className="doc__text">
              Avoid hard-coding colours that are already exposed as variables, otherwise
              the built-in opacity and radius sliders stop working.
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
