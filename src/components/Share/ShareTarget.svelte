<script lang="ts">
  import { theme } from "../../stores/theme";
  import type { Theme } from "../../constants/theme";

  export let href: string;
  export let name: string;
  export let target: string = "_blank";

  let themeValue: Theme;
  theme.subscribe((value) => (themeValue = value));

  let backgroundElem: HTMLElement;
  const handleMouseOver = () => backgroundElem.classList.add("hover");
  const handleMouseOut = () => backgroundElem.classList.remove("hover");
</script>

<a {href} {target} rel="noopener" aria-label={name}>
  <div
    bind:this={backgroundElem}
    class="background flex items-center justify-center rounded-full"
    style:background-color={themeValue.bgShareIcon}
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
    on:focus={handleMouseOver}
    on:blur={handleMouseOut}
  >
    <div
      aria-hidden="true"
      class="flex items-center justify-center w-14 h-14"
      style:fill={themeValue.textShareIcon}
    >
      <slot />
    </div>
  </div>
  <div
    class="text-xs text-center w-full mt-2"
    style:color={themeValue.textShare}
  >
    {name}
  </div>
</a>

<style>
  /* Hack, pushes a style into the global namespace but it's scoped to
     THIS specific component instance at runtime because of the `a >`.
     This is required because Svelte wants to prune classes that aren't
     statically referenced. */
  a > :global(.hover) {
    filter: brightness(120%);
    scale: 110%;
  }
</style>
