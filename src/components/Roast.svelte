<script lang="ts">
  import { onMount } from "svelte";
  import loadingMessages from "../constants/loadingMessages";
  import type { Theme } from "../constants/theme";
  import { theme } from "../stores/theme";
  import { getRoast } from "../api/roast";
  import Loading from "./Loading.svelte";
  import Message from "./Message.svelte";
  import ShareOnTwitter from "./ShareOnTwitter.svelte";

  let themeValue: Theme;
  theme.subscribe((value) => (themeValue = value));

  const loadingMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  const hoursOfHistoryToFetch = 2;
  let isLoading: boolean = true;
  let error: string | null = null;
  let roast: string | null = null;

  onMount(async () => {
    roastHistory(hoursOfHistoryToFetch, onHistoryResults);
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
      roast = await getRoast(history);
    } catch (e) {
      console.error(e);
      error = "Oops, something went wrong. Please try again later.";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex flex-col grow items-center h-full gap-8 pt-14">
  <div
    class="w-7/12 max-w-7xl p-5 rounded-[10px]"
    style:background-color={themeValue.bgRoast}
    style:color={themeValue.textRoast}
  >
    {#if isLoading}
      <p>Loading...</p>
      <!-- <Loading message={loadingMessage} /> -->
    {:else if error}
      <Message text={error} />
    {:else}
      <Message text={roast} />
    {/if}
    <p class="font-[Inter] font-bold leading-4 mt-3.5">
      Sincerely, your browsing history
    </p>
  </div>

  <ShareOnTwitter disabled={isLoading} />
</div>
