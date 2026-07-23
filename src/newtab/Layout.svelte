<script lang="ts">
  import { theme } from "../stores/theme";
  import { background, pageBackground } from "../stores/background";
  import Logo from "../components/Logo.svelte";
  import Clock from "../components/Clock.svelte";
  import Roast from "../components/Roast.svelte";
  import ShareCard from "../components/Share/ShareCard.svelte";
  import BuyMeACoffee from "../components/BuyMeACoffee.svelte";
  import Navigation from "../components/Navigation/Navigation.svelte";

  let themeInit = Promise.all([theme.restore(), background.restore()]);
</script>

{#await themeInit then}
  <div
    class="flex flex-col items-center min-h-screen page-background"
    style:background-color={$pageBackground}
  >
    <div
      class="flex flex-col items-center w-full max-w-screen-2xl min-h-screen bg-gradient text-zinc-800"
    >
      <div class="flex w-full justify-between items-center pt-4 px-6">
        <Logo />
        <Clock />
      </div>

      <div
        class="flex flex-col grow h-full w-full gap-8 items-center justify-center"
      >
        <Roast />
        <ShareCard />
      </div>

      <div class="flex items-center w-full px-6 pb-6">
        <BuyMeACoffee />
        <Navigation className="flex grow justify-end" />
      </div>
    </div>
  </div>
{/await}

<style>
  :global(body) {
    font-family: "Inter", sans-serif;
  }

  .page-background {
    transition: background-color 300ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .page-background {
      transition: none;
    }
  }
</style>
