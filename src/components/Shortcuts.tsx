const SHORTCUTS = [
  { action: 'Open Umbra', keys: 'Alt + Space' },
  { action: 'Open result', keys: 'Enter' },
  { action: 'Copy path', keys: 'Shift + Enter' },
  { action: 'Run as admin', keys: 'Ctrl + Shift + Enter' },
  { action: 'Complete query', keys: 'Tab' },
  { action: 'Move through results', keys: '↑ ↓' },
  { action: 'Close window', keys: 'Esc' },
] as const

export function Shortcuts() {
  return (
    <section className="section" id="shortcuts">
      <p className="section__eyebrow" data-reveal="">Keyboard shortcuts</p>
      <h2 className="section__title" data-reveal="">Keep your hands on the keyboard</h2>
      <p className="section__lead" data-reveal="">
        The global hotkey is remappable in settings, with a capture mode for key presses.
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
