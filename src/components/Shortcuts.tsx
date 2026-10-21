const SHORTCUTS = [
  { action: 'Open Umbra', keys: 'Alt + Space' },
  { action: 'Open result', keys: 'Enter' },
  { action: 'Open result by number (hold Ctrl to see them)', keys: 'Ctrl + 1…9' },
  { action: 'Open in Explorer', keys: 'Ctrl + Enter' },
  { action: 'Pin or unpin the selection', keys: 'Ctrl + P' },
  { action: 'Run as admin', keys: 'Ctrl + Shift + Enter' },
  { action: 'Open the selected row into a card (hold)', keys: 'Shift + Space' },
  { action: 'Complete query', keys: 'Tab' },
  { action: 'Move through results', keys: '↑ ↓' },
  { action: 'Walk through earlier queries', keys: 'Alt + ↑ ↓' },
  { action: 'Clear the query, then hide', keys: 'Esc' },
] as const

export function Shortcuts() {
  return (
    <section className="section" id="shortcuts">
      <p className="section__eyebrow" data-reveal="">Keyboard shortcuts</p>
      <h2 className="section__title" data-reveal="">Keep your hands on the keyboard</h2>
      <p className="section__lead" data-reveal="">
        Every shortcut here, the global hotkey included, can be rebound in Settings under
        Keybinds. Settings, the context menu and the dock are reachable by keyboard too.
      </p>

      <div className="keys" data-reveal="">
        {SHORTCUTS.map((shortcut) => (
          <div className="keys__row" key={shortcut.action}>
            <span className="keys__action">{shortcut.action}</span>
            <kbd>{shortcut.keys}</kbd>
          </div>
        ))}
      </div>
    </section>
  )
}