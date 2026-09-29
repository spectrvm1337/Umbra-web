export const GITHUB_URL = 'https://github.com/spectrvm1337/Umbra'
export const RELEASES_URL = `${GITHUB_URL}/releases`

// Hashes stay bare so `/${href}` resolves to /#section, not //section.
export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#commands', label: 'Commands' },
  { href: '#shortcuts', label: 'Shortcuts' },
  { href: '#themes', label: 'Themes' },
  { href: 'themes', label: 'Docs' },
] as const
