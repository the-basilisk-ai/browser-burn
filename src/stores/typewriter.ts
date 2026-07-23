import { derived, readable } from "svelte/store";
import { roast } from "./api";

// Reveal speed while keeping pace with the stream; extra speed per character
// of backlog so bursts and buffered fallbacks catch up within ~half a second.
const BASE_CHARS_PER_SECOND = 40;
const CATCH_UP_PER_BACKLOG_CHAR = 3;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export const displayedRoast = readable<string | null>(null, (set) => {
  let target: string | null = null;
  let shown = 0;
  let carry = 0;
  let last: number | null = null;
  let frame = 0;

  const unsubscribe = roast.subscribe((value) => {
    if (value === null) {
      target = null;
      shown = 0;
      carry = 0;
      set(null);
      return;
    }
    if (prefersReducedMotion) {
      target = value;
      shown = value.length;
      set(value);
      return;
    }
    // Restart when the new text is not a continuation of what is shown,
    // e.g. the buffered fallback replacing a partial stream.
    if (target === null || !value.startsWith(target.slice(0, shown))) {
      shown = 0;
      carry = 0;
    }
    target = value;
    set(target.slice(0, shown));
  });

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    if (last === null) {
      last = now;
      return;
    }
    const dt = (now - last) / 1000;
    last = now;
    if (target === null || shown >= target.length) {
      return;
    }
    const backlog = target.length - shown;
    carry += dt * (BASE_CHARS_PER_SECOND + backlog * CATCH_UP_PER_BACKLOG_CHAR);
    const step = Math.floor(carry);
    if (step > 0) {
      carry -= step;
      shown = Math.min(target.length, shown + step);
      set(target.slice(0, shown));
    }
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    unsubscribe();
  };
});

export const isTyping = derived(
  [roast, displayedRoast],
  ([$roast, $displayed]) => $roast !== null && $displayed !== $roast
);
