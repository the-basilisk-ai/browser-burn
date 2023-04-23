<script lang="ts">
  import { theme } from "../stores/theme";
  import { display24HClock } from "../stores/clock";

  export let className: string = "";

  const toggleMode = () => display24HClock.set(!$display24HClock);
</script>

<button
  title="Toggle 24h clock"
  class={className}
  type="button"
  aria-label="toggle clock mode"
  on:click={toggleMode}
>
  <div class="w-7 font-bold text-xl" style:color={$theme.textBrand}>
    {#if $display24HClock}
      24
    {:else}
      12
    {/if}
  </div>
</button>
