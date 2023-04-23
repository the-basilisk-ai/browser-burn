<script lang="ts">
  import { theme } from "../../stores/theme";
  import ClockToggle from "../ClockToggle.svelte";
  import ModeToggle from "../ModeToggle.svelte";
  import NavigationSvg from "./NavigationSvg.svelte";

  export let className: string = "";

  theme.subscribe((value) => (themeValue = value));
  $: themeValue = $theme;

  let mouseOver = false;

  const settingsUrl = "chrome://settings";
  const bookmarksUrl = "chrome://bookmarks";
  const historyUrl = "chrome://history";

  const openLocalUrl = (url: string) => chrome.tabs.create({ url });
  const handleKeyUp = async (e: KeyboardEvent, url: string) => {
    if (e.key === "Enter" || e.key === "Space") {
      await openLocalUrl(url);
    }
  };

  $: openSettingsUrl = () => openLocalUrl(settingsUrl);
  $: openBookmarksUrl = () => openLocalUrl(bookmarksUrl);
  $: openHistoryUrl = () => openLocalUrl(historyUrl);
  $: handleKeyUpSettings = (e: KeyboardEvent) => handleKeyUp(e, settingsUrl);
  $: handleKeyUpBookmarks = (e: KeyboardEvent) => handleKeyUp(e, bookmarksUrl);
  $: handleKeyUpHistory = (e: KeyboardEvent) => handleKeyUp(e, historyUrl);
</script>

<nav
  class={className}
  style:color={themeValue.textBrand}
  on:mouseenter={() => (mouseOver = true)}
  on:focus={() => (mouseOver = true)}
  on:mouseleave={() => (mouseOver = false)}
  on:blur={() => (mouseOver = false)}
>
  <div
    class="flex items-center rounded-md p-2 pl-3 pr-3 space-x-2 h-10"
    style:background-color={themeValue.bgRoast}
  >
    {#if mouseOver}
      <ModeToggle className="pr-1" />
      <ClockToggle className="pr-1" />
    {/if}
    <div
      class="flex items-center space-x-2"
      style:border-left={mouseOver
        ? `2px solid ${themeValue.navigationDivider}`
        : "none"}
      style:padding-left={mouseOver ? "0.75rem" : "0"}
    >
      <button
        type="button"
        title="Edit Preferences"
        class="cursor-pointer"
        on:click={openSettingsUrl}
        on:keyup={handleKeyUpSettings}
      >
        <NavigationSvg>
          <path
            d="M16 11a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"
          />
          <path
            d="M28.13 13.41l-2.55-.33a9.8 9.8 0 0 0-.76-1.83l1.54-2.06a1 1 0 0 0-.09-1.31l-2.22-2.2a1 1 0 0 0-1.31-.09l-2.07 1.58a10.72 10.72 0 0 0-1.76-.73l-.32-2.56a1 1 0 0 0-1-.88H14.4a1 1 0 0 0-1 .87l-.34 2.57a10 10 0 0 0-1.82.76L9.2 5.64a1 1 0 0 0-1.32.09L5.68 8a1 1 0 0 0-.08 1.27l1.56 2a10 10 0 0 0-.76 1.82l-2.53.32a1 1 0 0 0-.87 1v3.2a1 1 0 0 0 .88 1l2.5.31a10.19 10.19 0 0 0 .76 1.84l-1.51 2.06a1 1 0 0 0 .1 1.3L8 26.32a1 1 0 0 0 1.31.09l2-1.54a9.8 9.8 0 0 0 1.78.73l.33 2.53a1 1 0 0 0 1 .87h3.2a1 1 0 0 0 1-.87l.34-2.54a10.16 10.16 0 0 0 1.81-.75l2.08 1.53a1 1 0 0 0 1.3-.1l2.2-2.22a1 1 0 0 0 .09-1.31l-1.55-2a9.93 9.93 0 0 0 .74-1.79l2.53-.33a1 1 0 0 0 .87-1V14.4a1 1 0 0 0-.9-.99zM27 16.72l-2.33.28a1 1 0 0 0-.84.77 8 8 0 0 1-1 2.45 1 1 0 0 0 .06 1.14l1.42 1.87-1 1-1.92-1.41a1 1 0 0 0-1.12 0 7.89 7.89 0 0 1-2.47 1 1 1 0 0 0-.77.84L16.72 27h-1.44L15 24.68a1 1 0 0 0-.77-.85 7.61 7.61 0 0 1-2.45-1 1 1 0 0 0-1.13.06l-1.9 1.4-1-1 1.39-1.91a1 1 0 0 0 0-1.12 8.06 8.06 0 0 1-1-2.49A1 1 0 0 0 7.3 17L5 16.72v-1.44L7.32 15a1 1 0 0 0 .84-.77 8.15 8.15 0 0 1 1.05-2.49 1 1 0 0 0-.05-1.16L7.72 8.74l1-1 1.85 1.46a1 1 0 0 0 1.14.05 7.89 7.89 0 0 1 2.49-1 1 1 0 0 0 .8-.88L15.28 5h1.43L17 7.36a1 1 0 0 0 .78.85 7.86 7.86 0 0 1 2.44 1 1 1 0 0 0 1.13-.05l1.91-1.45 1 1-1.42 1.89a1 1 0 0 0-.05 1.14 8 8 0 0 1 1.05 2.49 1 1 0 0 0 .84.76l2.34.31z"
          />
        </NavigationSvg>
      </button>
      <button
        type="button"
        title="View and Manage Bookmarks"
        class="cursor-pointer"
        on:click={openBookmarksUrl}
        on:keyup={handleKeyUpBookmarks}
      >
        <NavigationSvg>
          <path
            d="M26.147 23.296A9.961 9.961 0 0 0 26.203 27H27a1 1 0 0 1 0 2H8.056C5.819 29 4 27.215 4 25V6.153C4 4.392 5.509 3 7.334 3h17.842C26.178 3 27 3.8 27 4.803V21a1 1 0 0 1 0 2h-.28a.998.998 0 0 1-.573.296zM24.17 23H8.056C6.915 23 6 23.898 6 25c0 1.102.915 2 2.056 2h16.112a11.954 11.954 0 0 1 0-4zM6 21.55A4.083 4.083 0 0 1 8.056 21H25V5h-4v9a1 1 0 0 1-1.634.773L16 12.012l-3.366 2.761A1 1 0 0 1 11 14V5H7.334C6.579 5 6 5.534 6 6.152v15.399zM13 5v6.886l2.366-1.94a1 1 0 0 1 1.268 0L19 11.885V5h-6z"
          />
        </NavigationSvg>
      </button>
      <button
        type="button"
        title="View your Browsing History"
        class="cursor-pointer"
        on:click={openHistoryUrl}
        on:keyup={handleKeyUpHistory}
      >
        <NavigationSvg>
          <path
            d="M16 7.2a1 1 0 0 0-1 1v6.945c-.595.347-1 .984-1 1.722A2 2 0 1 0 17.645 18H21.2a1 1 0 0 0 0-2h-3.406a2 2 0 0 0-.794-.855V8.2a1 1 0 0 0-1-1M30 16c0 7.72-6.28 14-14 14S2 23.72 2 16a1 1 0 0 1 2 0c0 6.617 5.383 12 12 12s12-5.383 12-12S22.617 4 16 4c-4.393 0-7.781 2.085-9.855 6h2.922a1 1 0 0 1 0 2h-5.2a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v3.18C7.327 4.185 11.224 2 16 2c7.72 0 14 6.28 14 14"
          />
        </NavigationSvg>
      </button>
    </div>
  </div>
</nav>
