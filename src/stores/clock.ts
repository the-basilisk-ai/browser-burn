import { writable } from 'svelte/store';

const use24hKey = "BROWSER_BURN_CLOCK_DISPLAY24H";

const setInSyncStorage = (display24h: boolean) => chrome.storage.sync.set({ [use24hKey]: display24h});
const getFromSyncStorage = () => new Promise(resolve => chrome.storage.sync.get([use24hKey], resolve));

const createDisplay24HClock = () => {
  const { subscribe, set } = writable<boolean>(false);

  const restore = async () => {
    const result = await getFromSyncStorage();
    const storedValue: boolean = result[use24hKey];

    if (storedValue) {
      console.debug("Restored clock mode from local storage:", storedValue);
      set(storedValue);
    } else {
      console.debug("No clock mode found in local storage, using default (12h)");
    }
  };

  return {
    restore,
    subscribe,
    set: (display24h: boolean) => {
      set(display24h);
      setInSyncStorage(display24h).then(() => console.debug("Set 12h/24h clock in synced storage:", display24h));
    },
  }
}

export const display24HClock = createDisplay24HClock();
