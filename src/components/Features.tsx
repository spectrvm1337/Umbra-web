const FEATURES = [
  {
    icon: '/icons/search-icon.svg',
    title: 'Instant search',
    text: 'Indexes the Start menu, the registry, Program Files and every drive on launch. Results show up immediately, with no waiting.',
  },
  {
    icon: '/icons/pin_glyph.svg',
    title: 'Pinned items',
    text: 'Pin any result and drag to reorder. The pinned panel opens on an empty query.',
  },
  {
    icon: '/icons/special-open-link.svg',
    title: 'Web search from the box',
    text: 'A leading ! searches the web — !g, !yt, !gh, !wiki, !py and more. An unknown prefix falls back to Google.',
  },
  {
    icon: '/icons/special-power.svg',
    title: 'Power controls',
    text: 'Power off, reboot or suspend from the search field, behind a confirmation card.',
  },
  {
    icon: '/icons/special-kill-x.svg',
    title: 'Kill a process',
    text: 'kill <name> terminates a process by name.',
  },
  {
    icon: '/icons/ctx-admin-shield.svg',
    title: 'Run as administrator',
    text: 'Right-click any result to open it, open as admin, open its directory or copy the path.',
  },
  {
    icon: '/icons/settings-gear.svg',
    title: 'Make it yours',
    text: 'Accent color, card opacity, corner radius, row height, glow, zoom, window position and monitor choice.',
  },
  {
    icon: '/icons/photo_glyph.svg',
    title: '11 entity types',
    text: 'Apps, shortcuts, folders, documents, images, audio, video, archives, code, files and system utilities.',
  },
] as const

export function Features() {
  return (
    <section className="section" id="features">
      <p className="section__eyebrow" data-reveal="">Features</p>
      <h2 className="section__title" data-reveal="">Everything you need, nothing more</h2>
      <p className="section__lead" data-reveal="">
        A native Rust backend keeps the whole index in memory and returns results in
        milliseconds. The frontend is plain JS with no framework, so the window opens
        the instant you hit the hotkey.
      </p>

      <div className="features">
        {FEATURES.map((feature) => (
          <article className="feature" key={feature.title} data-reveal="">
            <span
              className="feature__icon"
              aria-hidden="true"
              style={
                { '--feature-icon-src': `url("${feature.icon}")` } as React.CSSProperties
              }
            />
            <div className="feature__body">
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__text">{feature.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
