import { writable } from 'svelte/store';

export const isLoading = writable(true);
export const roast = writable<string | null>(null);
export const error = writable<string | null>(null);
