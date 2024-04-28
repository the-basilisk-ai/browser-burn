<script lang="ts">
  import { afterUpdate } from "svelte";
  import { isLoading, roast, error } from "../../stores/api";
  import { theme } from "../../stores/theme";
  import ShareButton from "./ShareButton.svelte";
  import ShareTargets from "./ShareTargets.svelte";
  import Logo from "../Logo.svelte";

  let shareCardElement: HTMLElement;

  let shareCardIsOpen = false;
  const openShareCard = () => (shareCardIsOpen = true);
  const closeShareCard = () => (shareCardIsOpen = false);
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeShareCard();
    }
  };

  let modalElement: HTMLElement;
  const handleClickOutside = (e: MouseEvent) => {
    if (!modalElement.contains(e.target as Node)) {
      closeShareCard();
    }
  };

  let firstInput: HTMLElement;
  let lastInput: HTMLElement;

  const handleKeyDownFirstInput = (e: KeyboardEvent) => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      lastInput.focus();
    }
  };

  const handleKeyDownLastInput = (e: KeyboardEvent) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      firstInput.focus();
    }
  };

  afterUpdate(() => {
    if (!shareCardIsOpen) {
      return;
    }

    const inputs = [...modalElement.querySelectorAll("button, a")];
    firstInput = inputs.at(0) as HTMLElement;
    lastInput = inputs.at(inputs.length - 1) as HTMLElement;
    firstInput.focus();

    // Redirect first shift+tab to last input
    lastInput.addEventListener("keydown", handleKeyDownLastInput);
    // Redirect last tab to first input
    firstInput.addEventListener("keydown", handleKeyDownFirstInput);
  });
</script>

<svelte:window on:keyup={handleEscapeKey} />

<!-- Modal toggle -->
{#if !$error}
  <ShareButton disabled={$isLoading} onClick={openShareCard} />
{/if}

{#if shareCardIsOpen}
  <!-- Modal -->
  <div
    on:keydown={handleEscapeKey}
    on:click={handleClickOutside}
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full backdrop-blur-sm"
  >
    <div class="relative mx-auto w-full max-w-xl">
      <!-- content -->
      <div
        bind:this={modalElement}
        class="relative rounded-[10px] shadow-2xl shadow-gray-900/20 pb-2"
        style:background-color={$theme.bgRoast}
      >
        <!-- header -->
        <div class="flex p-4">
          <h3 class="grow text-xl font-semibold" style:color={$theme.textBrand}>
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
        <div class="grid grid-cols-1 p-6 gap-4">
          <div
            bind:this={shareCardElement}
            class="min-w-screen flex items-center justify-center px-5 py-5 rounded-md border"
            style={`background: linear-gradient(90deg, ${$theme.bgGradientFrom} 0%, ${$theme.bgGradientTo} 100%);`}
            style:border-color={$theme.bgLoading.light}
          >
            <div
              class="w-full max-w-xl mx-auto rounded-lg shadow-lg px-5 pt-5 pb-5"
              style:background-color={$theme.bgRoast}
              style:color={$theme.textRoast}
            >
              <div class="w-full font-serif text-3xl">
                <div>“</div>
                <p class="text-xl text-center">{$roast}</p>
                <div class="text-right mt-3">”</div>
              </div>
              <p class="w-full text-center -mt-2 text-xs">
                <span class="font-bold">Get Roasted 🔥️</span>
                <br />
                Download BrowserBurn from the Chrome Web Store
              </p>
            </div>
          </div>
          <div />
          <div>
            <ShareTargets {shareCardElement} />
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
