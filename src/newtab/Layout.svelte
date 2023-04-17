<script>
  import "@fontsource/inter/400.css";
  import "@fontsource/inter/600.css";
  import "@fontsource/cormorant-garamond/latin-500.css";
  import Logo from "../components/Logo.svelte";
  import Clock from "../components/Clock.svelte";
  import Roast from "../components/Roast.svelte";
  import ShareOnTwitter from "../components/ShareOnTwitter.svelte";
  import PoweredBy from "../components/PoweredBy.svelte";
</script>

<div
  class="flex flex-col items-center min-h-screen"
  style="background: linear-gradient(90deg, #FDFCCE 0%, #CFEBFC 100%);"
>
  <div
    class="flex flex-col items-center w-full max-w-screen-2xl min-h-screen bg-gradient text-zinc-800"
  >
    <div class="flex w-full justify-between items-center pt-4 px-6">
      <Logo />
      <Clock />
    </div>
    <div class="flex flex-col grow items-center h-full gap-8 pt-14">
      <Roast />
      <ShareOnTwitter />
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
