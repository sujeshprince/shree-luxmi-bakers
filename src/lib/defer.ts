/**
 * Runs `fn` at the end of the current task (next microtask).
 *
 * Used where an effect must synchronously seed React state from a
 * client-only source (localStorage, media queries, embla's API, a clock…):
 * calling `setState` directly inside the effect body triggers a cascading
 * render, which `react-hooks/set-state-in-effect` forbids. Deferring the
 * seed keeps hydration safe and the timing effectively identical — the
 * update still lands before the browser paints the next frame.
 */
export function defer(fn: () => void): void {
  queueMicrotask(fn);
}
