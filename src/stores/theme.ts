import { writable } from 'svelte/store';
import { DARK_MODE, LIGHT_MODE, getTheme, type ACTIVE_MODE } from '../constants/theme';
import type { Theme } from "../constants/theme";

const themeModeKey = "BROWSER_BURN_THEME_MODE";

chrome.storage.local.get([themeModeKey], function(result) {
  console.log('Value currently is ' + result[themeModeKey]);
});

const setInSyncStorage = (activeMode: string) => chrome.storage.local.set({ [themeModeKey]: activeMode});
const getFromSyncStorage = () => new Promise(resolve => chrome.storage.local.get([themeModeKey], resolve));

const createTheme = () => {
  const { subscribe, set } = writable<Theme>(getTheme[LIGHT_MODE]);

  const restore = async () => {
    const result = await getFromSyncStorage();
    console.log('restore', result);
    const storedValue: ACTIVE_MODE = result[themeModeKey];

    if (storedValue) {
      console.debug("Restored theme mode from local storage:", storedValue);
      set(getTheme(storedValue));
    } else {
      console.debug("No theme mode found in local storage, using value from media query");

      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange = (e: MediaQueryList | MediaQueryListEvent) => {
        set(getTheme(e.matches ? DARK_MODE : LIGHT_MODE));
      };
      // Set theme, set up change listener, and clean up listener on destroy
      handleThemeChange(darkModeQuery);
      darkModeQuery.addEventListener("change", handleThemeChange);
    }
  };
  
  return {
    restore,
    subscribe,
    set: (key: ACTIVE_MODE) => {
      set(getTheme(key));
      setInSyncStorage(key).then(() => console.debug("Set theme mode in local storage:", key));
    },
  }
}

export const theme = createTheme();
