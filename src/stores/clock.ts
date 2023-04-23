import { writable } from 'svelte/store';

const use24hKey = "BROWSER_BURN_CLOCK_DISPLAY24H";

const setInSyncStorage = (display24h: boolean) => chrome.storage.sync.set({ [use24hKey]: display24h});
const getFromSyncStorage = () => new Promise(resolve => chrome.storage.sync.get([use24hKey], resolve));

const createDisplay24HClock = () => {
  let syncedValue: boolean;
  getFromSyncStorage()
    .then((result) => syncedValue = result[use24hKey]);

  if (syncedValue) {
    console.debug("Restored 12h/24h clock from synced storage:", syncedValue);
  }

  const { subscribe, set } = writable<boolean>(syncedValue || false);
  return {
    subscribe,
    set: (display24h: boolean) => {
      set(display24h);
      setInSyncStorage(display24h).then(() => console.debug("Set 12h/24h clock in synced storage:", display24h));
    },
  }
}

export const display24HClock = createDisplay24HClock();
