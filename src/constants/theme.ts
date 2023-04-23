import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.cjs'

export const DARK_MODE = 'dark' as const;
export const LIGHT_MODE = 'light' as const;
export type ACTIVE_MODE = typeof DARK_MODE | typeof LIGHT_MODE;

const twConfig = resolveConfig(tailwindConfig)

export interface Theme {
  key: ACTIVE_MODE;
  textBrand: string;
  textRoast: string;
  textShare: string;
  textShareIcon: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgRoast: string;
  bgLoading: { dark: string, light: string };
  bgShareIcon: string;
  navigationDivider: string;
}

const darkMode: Theme = Object.freeze({
  key: DARK_MODE,
  textBrand: twConfig.theme.textColor.sky[100],
  textRoast: twConfig.theme.textColor.zinc[100],
  textShare: twConfig.theme.textColor.zinc[100],
  textShareIcon: twConfig.theme.textColor.zinc[100],
  bgGradientFrom: "#0D324D",
  bgGradientTo: "#7F5A83",
  bgRoast: twConfig.theme.textColor.zinc[800],
  bgLoading: { dark: twConfig.theme.backgroundColor.gray[700], light: twConfig.theme.backgroundColor.gray[600] },
  bgShareIcon: "#475284",
  navigationDivider: twConfig.theme.textColor.gray[600],
});

const lightMode: Theme = Object.freeze({
  key: LIGHT_MODE,
  textBrand: twConfig.theme.textColor.sky[900],
  textRoast: twConfig.theme.textColor.zinc[900],
  textShare: twConfig.theme.textColor.zinc[900],
  textShareIcon: "#475284",
  bgGradientFrom: "#FDFCCE",
  bgGradientTo: "#CFEBFC",
  bgRoast: twConfig.theme.textColor.zinc[50],
  bgLoading: { dark: twConfig.theme.backgroundColor.gray[300], light: twConfig.theme.backgroundColor.gray[200] },
  bgShareIcon: twConfig.theme.textColor.zinc[100],
  navigationDivider: twConfig.theme.textColor.gray[300],
});

let themes = {
  [DARK_MODE]: darkMode,
  [LIGHT_MODE]: lightMode, 
}

export const getTheme = (key: ACTIVE_MODE): Theme => themes[key];
