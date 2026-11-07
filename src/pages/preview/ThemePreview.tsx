import { useEffect, useRef, useState } from 'react'
import { asset } from '../../site'
import './ThemePreview.css'

/**
 * Umbra's own window in a frame: its stylesheet, fonts and markup, copied from the app by
 * scripts/sync-preview.mjs into public/preview. The theme is applied there the way the app applies a
 * custom one, so what this shows is what Umbra will look like, hovers and all.
 */

const TABS = [
  { id: 'results', label: 'Results' },
  { id: 'settings', label: 'Settings' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'popups', label: 'Popups' },
] as const

type TabId = (typeof TABS)[number]['id']

type PreviewApi = { setCss: (css: string) => void; setTab: (tab: TabId) => void }

export function ThemePreview({ css }: { css: string }) {
  const frame = useRef<HTMLIFrameElement | null>(null)
  const [tab, setTab] = useState<TabId>('results')
  const [ready, setReady] = useState(false)
  const [height, setHeight] = useState(520)

  const api = () =>
    (frame.current?.contentWindow as (Window & { umbraPreview?: PreviewApi }) | null)?.umbraPreview

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow) return
      if (e.data?.umbraPreviewReady) setReady(true)
      if (typeof e.data?.umbraPreviewHeight === 'number') setHeight(e.data.umbraPreviewHeight)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    if (ready) api()?.setCss(css)
  }, [css, ready])

  useEffect(() => {
    if (ready) api()?.setTab(tab)
  }, [tab, ready])

  return (
    <div className="tp">
      <div className="tp__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`tp__tab${tab === t.id ? ' is-on' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <iframe
        ref={frame}
        className="tp__frame"
        src={asset('preview/frame.html')}
        title="Umbra preview"
        style={{ height }}
        onLoad={() => setReady(true)}
      />
    </div>
  )
}
