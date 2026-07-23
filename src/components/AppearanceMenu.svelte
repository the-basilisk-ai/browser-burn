<script lang="ts">
  import { fade } from "svelte/transition";
  import { backgrounds, CUSTOM_BACKGROUND_KEY } from "../constants/backgrounds";
  import { background, pageBackground } from "../stores/background";
  import { theme } from "../stores/theme";
  import { effectiveTheme } from "../stores/effectiveTheme";
  import {
    DARK_MODE,
    LIGHT_MODE,
    SYSTEM_MODE,
    type THEME_PREFERENCE,
  } from "../constants/theme";
  import ModeIcon from "./ModeIcon.svelte";

  export let className: string = "";

  let open = false;
  let container: HTMLDivElement;

  const preference = theme.preference;
  const modes: { key: THEME_PREFERENCE; label: string }[] = [
    { key: LIGHT_MODE, label: "Light" },
    { key: DARK_MODE, label: "Dark" },
    { key: SYSTEM_MODE, label: "System" },
  ];

  $: swatchColor = (b: (typeof backgrounds)[number]) =>
    $theme.key === DARK_MODE ? b.dark : b.light;
  $: isCustom = $background.key === CUSTOM_BACKGROUND_KEY;

  const handleCustomInput = (e: Event) => {
    background.setCustom((e.target as HTMLInputElement).value, $theme.key);
  };

  const handleWindowClick = (e: MouseEvent) => {
    if (open && container && !container.contains(e.target as Node)) {
      open = false;
    }
  };

  const handleWindowKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      open = false;
    }
  };
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleWindowKeydown} />

<div class={`relative flex items-center ${className}`} bind:this={container}>
  <button
    type="button"
    title="Appearance"
    aria-label="Appearance settings"
    aria-expanded={open}
    class="cursor-pointer"
    on:click={() => (open = !open)}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={$effectiveTheme.textBrand}
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"
      />
      <circle cx="6.5" cy="11.5" r="1.5" />
      <circle cx="9.5" cy="7.5" r="1.5" />
      <circle cx="14.5" cy="7.5" r="1.5" />
      <circle cx="17.5" cy="11.5" r="1.5" />
    </svg>
  </button>

  {#if open}
    <div
      class="popover rounded-md p-2 shadow-lg border"
      style:background-color={$effectiveTheme.bgRoast}
      style:border-color={$effectiveTheme.surfaceBorder}
      transition:fade={{ duration: 120 }}
    >
      <div
        class="flex items-center justify-around pb-2 mb-2 border-b"
        style:border-color={$effectiveTheme.navigationDivider}
        role="radiogroup"
        aria-label="Theme mode"
      >
        {#each modes as m (m.key)}
          <button
            type="button"
            title={`${m.label} mode`}
            role="radio"
            aria-checked={$preference === m.key}
            class="mode rounded p-1"
            class:selected={$preference === m.key}
            on:click={() => theme.set(m.key)}
          >
            <ModeIcon mode={m.key} fill={$effectiveTheme.textBrand} />
          </button>
        {/each}
      </div>
      <div
        class="flex items-center space-x-1.5"
        role="radiogroup"
        aria-label="Background color"
      >
        {#each backgrounds as b (b.key)}
          <button
            type="button"
            title={`${b.label} background`}
            role="radio"
            aria-checked={$background.key === b.key}
            class="swatch"
            class:selected={$background.key === b.key}
            style:background-color={swatchColor(b)}
            style:border-color={$effectiveTheme.textBrand}
            on:click={() => background.set(b.key)}
          />
        {/each}
        <label
          title="Custom background color"
          class="swatch custom"
          class:selected={isCustom}
          style:background={isCustom ? $pageBackground : undefined}
          style:border-color={$effectiveTheme.textBrand}
        >
          <input
            type="color"
            aria-label="Pick a custom background color"
            value={$pageBackground}
            on:input={handleCustomInput}
          />
        </label>
      </div>
    </div>
  {/if}
</div>

<style>
  .popover {
    position: absolute;
    bottom: calc(100% + 14px);
    right: 0;
  }

  .mode {
    cursor: pointer;
    opacity: 0.55;
  }

  .mode:hover {
    opacity: 1;
  }

  .mode.selected {
    opacity: 1;
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }

  .swatch {
    width: 16px;
    height: 16px;
    border-radius: 9999px;
    border: 1px solid;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 150ms ease-out;
  }

  .swatch:hover {
    transform: scale(1.2);
  }

  .swatch.selected {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }

  .custom {
    display: inline-block;
    background: conic-gradient(
      #f87171,
      #fbbf24,
      #4ade80,
      #38bdf8,
      #a78bfa,
      #f87171
    );
  }

  .custom input {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    .swatch {
      transition: none;
    }
  }
</style>
