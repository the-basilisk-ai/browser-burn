import { derived } from "svelte/store";
import { getTheme, DARK_MODE, LIGHT_MODE } from "../constants/theme";
import { theme } from "./theme";
import { pageBackground } from "./background";

// WCAG relative luminance. Above this threshold dark text has better
// contrast than light text, so the light palette applies (and vice versa).
// 0.179 is where the two contrast ratios cross over.
const DARK_TEXT_LUMINANCE_THRESHOLD = 0.179;

const relativeLuminance = (hex: string): number => {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
};

// The palette that is actually rendered. The user's chosen mode selects which
// background variant applies, but a custom color can contradict that mode
// (e.g. near-black picked while in light mode), so the rendered palette
// follows the background's luminance to keep text readable.
export const effectiveTheme = derived(
  [theme, pageBackground],
  ([$theme, $pageBackground]) => {
    const mode =
      relativeLuminance($pageBackground) > DARK_TEXT_LUMINANCE_THRESHOLD
        ? LIGHT_MODE
        : DARK_MODE;
    return mode === $theme.key ? $theme : getTheme(mode);
  }
);
