<script lang="ts">
  import { onMount } from "svelte";
  import loadingMessages from "../constants/loadingMessages";
  import { theme } from "../stores/theme";
  import { isLoading, roast, error } from "../stores/api";
  import { getRoast } from "../api/roast";
  import Loading from "./Loading.svelte";
  import Message from "./Message.svelte";

  const loadingMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  // For testing purposes
  // isLoading.set(true);
  // roast.set(
  //   "You've been busy, haven't you? From CSS to AI to pipelines, it's almost like you're trying hard, but not hard enough. Keep trying!"
  // );

  onMount(async () => {
    getRoast();
  });
</script>

<div
  class="w-7/12 max-w-7xl p-5 rounded-[10px]"
  style:background-color={$theme.bgRoast}
  style:color={$theme.textRoast}
>
  {#if $isLoading}
    <Loading message={loadingMessage} />
  {:else if $error}
    <Message text={$error} />
  {:else}
    <Message text={$roast} />
    <p class="font-bold mt-5">Sincerely, your browsing history</p>
  {/if}
</div>
