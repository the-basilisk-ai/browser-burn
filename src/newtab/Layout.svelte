<script lang="ts">
  import "@fontsource/inter/400.css";
  import "@fontsource/inter/600.css";
  import "@fontsource/cormorant-garamond/latin-500.css";
  import { onMount, onDestroy } from "svelte";

  import { DARK_MODE, LIGHT_MODE, type Theme } from "../constants/theme";

  import { theme } from "../stores/theme";
  import { roast, isLoading } from "../stores/api";

  import Logo from "../components/Logo.svelte";
  import Clock from "../components/Clock.svelte";
  import Roast from "../components/Roast.svelte";
  import ShareCard from "../components/ShareCard.svelte";
  import PoweredBy from "../components/PoweredBy.svelte";

  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = (e: MediaQueryList | MediaQueryListEvent) => {
    theme.set(e.matches ? DARK_MODE : LIGHT_MODE);
  };
  // Set theme, set up change listener, and clean up listener on destroy
  handleThemeChange(darkModeQuery);
  onMount(() => darkModeQuery.addEventListener("change", handleThemeChange));
  onDestroy(() =>
    darkModeQuery.removeEventListener("change", handleThemeChange)
  );

  let themeValue: Theme;
  let isLoadingValue: boolean;
  theme.subscribe((value) => (themeValue = value));
  isLoading.subscribe((value) => (isLoadingValue = value));
</script>

<div
  class="flex flex-col items-center min-h-screen"
  style={`background: linear-gradient(90deg, ${themeValue.bgGradientFrom} 0%, ${themeValue.bgGradientTo} 100%);`}
>
  <div
    class="flex flex-col items-center w-full max-w-screen-2xl min-h-screen bg-gradient text-zinc-800"
  >
    <div class="flex w-full justify-between items-center pt-4 px-6">
      <Logo />
      <Clock />
    </div>

    <div class="flex flex-col grow items-center h-full w-full gap-8 pt-14">
      <Roast />
      <ShareCard isLoading={isLoadingValue} />
    </div>
    <div class="self-start px-6 pb-6">
      <PoweredBy />
    </div>
  </div>
</div>

<style>
  :global(body) {
    font-family: "Inter", sans-serif;
  }
</style>
