import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";

export const DARK_MODE = "dark" as const;
export const LIGHT_MODE = "light" as const;
export const SYSTEM_MODE = "system" as const;
export type ACTIVE_MODE = typeof DARK_MODE | typeof LIGHT_MODE;
export type THEME_PREFERENCE = ACTIVE_MODE | typeof SYSTEM_MODE;

const twConfig = resolveConfig(tailwindConfig);

export interface Theme {
  key: ACTIVE_MODE;
  textBrand: string;
  textRoast: string;
  textShare: string;
  textShareIcon: string;
  bgRoast: string;
  bgLoading: { dark: string; light: string };
  bgShareIcon: string;
  navigationDivider: string;
  surfaceBorder: string;
  surfaceShadow: string;
}

const darkMode: Theme = Object.freeze({
  key: DARK_MODE,
  textBrand: twConfig.theme.textColor.sky[100],
  textRoast: twConfig.theme.textColor.zinc[100],
  textShare: twConfig.theme.textColor.zinc[100],
  textShareIcon: twConfig.theme.textColor.zinc[100],
  // Elevated surface: dark mode separates surfaces with a lighter tone and a
  // hairline border, since shadows barely read on dark backgrounds.
  bgRoast: "#292A2D",
  bgLoading: {
    dark: twConfig.theme.backgroundColor.gray[700],
    light: twConfig.theme.backgroundColor.gray[600],
  },
  bgShareIcon: "#475284",
  navigationDivider: twConfig.theme.textColor.gray[600],
  surfaceBorder: "rgba(255, 255, 255, 0.09)",
  surfaceShadow: "0 1px 3px rgba(0, 0, 0, 0.35)",
});

const lightMode: Theme = Object.freeze({
  key: LIGHT_MODE,
  textBrand: twConfig.theme.textColor.sky[900],
  textRoast: twConfig.theme.textColor.zinc[900],
  textShare: twConfig.theme.textColor.zinc[900],
  textShareIcon: "#475284",
  // Elevated surface: pure white card over the tinted page, defined by a soft
  // shadow and hairline border so it separates from any background color.
  bgRoast: "#FFFFFF",
  bgLoading: {
    dark: twConfig.theme.backgroundColor.gray[300],
    light: twConfig.theme.backgroundColor.gray[200],
  },
  bgShareIcon: twConfig.theme.textColor.zinc[100],
  navigationDivider: twConfig.theme.textColor.gray[300],
  surfaceBorder: "rgba(0, 0, 0, 0.07)",
  surfaceShadow: "0 1px 3px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.06)",
});

let themes = {
  [DARK_MODE]: darkMode,
  [LIGHT_MODE]: lightMode,
};

export const getTheme = (key: ACTIVE_MODE): Theme => themes[key];
