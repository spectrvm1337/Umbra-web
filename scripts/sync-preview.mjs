// Brings the theme preview (public/preview) up to date with Umbra itself, so the docs show the real
// interface: its stylesheet, its fonts, the markup of its window and the few functions that draw a
// result row. Run after an Umbra release:
//
//   node scripts/sync-preview.mjs ../Umbra
//
// preview.css and preview.js in public/preview are written by hand and are not touched.
import fs from 'node:fs'
import path from 'node:path'

const umbra = process.argv[2]
if (!umbra || !fs.existsSync(path.join(umbra, 'src', 'styles.css'))) {
  console.error('usage: node scripts/sync-preview.mjs <path to the Umbra repository>')
  process.exit(1)
}
const src = (f) => path.join(umbra, 'src', f)
const out = path.resolve('public', 'preview')
fs.mkdirSync(path.join(out, 'fonts'), { recursive: true })

// 1. The stylesheet, and every font it loads (url('./...')), at the same relative paths.
const css = fs.readFileSync(src('styles.css'), 'utf8')
fs.writeFileSync(path.join(out, 'umbra.css'), css)
const fonts = [...new Set([...css.matchAll(/url\('\.\/([^']+\.ttf)'\)/g)].map((m) => m[1]))]
for (const f of fonts) {
  fs.mkdirSync(path.dirname(path.join(out, f)), { recursive: true })
  fs.copyFileSync(src(f), path.join(out, f))
}

// 2. The window's markup: the page body up to its scripts.
const html = fs.readFileSync(src('index.html'), 'utf8')
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('<script'))
const version = JSON.parse(fs.readFileSync(path.join(umbra, 'package.json'), 'utf8')).version
fs.writeFileSync(
  path.join(out, 'frame.html'),
  `<!DOCTYPE html>
<!-- Written by scripts/sync-preview.mjs from Umbra ${version}; do not edit by hand. -->
<html lang="en" data-density="full" data-corners="round" data-search-grad="on" data-blur="off" data-border-pos="center" data-font="wix" data-tab="results">
<head>
  <meta charset="UTF-8">
  <title>Umbra preview</title>
  <link rel="stylesheet" href="umbra.css">
  <link rel="stylesheet" href="preview.css">
  <style id="custom-theme-style"></style>
</head>
<body>
${body.trim()}
  <script>window.UMBRA_VERSION = ${JSON.stringify(version)}</script>
  <script src="i18n.js"></script>
  <script src="app-bits.js"></script>
  <script src="preview.js"></script>
</body>
</html>
`,
)

// The interface text: the markup has old English defaults, which i18n.js replaces as in the app.
fs.copyFileSync(src("i18n.js"), path.join(out, "i18n.js"))

// 3. What draws a result row, taken from main.js as it is.
const main = fs.readFileSync(src('main.js'), 'utf8')
// From `start` to the end of the statement: the `;` (or, for a function, the `}`) that closes it,
// skipping strings, template literals, regular expressions, comments and nested brackets.
function statement(start, isFunction) {
  let depth = 0
  let quote = null
  let prev = '' // the last character that was not a space, to tell a regex from a division
  for (let i = start; i < main.length; i++) {
    const c = main[i]
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) {
        quote = null
        prev = c
      }
      continue
    }
    if (c === '/' && main[i + 1] === '/') {
      i = main.indexOf('\n', i)
      continue
    }
    if (c === '/' && main[i + 1] === '*') {
      i = main.indexOf('*/', i) + 1
      continue
    }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};+'.includes(prev))) {
      // A regular expression: to its closing slash, past any class like [&<>"'].
      let inClass = false
      for (i++; i < main.length; i++) {
        if (main[i] === '\\') i++
        else if (main[i] === '[') inClass = true
        else if (main[i] === ']') inClass = false
        else if (main[i] === '/' && !inClass) break
      }
      prev = '/'
      continue
    }
    if (!/\s/.test(c)) prev = c
    if (c === '"' || c === "'" || c === '`') quote = c
    else if (c === '{' || c === '(' || c === '[') depth++
    else if (c === '}' || c === ')' || c === ']') {
      depth--
      if (isFunction && depth === 0 && c === '}') return main.slice(start, i + 1)
    } else if (!isFunction && c === ';' && depth === 0) return main.slice(start, i + 1)
  }
  throw new Error('unterminated statement at ' + start)
}
function take(name) {
  const fn = main.indexOf(`\nfunction ${name}(`)
  if (fn >= 0) return statement(fn + 1, true)
  const decl = main.indexOf(`\nconst ${name} =`)
  if (decl >= 0) return statement(decl + 1, false)
  throw new Error('not found in main.js: ' + name)
}
const names = ['EXE_GLYPH', 'FOLDER_GLYPH', 'PHOTO_GLYPH', 'PIN_GLYPH', 'MS_TICK_SVG', 'HTML_ESCAPES',
  'escapeHtml', 'highlightMatch', 'pathHtml', 'getTypeIcon']
fs.writeFileSync(
  path.join(out, 'app-bits.js'),
  `// Written by scripts/sync-preview.mjs from Umbra ${version}'s main.js; do not edit by hand.\n` +
    names.map(take).join('\n') +
    '\n',
)
console.log(`preview synced from Umbra ${version}: umbra.css, ${fonts.length} fonts, frame.html, i18n.js, app-bits.js`)
