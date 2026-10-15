/**
 * A plain list of what has shipped and what might come next.
 *
 * Deliberately not a promise list: the "next" column is what is being looked
 * at, not a schedule, and every item there can move or quietly not happen.
 */
const SHIPPED = [
  'Index kept on disk and updated live as files change',
  'Recent items in the side dock, not just pinned ones',
  'Its own tray menu, drawn in the app instead of the system one',
  'Calculator right in the search box',
  'Results you pick come first the next time you type the same thing',
  'Typo-tolerant fuzzy search',
  'Ctrl shortcuts for rows, and Esc clears the query before it hides',
  'Updates inside the search bar, with progress',
  'A "Match Windows" switch for the theme',
] as const

const NEXT = [
  'A useful empty result: search the web instead of a dead end',
  'Filters written into the query itself, like / for folders or .pdf',
  'Sharper icons on high-DPI screens',
  'Frontend split into modules',
  'CI running fmt, clippy and tests on every pull request',
] as const

export function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <p className="section__eyebrow" data-reveal="">Roadmap</p>
      <h2 className="section__title" data-reveal="">
        Where things stand
      </h2>
      <p className="section__lead" data-reveal="">
        What is already in the build, and what is being looked at. Nothing here is
        a date, and the second list may shrink as much as it grows.
      </p>

      <div className="roadmap">
        <div className="roadmap__group" data-reveal="">
          <h3 className="roadmap__title">Shipped</h3>
          <ul className="roadmap__list">
            {SHIPPED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="roadmap__group" data-reveal="">
          <h3 className="roadmap__title">Next, maybe</h3>
          <ul className="roadmap__list roadmap__list--next">
            {NEXT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}