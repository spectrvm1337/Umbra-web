/**
 * Реальные CSS-переменные темы Umbra. Источник: THEMES.md в репозитории.
 */
export type ThemeVar = {
  name: string
  fallback: string
  desc: string
}

export const THEME_VARS: ThemeVar[] = [
  {
    name: '--card-bg',
    fallback: '#1E1E1E',
    desc: 'Background of the search bar and the result rows.',
  },
  {
    name: '--card-hover',
    fallback: '#2c2c2c',
    desc: 'Row background while the pointer is over it.',
  },
  {
    name: '--card-selected',
    fallback: '#2c2c2c',
    desc: 'Row background for the currently highlighted result.',
  },
  {
    name: '--card-deep',
    fallback: '#161616',
    desc: 'Darker shade used for wells and inset areas.',
  },
  {
    name: '--card-line',
    fallback: '#383838',
    desc: 'Colour of the separating lines.',
  },
  {
    name: '--text',
    fallback: '#E3E3E3',
    desc: 'Primary text colour.',
  },
  {
    name: '--text-dim',
    fallback: '#737373',
    desc: 'Secondary text: file paths and small details.',
  },
  {
    name: '--icon',
    fallback: '#b5b5b5',
    desc: 'Interface icons, such as search and settings.',
  },
  {
    name: '--card-border',
    fallback: 'rgba(255, 255, 255, 0.08)',
    desc: 'Border colour of the rows.',
  },
  {
    name: '--accent',
    fallback: '#507090',
    desc: 'Accent used for glow effects and active states.',
  },
  {
    name: '--tile-exe',
    fallback: '#5E5C64',
    desc: 'Tile colour for executables and applications.',
  },
  {
    name: '--tile-folder',
    fallback: '#DA702C',
    desc: 'Tile colour for folders.',
  },
  {
    name: '--tile-media',
    fallback: '#8B7EC8',
    desc: 'Tile colour for media files.',
  },
  {
    name: '--card-radius',
    fallback: '12px',
    desc: 'Corner radius of every card.',
  },
  {
    name: '--card-border-w',
    fallback: '1px',
    desc: 'Border width of every card.',
  },
]

export const TEMPLATE_CSS = `:root {
  /* Search bar and result rows */
  --card-bg: #1E1E1E !important;

  /* Row background on hover / when selected */
  --card-hover: #2c2c2c;
  --card-selected: #2c2c2c;
  --card-deep: #161616;

  /* Separating lines */
  --card-line: #383838;

  /* Text */
  --text: #E3E3E3 !important;
  --text-dim: #737373;

  /* Interface icons */
  --icon: #b5b5b5;

  /* Row border — transparent by default so cards read as flat surfaces */
  --card-border: rgba(255, 255, 255, 0);

  /* Accent for glow and active states */
  --accent: #507090 !important;

  /* File type tiles */
  --tile-exe: #5E5C64;
  --tile-folder: #DA702C;
  --tile-media: #8B7EC8;

  /* Sizing */
  --card-radius: 12px !important;
  --card-h: 52px !important;
  --card-border-w: 1px !important;
  --glow-size: 0px !important;
}

/* The seven !important lines above are not decoration. Umbra writes
   --card-bg, --text, --accent, --card-radius, --card-h, --card-border-w and
   --glow-size straight onto <html> as inline styles every time the theme is
   applied, and an inline declaration beats any :root rule in your file.
   Drop the !important on those and the sliders keep overwriting you. */`

export const NEO_BRUTAL_CSS = `/* Neo-Brutalist theme for Umbra */

:root {
  --bg: #e8e8e8;
  --card-bg: #ffffff;
  --card-hover: #f0f0f0;
  --card-line: #000000;
  --text: #000000;
  --text-dim: #666666;
  --card-border: #000000;
  --card-shadow: 0px 4px 0px 0px #000000;
  --accent: #888888;
  --pad-x: 16px;
  --gap: 12px;
  --card-h: 52px;
  --card-radius: 12px;
}

#search-box {
  border: 2px solid #000 !important;
  box-shadow: 0px 6px 0px 0px #000 !important;
  border-radius: var(--card-radius) !important;
}

.result-item {
  border: 2px solid #000 !important;
  box-shadow: 0px 4px 0px 0px #000 !important;
  border-radius: var(--card-radius) !important;
  transition: transform 0.15s ease, box-shadow 0.15s ease !important;
}

.result-item.selected {
  transform: translateY(4px) !important;
  box-shadow: 0px 0px 0px 0px #000 !important;
  background-color: var(--card-hover) !important;
}

.swatch, .stepper-btn, .seg-btn, .align-cell, .settings-text-btn {
  border: 2px solid #000 !important;
  border-radius: 10px !important;
  box-shadow: 0px 3px 0px 0px #000 !important;
  transition: all 0.15s ease !important;
}

.stepper-btn:active, .seg-btn:active, .align-cell:active {
  transform: translateY(3px) !important;
  box-shadow: 0px 0px 0px 0px #000 !important;
}

.toggle {
  width: 2.5em !important;
  height: 1.2em !important;
  border: 2px solid #000 !important;
  background-color: #e8e8e8 !important;
  border-radius: 1.2em !important;
  box-sizing: border-box;
  position: relative;
}

.toggle.on { background-color: #888 !important; }

.toggle-knob {
  position: absolute;
  width: 1.2em !important;
  height: 1.2em !important;
  border: 2px solid #000 !important;
  border-radius: 100% !important;
  left: -2px !important;
  bottom: -2px !important;
  background-color: #e8e8e8 !important;
  box-shadow: 0 0.2em 0 #000 !important;
}

.toggle.on .toggle-knob { left: calc(2.5em - 1.2em - 2px) !important; }`

export const SOLARIZED_CSS = `:root {
  --card-bg: #002b36;
  --card-hover: #073642;
  --card-selected: #073642;
  --card-deep: #001f27;
  --card-line: #586e75;
  --text: #eee8d5;
  --text-dim: #93a1a1;
  --icon: #b58900;
  --card-border: rgba(147, 161, 161, 0.25);
  --accent: #268bd2;
  --tile-exe: #cb4b16;
  --tile-folder: #b58900;
  --tile-media: #6c71c4;
  --card-radius: 10px;
  --card-border-w: 1px;
}`

/** Full variable reference: everything Umbra reads from :root. */
export const ALL_VARS: ThemeVar[] = [
  { name: '--card-bg', fallback: '#1E1E1E', desc: 'Background of the search bar and every result row.' },
  { name: '--card-hover', fallback: '#2c2c2c', desc: 'Row background while the pointer is over it.' },
  { name: '--card-selected', fallback: '#2c2c2c', desc: 'Row background for the currently highlighted result.' },
  { name: '--card-deep', fallback: '#161616', desc: 'Darker shade used for wells, steppers and insets.' },
  { name: '--card-line', fallback: '#383838', desc: 'Colour of the separating lines.' },
  { name: '--text', fallback: '#E3E3E3', desc: 'Primary text colour.' },
  { name: '--text-dim', fallback: '#737373', desc: 'Secondary text: file paths and small details.' },
  { name: '--icon', fallback: '#b5b5b5', desc: 'Interface icons: search, settings, pin, clear.' },
  { name: '--card-border', fallback: 'rgba(255, 255, 255, 0.08)', desc: 'Border colour of the rows.' },
  { name: '--accent', fallback: '#507090', desc: 'Accent for glow, active states and search highlights.' },
  { name: '--tile-exe', fallback: '#5E5C64', desc: 'Tile colour for executables, apps and code.' },
  { name: '--tile-folder', fallback: '#DA702C', desc: 'Tile colour for folders.' },
  { name: '--tile-media', fallback: '#8B7EC8', desc: 'Tile colour for images.' },
  { name: '--card-radius', fallback: '12px', desc: 'Corner radius of every card.' },
  { name: '--card-border-w', fallback: '1px', desc: 'Border width of every card.' },
  { name: '--card-h', fallback: '52px', desc: 'Height of the search bar and of every row.' },
  { name: '--gap', fallback: '12px', desc: 'Spacing between rows and between sections.' },
  { name: '--pad-x', fallback: '20px', desc: 'Horizontal padding of the content column.' },
  { name: '--card-shadow', fallback: '0 2px 8px rgba(0, 0, 0, 0.25), 0 0 var(--glow-size) var(--glow-alpha)', desc: 'Shadow of the result rows.' },
  { name: '--bar-shadow', fallback: '0 2px 8px rgba(0, 0, 0, 0.25), 0 0 var(--glow-size) var(--glow-alpha)', desc: 'Shadow of the search bar and popups.' },
  { name: '--tile-shadow', fallback: '0 1px 4px rgba(0, 0, 0, 0.35)', desc: 'Shadow of the 36x36 icon tiles.' },
  { name: '--glow-size', fallback: '0px', desc: 'Radius of the accent glow around cards.' },
  { name: '--glow-alpha', fallback: 'rgba(80, 112, 144, 0.4)', desc: 'Opacity of that glow.' },
  { name: '--font-main', fallback: "'Stolzl', 'Noto Sans JP', 'SF Pro Text', 'Segoe UI', system-ui, sans-serif", desc: 'UI typeface.' },
  { name: '--weight-light', fallback: '300', desc: 'Light weight, used for dimmed text.' },
  { name: '--weight-regular', fallback: '400', desc: 'Default weight.' },
  { name: '--weight-medium', fallback: '500', desc: 'Medium weight, used for names and hints.' },
  { name: '--weight-semibold', fallback: '600', desc: 'Semibold weight, used by notifications.' },
  { name: '--ease-spring', fallback: 'cubic-bezier(0.34, 1.3, 0.64, 1)', desc: 'Spring easing for handle and pin motion.' },
  { name: '--ease-out-apple', fallback: 'cubic-bezier(0.32, 0.72, 0, 1)', desc: 'Primary easing curve.' },
]
