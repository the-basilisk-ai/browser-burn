<script lang="ts">
  import logo from "./LogoSvg.svelte";
  import type {Theme} from "../constants/theme";
  import {theme} from "../stores/theme";

  // Create a LogoSvg component and get the markup from it
  // Allows us to use the theme color in the SVG
  // This seems dirty, but TODO a nicer way
  const getSvgMarkup = (logoSvgComponent, themeValue: Theme) => {
    const container = document.createElement("div");
    new logoSvgComponent({
      target: container,
      props: {themeColor: themeValue.textBrand},
    });
    const svg = container.querySelector("svg");
    return svg?.outerHTML ?? "";
  };

  $: svgMarkup = getSvgMarkup(logo, $theme);
  $: imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgMarkup
  )}`;
</script>

<div class="flex items-center gap-1">
  <img alt="BrowserBurn logo" class="w-9 h-9" src={imageUrl}/>
  <div class="flex flex-col mt-2">
    <h1 class="text-lg font-bold leading-6" style:color={$theme.textBrand}>
      BrowserBurn
    </h1>
    <h2 class="text-xs" style:color={$theme.textBrand}>Built by <a href="https://meetsquad.ai" class="underline">Squad
      AI</a></h2>
  </div>
</div>
