import { writable } from 'svelte/store';
import { LIGHT_MODE, getTheme, type ACTIVE_MODE } from '../constants/theme';
import type { Theme } from "../constants/theme";

const activeModeKey = "BROWSER_BURN_ACTIVE_MODE";

const setInSyncStorage = (activeMode: string) => chrome.storage.sync.set({ [activeModeKey]: activeMode});
const getFromSyncStorage = () => chrome.storage.sync.get([activeModeKey]);

const createTheme = () => {
  let syncedValue: string;
  getFromSyncStorage().then((result) => {
    syncedValue = result[activeModeKey];
  });
  console.log("syncedValue", syncedValue);
  const { subscribe, set } = writable<Theme>(syncedValue || getTheme[LIGHT_MODE]);
  return {
    subscribe,
    set: (key: ACTIVE_MODE) => {
      set(getTheme(key));
      setInSyncStorage(key).then(() => console.debug("setInSyncStorage", key));
    },
  }
}

export const theme = createTheme();
