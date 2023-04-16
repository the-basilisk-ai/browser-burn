<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "./Loading.svelte";
  import Message from "./Message.svelte";
  import { getRoast } from "../api/roast";
  import loadingMessages from "../constants/loadingMessages";

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

    chrome.history.search({ text: "", startTime, endTime }, callback);
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

<div class="flex flex-col items-center pt-[10vh] h-screen bg-blue-900">
  {#if isLoading}
    <Loading message={loadingMessage} />
  {:else if error}
    <Message text={error} isError />
  {:else}
    <Message text={roast} />
  {/if}
</div>
