import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.cjs'

export const DARK_MODE = 'dark' as const;
export const LIGHT_MODE = 'light' as const;
export type ACTIVE_MODE = typeof DARK_MODE | typeof LIGHT_MODE;

const twConfig = resolveConfig(tailwindConfig)
console.log(twConfig);

export interface Theme {
  key: ACTIVE_MODE;
  textBrand: string;
  textRoast: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgRoast: string;
}

const darkMode: Theme = Object.freeze({
  key: DARK_MODE,
  textBrand: twConfig.theme.textColor.zinc[100],
  textRoast: twConfig.theme.textColor.zinc[100],
  bgGradientFrom: "#0D324D",
  bgGradientTo: "#7F5A83",
  bgRoast: twConfig.theme.textColor.zinc[800],
});

const lightMode: Theme = Object.freeze({
  key: LIGHT_MODE,
  textBrand: twConfig.theme.textColor.sky[900],
  textRoast: twConfig.theme.textColor.zinc[900],
  bgGradientFrom: "#FDFCCE",
  bgGradientTo: "#CFEBFC",
  bgRoast: twConfig.theme.textColor.zinc[100],
});

let themes = {
  [DARK_MODE]: darkMode,
  [LIGHT_MODE]: lightMode, 
}

export const getTheme = (key: ACTIVE_MODE): Theme => themes[key];
