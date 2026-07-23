import { get, writable } from "svelte/store";
import {
  DARK_MODE,
  LIGHT_MODE,
  SYSTEM_MODE,
  getTheme,
  type ACTIVE_MODE,
  type THEME_PREFERENCE,
} from "../constants/theme";
import type { Theme } from "../constants/theme";

const themeModeKey = "BROWSER_BURN_THEME_MODE";

const setInSyncStorage = (preference: THEME_PREFERENCE) =>
  chrome.storage.local.set({ [themeModeKey]: preference });
const getFromSyncStorage = () =>
  new Promise((resolve) => chrome.storage.local.get([themeModeKey], resolve));

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const systemMode = (): ACTIVE_MODE =>
  darkModeQuery.matches ? DARK_MODE : LIGHT_MODE;

const createTheme = () => {
  const preferenceStore = writable<THEME_PREFERENCE>(SYSTEM_MODE);
  const store = writable<Theme>(getTheme(systemMode()));

  const apply = (preference: THEME_PREFERENCE) => {
    preferenceStore.set(preference);
    store.set(
      getTheme(preference === SYSTEM_MODE ? systemMode() : preference)
    );
  };

  // Follow OS changes live while the preference is "system".
  darkModeQuery.addEventListener("change", () => {
    if (get(preferenceStore) === SYSTEM_MODE) {
      store.set(getTheme(systemMode()));
    }
  });

  const restore = async () => {
    const result = await getFromSyncStorage();
    const storedValue: THEME_PREFERENCE = result[themeModeKey];

    if (storedValue) {
      console.debug("Restored theme preference from local storage:", storedValue);
      apply(storedValue);
    }
  };

  return {
    restore,
    subscribe: store.subscribe,
    preference: { subscribe: preferenceStore.subscribe },
    set: (preference: THEME_PREFERENCE) => {
      apply(preference);
      setInSyncStorage(preference).then(() =>
        console.debug("Set theme preference in local storage:", preference)
      );
    },
  };
};

export const theme = createTheme();
