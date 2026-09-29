/**
 * Resolves once scrolling has come to rest.
 *
 * Used to hold back reveal animations while a smooth scroll is still running,
 * so a page does not start animating in while the window is still travelling.
 * Polls with rAF instead of listening for `scrollend` because that event is not
 * everywhere yet, and a settled-position poll degrades gracefully.
 */
export function whenScrollSettled(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.scrollY === 0) return Promise.resolve()

  return new Promise((resolve) => {
    const startedAt = performance.now()
    let lastY = window.scrollY
    let stillFrames = 0

    const tick = () => {
      const y = window.scrollY

      if (y === lastY) {
        stillFrames += 1
      } else {
        stillFrames = 0
        lastY = y
      }

      const atTop = y === 0
      const settled = stillFrames >= 4
      const gaveUp = performance.now() - startedAt > 2500

      if (atTop || settled || gaveUp) {
        resolve()
        return
      }

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  })
}
