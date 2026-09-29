export const GITHUB_URL = 'https://github.com/spectrvm1337/Umbra'
export const RELEASES_URL = `${GITHUB_URL}/releases`

/**
 * Prefix a public/ asset with the Vite base.
 *
 * Vite rewrites url() inside CSS, but a path written as a plain string in a
 * component is left alone — so `/logo.png` would 404 on GitHub Pages, where the
 * site lives under /Umbra-web/. Everything from public/ goes through here.
 */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// Hashes stay bare so `/${href}` resolves to /#section, not //section.
export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#commands', label: 'Commands' },
  { href: '#shortcuts', label: 'Shortcuts' },
  { href: '#themes', label: 'Themes' },
  { href: 'themes', label: 'Docs' },
] as const
