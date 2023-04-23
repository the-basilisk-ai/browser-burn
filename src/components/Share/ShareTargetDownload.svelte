<script lang="ts">
  import { theme } from "../../stores/theme";

  export let onClick: () => void;
  export let name: string;

  const handleKeyUp = (e: Event) => {
    if (e instanceof KeyboardEvent && e.key === "Enter") {
      onClick();
    }
  };

  let backgroundElem: HTMLElement;
  const handleMouseOver = () => backgroundElem.classList.add("hover");
  const handleMouseOut = () => backgroundElem.classList.remove("hover");
</script>

<button
  type="button"
  on:click={onClick}
  on:keyup={handleKeyUp}
  aria-label={name}
  class="target cursor-pointer"
>
  <div
    bind:this={backgroundElem}
    class="background flex items-center justify-center rounded-full"
    style:background-color={$theme.bgShareIcon}
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
    on:focus={handleMouseOver}
    on:blur={handleMouseOut}
  >
    <div
      aria-hidden="true"
      class="flex items-center justify-center w-14 h-14"
      style:fill={$theme.textShareIcon}
    >
      <slot />
    </div>
  </div>
  <div class="text-xs text-center w-full mt-2" style:color={$theme.textShare}>
    {name}
  </div>
</button>

<style>
  /* Hack, pushes a style into the global namespace but it's scoped to
     THIS specific component instance at runtime because of the `button.target >`.
     This is required because Svelte wants to prune classes that aren't
     statically referenced. */
  button.target > :global(.hover) {
    filter: brightness(120%);
    scale: 110%;
  }
</style>
