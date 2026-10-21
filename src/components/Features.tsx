import { asset } from '../site'

const FEATURES = [
  {
    icon: asset('/icons/search-icon.svg'),
    title: 'Instant search',
    text: 'The index is built once and kept on disk, so Umbra answers immediately instead of rescanning your drives on every launch.',
  },
  {
    icon: asset('/icons/indexing.svg'),
    title: 'Index stays fresh',
    text: 'The index follows the disk in the background, so a file you just created is already there before you type its name.',
  },
  {
    icon: asset('/icons/pin_glyph.svg'),
    title: 'Pinned items',
    text: 'Pin any result, drag to reorder, and put them in the box or in a dock down either side.',
  },
  {
    icon: asset('/icons/ctx-directory-folder.svg'),
    title: 'Recent items',
    text: 'With pins in the dock, an empty box lists what you opened lately — apps and files alike.',
  },
  {
    icon: asset('/icons/special-open-link.svg'),
    title: 'Web search from the box',
    text: 'A leading ! searches the web — !g, !yt, !gh, !wiki, !py and more. An unknown prefix falls back to Google.',
  },
  {
    icon: asset('/icons/document.svg'),
    title: 'Calculator',
    text: 'Type 2+2*3 straight into the search box and the answer comes back as a card you can copy.',
  },
  {
    icon: asset('/icons/photo_glyph.svg'),
    title: 'File preview',
    text: 'The selected row opens up into a card that shows the file itself: its icon, a picture, a playing GIF or video, the start of a text file, a PDF page. Hold Shift + Space for a look, or leave it on in settings. Shift + Enter opens a full preview.',
  },
  {
    icon: asset('/icons/special-power.svg'),
    title: 'Power controls',
    text: 'Power off, reboot or suspend from the search field, behind a confirmation card.',
  },
  {
    icon: asset('/icons/special-kill-x.svg'),
    title: 'Kill a process',
    text: 'kill <name> terminates a process by name, shows the app it found and refuses wildcards.',
  },
  {
    icon: asset('/icons/ctx-admin-shield.svg'),
    title: 'Run as administrator',
    text: 'Right-click any result to open it, open as admin, open its directory or copy the path.',
  },
  {
    icon: asset('/icons/ms-tick-check.svg'),
    title: 'Learns what you open',
    text: 'Pick a result once and the next time you type the same thing it comes first.',
  },
  {
    icon: asset('/icons/photo_glyph.svg'),
    title: '11 entity types',
    text: 'Apps, shortcuts, folders, documents, images, audio, video, archives, code, files and system utilities.',
  },
  {
    icon: asset('/icons/settings-gear.svg'),
    title: 'Appearance panel',
    text: 'Colours, shape, font, density and motion open in a panel beside the window, so the settings list stays short.',
  },
  {
    icon: asset('/icons/settings-gear.svg'),
    title: 'Keybinds',
    text: 'Every key Umbra answers to sits in one panel beside the window and can be rebound on the spot, the global hotkey included. A small arrow puts a changed one back.',
  },
  {
    icon: asset('/icons/document.svg'),
    title: 'Fonts',
    text: 'Three typefaces come with Umbra, and !font switches to any font installed on the machine.',
  },
  {
    icon: asset('/icons/settings-gear.svg'),
    title: 'Made for your machine',
    text: 'Accent color, card opacity, corner radius, density, glow, zoom, window position, monitor choice, or follow Windows.',
  },
] as const

/** Kept out of the grid so the list above does not get padded out to look longer. */
const MORE = 7

export function Features() {
  return (
    <section className="section" id="features">
      <p className="section__eyebrow" data-reveal="">Features</p>
      <h2 className="section__title" data-reveal="">Everything you need, nothing more</h2>
      <p className="section__lead" data-reveal="">
        A native Rust backend keeps the whole index on disk and in memory, and returns
        results in milliseconds. The frontend is plain JS with no framework, so the window
        opens the instant you hit the hotkey.
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

      <p className="features__more" data-reveal="">
        and more +{MORE}
      </p>
    </section>
  )
}