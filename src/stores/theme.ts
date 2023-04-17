import { writable } from 'svelte/store';
import { LIGHT_MODE, getTheme, type ACTIVE_MODE } from '../constants/theme';
import type { Theme } from "../constants/theme";

const createTheme = () => {
  const { subscribe, set } = writable<Theme>(getTheme[LIGHT_MODE]);
  return {
    subscribe,
    set: (key: ACTIVE_MODE) => set(getTheme(key)),
  }
}

export const theme = createTheme();
