/**
 * Reveal-on-scroll. One shared IntersectionObserver for the whole document:
 * every [data-reveal] element starts blurred and sunk, then lifts into place.
 *
 * A MutationObserver picks up nodes added later (client-side routing, lazily
 * mounted sections), so markup only has to carry the attribute.
 *
 * Elements that land in view together are *not* revealed together: they go
 * through a queue that keeps a minimum gap between consecutive starts, so a
 * heading always finishes launching before the block under it moves.
 */
let observer: IntersectionObserver | null = null
let mutation: MutationObserver | null = null

/** Minimum time between the start of one reveal and the start of the next. */
const STAGGER_MS = 50

const queue: HTMLElement[] = []
/** Guards against the same element being queued twice by a re-scan. */
const queued = new WeakSet<HTMLElement>()
let pumpTimer: number | undefined
/** performance.now() of the most recent reveal start, 0 when idle. */
let lastStart = 0
/** While true nothing is allowed to start revealing. */
let suspended = false

function inViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

function track(root: ParentNode) {
  if (!observer) return
  root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
    observer?.observe(el)
  })
}

function reduceMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function pump() {
  // Skip anything that React unmounted while it sat in the queue, otherwise a
  // single dead node would strand every element behind it.
  let el = queue.shift()
  while (el && !el.isConnected) el = queue.shift()

  if (!el) {
    pumpTimer = undefined
    lastStart = 0
    return
  }

  const now = performance.now()
  // One knob for the whole page: the gap measured from the previous start.
  // Elements carry no delay of their own any more, so the order of the
  // document is the order of the animation.
  const start = lastStart === 0 ? now : Math.max(now, lastStart + STAGGER_MS)

  pumpTimer = window.setTimeout(() => {
    queued.delete(el)
    el.classList.add('is-revealed')
    lastStart = performance.now()
    pump()
  }, Math.max(0, start - now))
}

function enqueue(entries: IntersectionObserverEntry[]) {
  const hits = entries
    .filter((entry) => entry.isIntersecting)
    .map((entry) => entry.target as HTMLElement)
    .filter((el) => !el.classList.contains('is-revealed'))
    .sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    )

  if (!hits.length) return

  hits.forEach((el) => {
    observer?.unobserve(el)
    if (queued.has(el)) return
    queued.add(el)
    queue.push(el)
  })

  // Reduced motion: the stylesheet already forces these visible, so the queue
  // only adds pointless waiting.
  if (reduceMotion()) {
    hits.forEach((el) => el.classList.add('is-revealed'))
    queue.forEach((el) => queued.delete(el))
    queue.length = 0
    window.clearTimeout(pumpTimer)
    pumpTimer = undefined
    lastStart = 0
    return
  }

  if (pumpTimer === undefined && !suspended) pump()
}

/**
 * Hold every animation back — used while a route change scrolls the window.
 * Anything already queued is dropped rather than left to fire mid-scroll.
 */
export function suspendReveal() {
  suspended = true
  queue.forEach((el) => queued.delete(el))
  queue.length = 0
  window.clearTimeout(pumpTimer)
  pumpTimer = undefined
  lastStart = 0
}

/** Let the animations go again, once the window has stopped moving. */
export function resumeReveal() {
  suspended = false

  // The scroll-up carried half the page through the viewport. Anything that is
  // not on screen now is dropped, and re-observed, so it animates when the
  // reader actually gets there instead of queueing a long cascade up front.
  for (let i = queue.length - 1; i >= 0; i -= 1) {
    const el = queue[i]
    if (!el.isConnected || !inViewport(el)) {
      queued.delete(el)
      queue.splice(i, 1)
    }
  }

  rescanReveal()
  if (pumpTimer === undefined && queue.length) pump()
}

export function initReveal() {
  if (typeof IntersectionObserver === 'undefined') return

  if (!observer) {
    observer = new IntersectionObserver(enqueue, {
      // threshold 0: reveal on the first pixel, not a slice of the element —
      // otherwise very tall blocks need a large portion on screen to trigger.
      rootMargin: '0px 0px -8% 0px',
      threshold: 0,
    })
  }

  track(document)

  if (!mutation) {
    mutation = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches('[data-reveal]') && !node.classList.contains('is-revealed')) {
            observer?.observe(node)
          }
          track(node)
        })
      }
    })
    mutation.observe(document.body, { childList: true, subtree: true })
  }
}

/** Re-scan after a route change, in case React swapped a whole subtree at once. */
export function rescanReveal() {
  track(document)
}
