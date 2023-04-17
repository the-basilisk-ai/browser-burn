<script lang="ts">
  import logo from "./LogoSvg.svelte";
  import type { Theme } from "../constants/theme";
  import { theme } from "../stores/theme";

  let themeValue: Theme;
  theme.subscribe((value) => (themeValue = value));

  // Create a LogoSvg component and get the markup from it
  // Allows us to use the theme color in the SVG
  // This seems dirty, but TODO a nicer way
  const getSvgMarkup = (component, themeValue) => {
    const elem = document.createElement("div");
    const x = new component({
      target: elem,
      props: { themeColor: themeValue.textBrand },
    });
    const svg = elem.querySelector("svg");
    const markup = svg?.outerHTML ?? "";
    return markup;
  };

  $: svgMarkup = getSvgMarkup(logo, themeValue);
  $: imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgMarkup
  )}`;
</script>

<div class="flex items-end gap-1">
  <img alt="BrowserBurn logo" class="w-9 h-9" src={imageUrl} />
  <h1 class="text-lg font-bold leading-6" style:color={themeValue.textBrand}>
    BrowserBurn
  </h1>
</div>
