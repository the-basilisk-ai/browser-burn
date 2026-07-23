export interface Background {
  key: string;
  label: string;
  light: string;
  dark: string;
}

export const backgrounds: Background[] = [
  // Chrome's own new-tab surface colors, so the default blends into the browser.
  { key: "cloud", label: "Cloud", light: "#F8F9FA", dark: "#202124" },
  { key: "blush", label: "Blush", light: "#FFECEE", dark: "#241A21" },
  { key: "mint", label: "Mint", light: "#E9F5F0", dark: "#17211C" },
  { key: "sky", label: "Sky", light: "#E9F2FA", dark: "#172029" },
  { key: "lavender", label: "Lavender", light: "#F0EDFA", dark: "#1E1B2A" },
  { key: "sand", label: "Sand", light: "#FAF3E8", dark: "#242019" },
];

export const DEFAULT_BACKGROUND_KEY = "cloud";
export const CUSTOM_BACKGROUND_KEY = "custom";

export const getBackground = (key: string): Background =>
  backgrounds.find((b) => b.key === key) ??
  backgrounds.find((b) => b.key === DEFAULT_BACKGROUND_KEY)!;
