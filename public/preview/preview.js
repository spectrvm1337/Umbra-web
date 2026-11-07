// The docs preview: Umbra's own window (frame.html, from scripts/sync-preview.mjs) with what the app
// builds from script filled in by hand, and four views to walk through. The page around it talks to
// it through window.umbraPreview (same origin): setCss(css) and setTab(tab). Hovers, focus and
// every transition are Umbra's own, from its stylesheet.
;(() => {
  const $ = (s) => document.querySelector(s)
  const $$ = (s) => [...document.querySelectorAll(s)]
  const root = document.documentElement

  // As the app does on every theme change (applyTheme in main.js): these seven go onto <html> as
  // inline styles, so a theme has to mark them !important to win, here as in Umbra.
  const INLINE = {
    '--accent': '#507090',
    '--card-bg': '#1e1e1e',
    '--text': '#e3e3e3',
    '--card-radius': '12px',
    '--gap': '12px',
    '--card-border-w': '1px',
    '--glow-size': '0px',
  }
  for (const [k, v] of Object.entries(INLINE)) root.style.setProperty(k, v)

  $('#app-container').classList.add('window-showing')
  // The interface text in English, as the app sets it at start (i18n.js).
  window.i18n?.setLanguage('en')
  const version = $('#app-version')
  if (version) version.textContent = window.UMBRA_VERSION || ''

  // ---- results ----
  const ITEMS = [
    { name: 'Documents', path: 'C:\\Users\\you\\Documents', kind: 'folder' },
    { name: 'docs-roadmap.md', path: 'C:\\Users\\you\\Projects\\umbra\\docs-roadmap.md', kind: 'document' },
    { name: 'Docker Desktop', path: 'C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe', kind: 'app', pinned: true },
    { name: 'doc-scan.png', path: 'C:\\Users\\you\\Pictures\\Scans\\doc-scan.png', kind: 'image' },
    { name: 'Dockerfile', path: 'C:\\Users\\you\\Projects\\api\\Dockerfile', kind: 'code' },
    { name: 'Documentary.mp4', path: 'D:\\Video\\Documentary.mp4', kind: 'video' },
    { name: 'Downloads', path: 'C:\\Users\\you\\Downloads', kind: 'folder' },
    { name: 'Spotify', path: 'C:\\Users\\you\\AppData\\Roaming\\Spotify\\Spotify.exe', kind: 'app' },
    { name: 'lofi beats.mp3', path: 'D:\\Music\\lofi beats.mp3', kind: 'audio' },
    { name: 'report-2026-q3.pdf', path: 'D:\\Reports\\report-2026-q3.pdf', kind: 'document' },
    { name: 'backup.zip', path: 'D:\\Backups\\backup.zip', kind: 'archive' },
  ]
  const input = $('#search-input')
  // A query to start with, so the matches show highlighted.
  input.value = 'doc'
  $('#clear-btn').classList.add('visible')
  const list = $('#results-list')
  // The row exactly as createResultItem in main.js draws it.
  function row(item, i, q) {
    const div = document.createElement('div')
    div.className = 'result-item' + (i === 0 ? ' selected' : '')
    div.innerHTML = `
      <div class="result-num">${i < 9 ? i + 1 : ''}</div>
      <div class="result-icon"><div class="result-icon-fallback ${item.kind}">${getTypeIcon(item.kind)}</div></div>
      <div class="result-name">${highlightMatch(item.name, q)}</div>
      <div class="result-path">${pathHtml(item.path)}</div>
      <button class="result-pin ${item.pinned ? 'pinned' : ''}">${PIN_GLYPH}</button>`
    div.style.animationDelay = `${Math.min(i, 8) * 25}ms`
    div.addEventListener('mouseenter', () => {
      $$('#results-list .result-item.selected').forEach((r) => r.classList.remove('selected'))
      div.classList.add('selected')
    })
    return div
  }
  function renderResults() {
    const q = input.value.trim()
    const found = ITEMS.filter((it) => !q || it.name.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
    list.replaceChildren(...found.map((it, i) => row(it, i, q)))
    $('#empty-state').classList.toggle('hidden', found.length > 0 || tab !== 'results')
  }
  input.addEventListener('input', () => {
    $('#clear-btn').classList.toggle('visible', !!input.value)
    if (tab === 'results') renderResults()
    else filterSettings()
  })
  $('#clear-btn').addEventListener('click', () => {
    input.value = ''
    input.dispatchEvent(new Event('input'))
  })

  // ---- settings: what the app fills in from script ----
  $('#setting-hotkey-value').innerHTML =
    '<kbd class="su-key">Alt</kbd><span class="su-plus">+</span><kbd class="su-key">Space</kbd>'
  const idx = $('#setting-indexed')
  if (idx) idx.textContent = '787,830 items'
  const excl = $('#setting-exclude-count')
  if (excl) excl.textContent = '6/9'
  const anim = $('#setting-anim-count')
  if (anim) anim.textContent = '6/6'
  $('#setting-autostart')?.classList.add('on')
  const grid = $('#align-grid')
  if (grid)
    grid.replaceChildren(
      ...['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br'].map((code) => {
        const b = document.createElement('button')
        b.className = 'align-cell' + (code === 'cc' ? ' active' : '')
        b.addEventListener('click', () => {
          grid.querySelectorAll('.align-cell').forEach((c) => c.classList.toggle('active', c === b))
        })
        return b
      }),
    )
  const monitors = $('#monitor-buttons')
  if (monitors)
    monitors.replaceChildren(
      ...['Active', '1', '2'].map((label, i) => {
        const b = document.createElement('button')
        b.className = 'seg-btn' + (i === 0 ? ' active' : '')
        b.textContent = label
        return b
      }),
    )
  function swatches(sel, colors, active, plus) {
    const el = $(sel)
    if (!el) return
    el.replaceChildren(
      ...colors.map((c, i) => {
        const b = document.createElement('button')
        b.className = 'swatch' + (i === active ? ' active' : '')
        b.style.background = c
        return b
      }),
    )
    if (plus) {
      const add = document.createElement('button')
      add.className = 'swatch'
      add.textContent = '+'
      Object.assign(add.style, {
        background: 'transparent',
        border: '1px dashed var(--text-dim)',
        color: 'var(--text-dim)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
      el.appendChild(add)
    }
  }
  swatches('#theme-presets', ['#507090', '#205ea6', '#d14d41', '#f0442e'], 0, true)
  swatches('#accent-swatches', ['#d14d41', '#da702c', '#4385be', '#879a39', '#8b7ec8'], -1)
  swatches('#bg-swatches', ['#1e1e1e', '#1e1918', '#100f0f', '#282726', '#fffcf0', '#f2f0e5', '#e6e4d9', '#d9d6c9'], 0)
  // Blur, the border and the glow start off, so their extra controls are folded away (setDepHidden).
  $$('.dep-extras').forEach((el) => el.classList.add('dep-hidden'))
  $('#setting-searchgrad')?.classList.add('on')

  // Segments: the first is the one chosen, unless a data attribute says which.
  function markSeg(seg, btn) {
    seg.querySelectorAll('.seg-btn').forEach((b) => b.classList.toggle('active', b === btn))
  }
  for (const seg of $$('.seg-row')) {
    const want = seg.querySelector(
      '[data-corner="round"], [data-density="full"], [data-font="wix"], [data-pos="center"], [data-lang="en"], .seg-btn.active',
    )
    markSeg(seg, want || seg.querySelector('.seg-btn'))
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('.seg-btn')
      if (!b) return
      e.stopPropagation()
      markSeg(seg, b)
      // The ones that change how everything looks do so here too, as attributes on <html>.
      if (b.dataset.corner) root.dataset.corners = b.dataset.corner
      if (b.dataset.density) root.dataset.density = b.dataset.density
      if (b.dataset.font) root.dataset.font = b.dataset.font
      if (b.dataset.pos) root.dataset.borderPos = b.dataset.pos
    })
  }
  // Switches.
  const flip = (rowSel, toggleSel, onChange) => {
    $(rowSel)?.addEventListener('click', (e) => {
      if (e.target.closest('.row-extras')) return
      const t = $(toggleSel)
      t.classList.toggle('on')
      onChange?.(t.classList.contains('on'))
    })
  }
  flip('#setting-searchgrad-row', '#setting-searchgrad', (on) => (root.dataset.searchGrad = on ? 'on' : 'off'))
  flip('#setting-blur-row', '#setting-blur', (on) => {
    root.dataset.blur = on ? 'on' : 'off'
    $('#blur-extras')?.classList.toggle('dep-hidden', !on)
  })
  flip('#setting-border-row', '#setting-border', (on) => {
    root.style.setProperty('--card-border-w', on ? '1px' : '0px')
    root.dataset.borderPos = on ? 'center' : 'center'
    document.querySelector('#setting-border-row .dep-extras')?.classList.toggle('dep-hidden', !on)
  })
  $('#setting-glow')?.addEventListener('click', () => {
    const t = $('#setting-glow')
    t.classList.toggle('on')
    const on = t.classList.contains('on')
    root.style.setProperty('--glow-size', on ? '14px' : '0px')
    $('#setting-glow-val').textContent = on ? '14' : 'off'
    $('#glow-extras')?.classList.toggle('dep-hidden', !on)
  })
  for (const id of ['#setting-autostart', '#setting-tall', '#setting-sidepreview', '#setting-pinsfold']) {
    const t = $(id)
    t?.closest('.settings-row')?.addEventListener('click', () => t.classList.toggle('on'))
  }
  // Steppers: corner radius and row spacing change the window as in the app.
  function stepper(minus, plus, val, min, max, apply) {
    const step = (d) => {
      const el = $(val)
      const n = Math.max(min, Math.min(max, (parseInt(el.textContent, 10) || 0) + d))
      el.textContent = n
      apply(n)
    }
    $(minus)?.addEventListener('click', () => step(-1))
    $(plus)?.addEventListener('click', () => step(1))
  }
  stepper('#setting-radius-minus', '#setting-radius-plus', '#setting-radius-val', 0, 24, (n) =>
    root.style.setProperty('--card-radius', n + 'px'),
  )
  stepper('#setting-gap-minus', '#setting-gap-plus', '#setting-gap-val', 0, 24, (n) =>
    root.style.setProperty('--gap', n + 'px'),
  )

  // The settings are filtered by the search field, as in the app.
  function filterSettings() {
    const q = input.value.trim().toLowerCase()
    $$('#settings-section .settings-row').forEach((r) => {
      const label = r.querySelector('.settings-label')
      r.style.display = !q || (label && label.textContent.toLowerCase().includes(q)) ? '' : 'none'
    })
  }

  // ---- popups ----
  const contentMenu = $('#content-menu')
  const contextMenu = $('#context-menu')
  const groups = $('#content-groups')
  if (groups)
    groups.replaceChildren(
      ...[
        ['Folders', true],
        ['Programs', true],
        ['Media', true],
        ['Files', false],
        ['System', false],
      ].map(([label, on]) => {
        const item = document.createElement('div')
        item.className = 'ms-item' + (on ? ' checked' : '')
        item.innerHTML = `<span class="ms-label">${label}</span><span class="ms-tick">${MS_TICK_SVG}</span>`
        item.addEventListener('click', () => item.classList.toggle('checked'))
        return item
      }),
    )
  const contentHead = $('#content-head')
  if (contentHead) contentHead.textContent = 'Current: 3/5'
  const contentHome = contentMenu?.parentNode
  const contentNext = contentMenu?.nextSibling
  const popups = document.createElement('div')
  popups.className = 'pv-popups'
  popups.innerHTML = `
    <div class="pv-col pv-left"></div>
    <div class="pv-col pv-right">
      <div class="special-card"><div class="special-action">
        <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/></svg>
        <span>Confirm shutdown?</span>
      </div></div>
    </div>`

  // ---- views ----
  let tab = 'results'
  function setTab(next) {
    tab = next
    root.dataset.tab = next
    const settings = next === 'settings'
    // The settings are filtered by the query; the results example would hide them all.
    if (settings && input.value) {
      input.value = ''
      $('#clear-btn').classList.remove('visible')
    }
    $('#results-section').classList.toggle('hidden', next !== 'results')
    $('#settings-section').classList.toggle('hidden', !settings)
    $('#special-section').classList.toggle('hidden', next !== 'popups')
    $('#settings-btn')?.classList.toggle('open', settings || next === 'appearance')
    if (next === 'popups') {
      $('#special-content').replaceChildren(popups)
      popups.querySelector('.pv-left').append(contextMenu, contentMenu)
      contextMenu.classList.add('visible')
      contentMenu.classList.add('visible')
    } else {
      contextMenu.classList.remove('visible')
      contentMenu?.classList.remove('visible')
      document.body.appendChild(contextMenu)
      if (contentMenu && contentHome) contentHome.insertBefore(contentMenu, contentNext)
    }
    if (next === 'results') renderResults()
    else $('#empty-state').classList.add('hidden')
    if (settings) filterSettings()
    report()
  }

  // The page sizes the frame to the window's height.
  function report() {
    requestAnimationFrame(() => {
      const h = Math.ceil(document.body.getBoundingClientRect().height)
      window.parent?.postMessage({ umbraPreviewHeight: h }, '*')
    })
  }
  new ResizeObserver(report).observe(document.body)

  window.umbraPreview = {
    setCss(css) {
      $('#custom-theme-style').textContent = css
      // As in the app: the class is there while a custom theme is applied.
      document.body.classList.toggle('custom-theme-active', !!css.trim())
      report()
    },
    setTab,
  }
  setTab('results')
  window.parent?.postMessage({ umbraPreviewReady: true }, '*')
})()
