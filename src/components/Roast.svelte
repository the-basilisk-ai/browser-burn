<script lang="ts">
  import { onMount } from "svelte";
  import { HISTORY_HOURS } from "../constants/api";
  import loadingMessages from "../constants/loadingMessages";
  import type { Theme } from "../constants/theme";
  import { theme } from "../stores/theme";
  import { isLoading, roast } from "../stores/api";
  import { getRoast } from "../api/roast";
  import Loading from "./Loading.svelte";
  import Message from "./Message.svelte";

  let themeValue: Theme;
  theme.subscribe((value) => (themeValue = value));

  let isLoadingValue: boolean;
  let roastValue: string;
  isLoading.subscribe((value) => (isLoadingValue = value));
  roast.subscribe((value) => (roastValue = value));

  let error: string | null = null;

  const loadingMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  // isLoading.set(true);
  // roast.set(
  //   "You seem to love pipelines more than a plumber. Maybe you should take a break from coding and actually enjoy some real-life pipelines, like the ones at the water park."
  // );

  onMount(async () => {
    roastHistory(HISTORY_HOURS, onHistoryResults);
  });

  const roastHistory = async (
    hours: number,
    callback: (history: chrome.history.HistoryItem[]) => void
  ) => {
    console.debug("Fetching history...");
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000).getTime();
    const endTime = Date.now();

    chrome.history.search(
      { text: "", startTime, endTime, maxResults: 50 },
      callback
    );
  };

  async function onHistoryResults(history: chrome.history.HistoryItem[]) {
    try {
      isLoading.set(true);
      roast.set(await getRoast(history));
    } catch (e) {
      console.error(e);
      error = "Oops, something went wrong. Please try again later.";
    } finally {
      isLoading.set(false);
    }
  }
</script>

<div
  class="w-7/12 max-w-7xl p-5 rounded-[10px]"
  style:background-color={themeValue.bgRoast}
  style:color={themeValue.textRoast}
>
  {#if isLoadingValue}
    <!-- <p>Loading...</p> -->
    <Loading message={loadingMessage} />
  {:else if error}
    <Message text={error} />
  {:else}
    <Message text={roastValue} />
    <p class="font-bold mt-3.5">Sincerely, your browsing history</p>
  {/if}
</div>
