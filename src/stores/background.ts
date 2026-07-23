import { derived, get, writable } from "svelte/store";
import {
  CUSTOM_BACKGROUND_KEY,
  DEFAULT_BACKGROUND_KEY,
  getBackground,
  type Background,
} from "../constants/backgrounds";
import { DARK_MODE, type ACTIVE_MODE } from "../constants/theme";
import { theme } from "./theme";

const backgroundKey = "BROWSER_BURN_BACKGROUND";

// Presets are stored as their key string; custom colors as the whole object.
type StoredBackground = string | Background;

const setInSyncStorage = (value: StoredBackground) =>
  chrome.storage.local.set({ [backgroundKey]: value });
const getFromSyncStorage = () =>
  new Promise((resolve) => chrome.storage.local.get([backgroundKey], resolve));

const createBackground = () => {
  const store = writable<Background>(getBackground(DEFAULT_BACKGROUND_KEY));
  const { subscribe, set } = store;

  const restore = async () => {
    const result = await getFromSyncStorage();
    const storedValue: StoredBackground = result[backgroundKey];

    if (typeof storedValue === "string") {
      console.debug("Restored background from local storage:", storedValue);
      set(getBackground(storedValue));
    } else if (storedValue?.key === CUSTOM_BACKGROUND_KEY) {
      console.debug("Restored custom background from local storage:", storedValue);
      set(storedValue);
    }
  };

  return {
    restore,
    subscribe,
    set: (key: string) => {
      set(getBackground(key));
      setInSyncStorage(key).then(() =>
        console.debug("Set background in local storage:", key)
      );
    },
    // A custom color only replaces the variant for the mode it was picked in;
    // the other mode keeps its previous color.
    setCustom: (color: string, mode: ACTIVE_MODE) => {
      const previous = get(store);
      const custom: Background = {
        key: CUSTOM_BACKGROUND_KEY,
        label: "Custom",
        light: mode === DARK_MODE ? previous.light : color,
        dark: mode === DARK_MODE ? color : previous.dark,
      };
      set(custom);
      setInSyncStorage(custom).then(() =>
        console.debug("Set custom background in local storage:", custom)
      );
    },
  };
};

export const background = createBackground();

export const pageBackground = derived(
  [theme, background],
  ([$theme, $background]) =>
    $theme.key === DARK_MODE ? $background.dark : $background.light
);
