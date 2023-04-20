import { writable } from 'svelte/store';

export const roast = writable<string>("");
export const isLoading = writable(true);
