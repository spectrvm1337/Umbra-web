import { results, type ResultItem } from './appData'
import './AppPage.css'

const tileBackground: Record<ResultItem['kind'], string> = {
  app: '#5e5c64',
  folder: '#da702c',
  document: '#4c8a6e',
  audio: '#a05c86',
  video: '#a85252',
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10.9521 10.9642L15 15M12.6667 6.83333C12.6667 10.055 10.055 12.6667 6.83333 12.6667C3.61167 12.6667 1 10.055 1 6.83333C1 3.61167 3.61167 1 6.83333 1C10.055 1 12.6667 3.61167 12.6667 6.83333Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

/** App icon: 36x36 tile with a 20x20 glyph, same as the original. */
function AppTile({ name, kind }: { name: string; kind: ResultItem['kind'] }) {
  return (
    <div className="result-icon">
      <div className="tile" style={{ background: tileBackground[kind] }}>
        <span className="glyph-text">{name.slice(0, 2).toUpperCase()}</span>
      </div>
    </div>
  )
}

export function AppPage() {
  return (
    <div className="umbra-app">
      <div className="search-box">
        <SearchIcon />
        <div className="input-field">
          <input
            className="search-input"
            type="text"
            placeholder="Search for apps, files etc."
            autoComplete="off"
            spellCheck={false}
            defaultValue=""
          />
        </div>
        <button className="settings-btn" aria-label="Settings" type="button">
          <SettingsIcon />
        </button>
      </div>

      <div className="results-wrapper">
        <div className="results-container">
          <div className="results-list">
            {results.map((item, index) => (
              <div key={item.id} className={`result-item${index === 0 ? ' selected' : ''}`}>
                <AppTile name={item.name} kind={item.kind} />
                <div className="result-name">{item.name}</div>
                <div className="result-path">{item.path}</div>
              </div>
            ))}
          </div>

          <div className="hint">
            Type to search · Tab completes · Right-click for actions · !help for commands
          </div>
        </div>
      </div>
    </div>
  )
}
