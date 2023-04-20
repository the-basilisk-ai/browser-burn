<script lang="ts">
  import { onMount } from "svelte";
  import { isLoading, roast } from "../stores/api";
  import { theme } from "../stores/theme";
  import type { Theme } from "../constants/theme";
  import ShareButton from "../components/ShareButton.svelte";
  import ShareTargets from "./ShareTargets.svelte";

  let themeValue: Theme;
  let isLoadingValue: boolean;
  let roastValue: string;
  theme.subscribe((value) => (themeValue = value));
  isLoading.subscribe((value) => (isLoadingValue = value));
  roast.subscribe((value) => (roastValue = value));

  let shareText = "I just got roasted by my browsing history on BrowserBurn!";
  let shareCardElement;

  let shareCardIsOpen = false;
  const openShareCard = () => (shareCardIsOpen = true);
  const closeShareCard = () => (shareCardIsOpen = false);
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeShareCard();
    }
  };

  onMount(() => {
    window.addEventListener("keyup", handleEscapeKey);
    return () => window.removeEventListener("keyup", handleEscapeKey);
  });
</script>

<!-- Modal toggle -->
<ShareButton disabled={isLoadingValue} onClick={openShareCard} />

{#if shareCardIsOpen}
  <!-- Modal -->
  <div
    on:keydown={handleEscapeKey}
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full backdrop-blur-sm"
  >
    <div class="relative mx-auto w-full max-w-4xl">
      <!-- content -->
      <div
        class="relative rounded-[10px] shadow-2xl shadow-gray-900/20 pb-8"
        style:background-color={themeValue.bgRoast}
      >
        <!-- header -->
        <div class="flex p-4">
          <h3
            class="grow text-xl font-semibold"
            style:color={themeValue.textBrand}
          >
            Share your roast
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            on:click={closeShareCard}
            on:keyup={handleEscapeKey}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- body -->
        <div class="grid grid-cols-2 p-6 gap-4">
          <div />
          <div class="text-base" style:color={themeValue.textBrand}>
            Customise your tweet text
          </div>
          <div
            bind:this={shareCardElement}
            class="min-w-screen flex items-center justify-center px-5 py-5 rounded-md border"
            style={`background: linear-gradient(90deg, ${themeValue.bgGradientFrom} 0%, ${themeValue.bgGradientTo} 100%);`}
            style:border-color={themeValue.bgLoading.light}
          >
            <div
              class="w-full mx-auto rounded-lg shadow-lg px-5 pt-5 pb-10"
              style="max-width: 500px"
              style:background-color={themeValue.bgRoast}
              style:color={themeValue.textRoast}
            >
              <div class="w-full mb-10">
                <div class=" font-serif text-3xl text-left leading-tight">
                  “
                </div>
                <p class="text-xl font-serif text-center">{roastValue}</p>
                <div
                  class="font-serif text-3xl text-right leading-tight h-2 -mt-3"
                >
                  ”
                </div>
              </div>
              <div class="w-full">
                <p class="text-md font-bold text-center">Get Roasted</p>
                <p class="text-xs text-center">basiliskai.com/browserburn 🐍</p>
              </div>
            </div>
          </div>
          <textarea
            bind:value={shareText}
            class="text-base h-42 p-3 rounded-md border"
            style:color={themeValue.textBrand}
            style:background-color={themeValue.bgShareTextArea}
            style:border-color={themeValue.bgLoading.light}
          />
          <div />
          <div>
            <ShareTargets {shareText} {shareCardElement} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .font-serif {
    font-family: "Cormorant Garamond", serif;
  }
</style>
