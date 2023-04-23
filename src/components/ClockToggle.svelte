<script lang="ts">
  import { theme } from "../stores/theme";
  import { display24HClock } from "../stores/clock";

  export let className: string = "";

  theme.subscribe((value) => (themeValue = value));
  display24HClock.subscribe((value) => (display24HClockValue = value));
  $: themeValue = $theme;
  $: display24HClockValue = $display24HClock;

  const toggleMode = () => display24HClock.set(!display24HClockValue);
</script>

<button
  title="Toggle 24h clock"
  class={className}
  type="button"
  aria-label="toggle clock mode"
  on:click={toggleMode}
>
  <div class="w-7 font-bold text-xl" style:color={themeValue.textBrand}>
    {#if display24HClockValue}
      24
    {:else}
      12
    {/if}
  </div>
</button>
