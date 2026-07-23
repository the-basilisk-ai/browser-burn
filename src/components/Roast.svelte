<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import loadingMessages from "../constants/loadingMessages";
  import { theme } from "../stores/theme";
  import { isLoading, isStreaming, error } from "../stores/api";
  import { displayedRoast, isTyping } from "../stores/typewriter";
  import { getRoast } from "../api/roast";
  import Loading from "./Loading.svelte";
  import Message from "./Message.svelte";

  const loadingMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  let contentHeight: number;

  // For testing purposes
  // isLoading.set(true);
  // roast.set(
  //   "You've been busy, haven't you? From CSS to AI to pipelines, it's almost like you're trying hard, but not hard enough. Keep trying!"
  // );
  // setTimeout(() => isLoading.set(false), 1000);

  onMount(async () => {
    getRoast();
  });
</script>

<div
  class="w-7/12 max-w-7xl rounded-[10px] overflow-hidden roast-container"
  style:background-color={$theme.bgRoast}
  style:color={$theme.textRoast}
  style:height={contentHeight ? `${contentHeight}px` : "auto"}
>
  <div class="p-5" bind:clientHeight={contentHeight}>
    {#if $isLoading}
      <Loading message={loadingMessage} />
    {:else if $error}
      <Message text={$error} />
    {:else}
      <Message
        text={$displayedRoast ?? ""}
        streaming={$isStreaming || $isTyping}
      />
      {#if !$isStreaming && !$isTyping}
        <p in:fade={{ duration: 400 }} class="font-bold mt-5">
          Sincerely, your browsing history
        </p>
      {/if}
    {/if}
  </div>
</div>

<style>
  .roast-container {
    transition: height 250ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .roast-container {
      transition: none;
    }
  }
</style>
