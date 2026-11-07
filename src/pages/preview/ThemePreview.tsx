import { useEffect, useId, useRef, useState } from 'react'
import { ITEMS, filterItems, highlight } from './data'
import { CrossIcon, GearIcon, PIN_GLYPH, SEARCH_PATH, STROKE_PROPS, TypeGlyph } from './glyphs'
import './umbra.css'

const TABS = [
  { id: 'results', label: 'Results' },
  { id: 'settings', label: 'Settings' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'popups', label: 'Popups' },
] as const

type TabId = (typeof TABS)[number]['id']

/** Toggles a class every `period` ms so a theme's states show themselves. */
function usePulse(period: number, count = 2) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % count), period)
    return () => window.clearInterval(id)
  }, [period, count])
  return i
}

function Row({
  kind,
  name,
  path,
  state = '',
  pinned,
}: {
  kind: string
  name: React.ReactNode
  path: string
  state?: string
  pinned?: boolean
}) {
  return (
    <div className={`result-item ${state}`}>
      <div className="result-icon">
        <div className={`result-icon-fallback ${kind}`}>
          <TypeGlyph kind={kind} />
        </div>
      </div>
      <div className="result-name">{name}</div>
      <div className="result-path">{path}</div>
      <button className={`result-pin${pinned ? ' pinned' : ''}`} type="button" tabIndex={-1}>
        {PIN_GLYPH}
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Scenarios — one at a time, at the size the real app renders them
 * ------------------------------------------------------------------ */

function Results({ query, hover }: { query: string; hover: boolean }) {
  const list = filterItems(ITEMS, query)

  return (
    <>
      {list.length === 0 ? (
        <div id="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>No results found</span>
        </div>
      ) : (
        <div className="tp__list">
          {list.slice(0, 7).map((item, i) => (
            <Row
              key={item.path}
              kind={item.kind}
              name={highlight(item.name, query)}
              path={item.path}
              state={i === 0 ? 'selected' : hover && i === 1 ? 'is-hover' : ''}
              pinned={i === 2}
            />
          ))}
        </div>
      )}
    </>
  )
}

type SettingRow = { label: string; node: React.ReactNode; interactive?: boolean }

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`toggle${on ? ' on' : ''}`}>
      <div className="toggle-knob" />
    </div>
  )
}

function Stepper({ value }: { value: string }) {
  return (
    <div className="zoom-stepper">
      <button className="stepper-btn" type="button" tabIndex={-1}>
        −
      </button>
      <span>{value}</span>
      <button className="stepper-btn" type="button" tabIndex={-1}>
        +
      </button>
    </div>
  )
}

function Seg({ items, active, onPick }: { items: string[]; active: number; onPick?: (i: number) => void }) {
  return (
    <div className="seg-row">
      {items.map((l, i) => (
        <button
          className={`seg-btn${i === active ? ' active' : ''}`}
          type="button"
          key={l}
          tabIndex={-1}
          onClick={onPick ? () => onPick(i) : undefined}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function SettingsCard({ rows, query, id }: { rows: SettingRow[]; query: string; id?: string }) {
  // The real app filters the settings with the search field, so this does too.
  const q = query.trim().toLowerCase()
  const visible = q ? rows.filter((r) => r.label.toLowerCase().includes(q)) : rows
  return (
    <div className="special-card settings-card" id={id}>
      {visible.length === 0 ? (
        <div id="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>No settings match</span>
        </div>
      ) : (
        visible.map((row) => (
          <div key={row.label} className={`settings-row${row.interactive ? ' interactive' : ''}`}>
            <span className="settings-label">{row.label}</span>
            {row.node}
          </div>
        ))
      )}
    </div>
  )
}

function Settings({ query, capturing, toggle, align }: { query: string; capturing: boolean; toggle: boolean; align: number }) {
  const rows: SettingRow[] = [
    { label: 'Appearance', node: <span className="exclude-chevron">›</span>, interactive: true },
    { label: 'Keybinds', node: <span className="exclude-chevron">›</span>, interactive: true },
    { label: 'Language', node: <Seg items={['EN', 'RU', 'DE', 'JA']} active={0} /> },
    {
      label: 'Global Hotkey',
      node: capturing ? (
        <span className="settings-value is-capturing">press keys…</span>
      ) : (
        <span className="settings-value" id="setting-hotkey-value">
          <span className="su-key">Alt</span>
          <span className="su-plus">+</span>
          <span className="su-key">Space</span>
        </span>
      ),
      interactive: true,
    },
    { label: 'Run at Windows startup', node: <Toggle on={toggle} />, interactive: true },
    {
      label: 'Window Position',
      node: (
        <div className="align-grid">
          {Array.from({ length: 9 }, (_, i) => (
            <button className={`align-cell${i === align ? ' active' : ''}`} type="button" key={i} tabIndex={-1} />
          ))}
        </div>
      ),
    },
    { label: 'Favorites', node: <Seg items={['List', 'Left', 'Right']} active={0} /> },
    {
      label: 'Indexed Files',
      node: (
        <>
          <span className="settings-value">787,830 items</span>
          <button className="settings-text-btn" type="button" tabIndex={-1}>
            Rebuild Index
          </button>
        </>
      ),
    },
  ]
  return <SettingsCard rows={rows} query={query} />
}

/** The Appearance panel; its Corner Radius and Search bar gradient switches drive the preview. */
function Appearance({
  query,
  squircle,
  setSquircle,
  gradient,
  setGradient,
}: {
  query: string
  squircle: boolean
  setSquircle: (on: boolean) => void
  gradient: boolean
  setGradient: (on: boolean) => void
}) {
  const swatches = (colors: string[], active: number, plus = true) => (
    <div className="swatch-row">
      {colors.map((c, i) => (
        <button className={`swatch${i === active ? ' active' : ''}`} style={{ background: c }} type="button" key={c} tabIndex={-1} />
      ))}
      {plus && (
        <button className="swatch-custom" type="button" tabIndex={-1}>
          +
        </button>
      )}
    </div>
  )
  const rows: SettingRow[] = [
    { label: 'Theme Presets', node: swatches(['#507090', '#1f5fa8', '#d14d41', '#879a39', '#6f6f6f'], 0) },
    { label: 'Accent Color', node: swatches(['#d14d41', '#da702c', '#4385be', '#879a39', '#8b7ec8'], 2) },
    { label: 'Card Opacity', node: <Stepper value="100%" /> },
    {
      label: 'Card Corner Radius',
      node: (
        <>
          <Seg items={['Round', 'Squircle']} active={squircle ? 1 : 0} onPick={(i) => setSquircle(i === 1)} />
          <Stepper value="12" />
        </>
      ),
    },
    { label: 'Glow Effect', node: <Toggle on={false} /> },
    {
      label: 'Search bar gradient',
      node: (
        <div onClick={() => setGradient(!gradient)} style={{ marginLeft: 'auto', cursor: 'pointer' }}>
          <Toggle on={gradient} />
        </div>
      ),
    },
    { label: 'Animations', node: <span className="settings-value">6/6 ›</span>, interactive: true },
    { label: 'Density', node: <Seg items={['Full', 'Compact', 'All']} active={0} /> },
    { label: 'Row Spacing', node: <Stepper value="12" /> },
    { label: 'Zoom Level', node: <Stepper value="1.00" /> },
  ]
  return <SettingsCard rows={rows} query={query} id="theme-card" />
}

function Popups({ hover }: { hover: boolean }) {
  return (
    <div className="tp__popups">
      <div id="context-menu">
        {[
          ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'M10 17L15 12L10 7', 'Open', 'Enter'],
          ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', '', 'Open as admin', 'Ctrl+Shift+Enter'],
          ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z', '', 'Open directory', ''],
          ['', 'M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z', 'Copy path', ''],
        ].map(([d, d2, label, sc], i) => (
          <div className={`ctx-item${hover && i === 1 ? ' is-on' : ''}`} key={label}>
            <span className="ctx-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {d && <path d={d} />}
                {d2 && <path d={d2} />}
              </svg>
            </span>
            <span className="ctx-item-label">{label}</span>
            {sc && <span className="ctx-item-shortcut">{sc}</span>}
          </div>
        ))}
      </div>

      <div className="special-card">
        <div className="special-action">
          <svg {...STROKE_PROPS} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
          <span>confirm shutdown?</span>
        </div>
      </div>

      <div id="content-menu">
        <div className="ms-head">Current: 4/4</div>
        {[
          ['Select All', true],
          ['Folders', true],
          ['Media', false],
        ].map(([label, checked], i) => (
          <div className={`ms-item${checked ? ' checked' : ''}${i === 1 ? ' is-on' : ''}`} key={label as string}>
            <span className="ms-label">{label as string}</span>
            <svg className="ms-tick" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 6.2L4.8 8.5L9.5 3.5" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Preview
 * ------------------------------------------------------------------ */

export function ThemePreview({ css }: { css: string }) {
  const rawId = useId()
  const scopeClass = `tprev${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [tab, setTab] = useState<TabId>('results')
  const [query, setQuery] = useState('doc')
  const [squircle, setSquircle] = useState(false)
  const [gradient, setGradient] = useState(true)

  const clearRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    const id = window.setInterval(() => clearRef.current?.classList.toggle('is-on'), 1200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css.replace(/:root/g, `.${scopeClass}`)
    document.head.appendChild(style)
    return () => style.remove()
  }, [css, scopeClass])

  const hover = usePulse(1300)
  const capturing = usePulse(2600)
  const toggle = usePulse(2100)
  const align = usePulse(2000, 9)

  return (
    <div className={scopeClass}>
      <div className="tp" data-corners={squircle ? 'squircle' : 'round'} data-search-grad={gradient ? 'on' : 'off'}>
        <div className="tp__tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`tp__tab${tab === t.id ? ' is-on' : ''}`}
              onClick={() => {
                setTab(t.id)
                // The settings are filtered by the query, as in the app; the results example would hide them all.
                if (t.id === 'settings') setQuery('')
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tp__window">
          <div id="search-box">
            <svg id="search-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d={SEARCH_PATH} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div id="input-field">
              <input
                id="search-input"
                value={query}
                spellCheck={false}
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Preview search"
              />
            </div>

            <button id="clear-btn" ref={clearRef} type="button" onClick={() => setQuery('')}>
              <CrossIcon />
            </button>
            <button id="settings-btn" className={tab === 'settings' ? 'open' : ''} type="button" onClick={() => {
                setTab('settings')
                setQuery('')
              }}>
              <GearIcon />
            </button>
          </div>

          <div className="tp__body">
            {tab === 'results' && <Results query={query} hover={!!hover} />}
            {tab === 'settings' && (
              <Settings query={query} capturing={!!capturing} toggle={!!toggle} align={align} />
            )}
            {tab === 'appearance' && (
              <Appearance
                query=""
                squircle={squircle}
                setSquircle={setSquircle}
                gradient={gradient}
                setGradient={setGradient}
              />
            )}
            {tab === 'popups' && <Popups hover={!!hover} />}
          </div>
        </div>
      </div>
    </div>
  )
}
