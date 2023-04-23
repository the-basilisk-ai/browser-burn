<script lang="ts">
  import { theme } from "../stores/theme";
  import { onMount } from "svelte";

  export let use24h: boolean = false;

  theme.subscribe((value) => (themeValue = value));
  $: themeValue = $theme;

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);

  let date = new Date();
  $: hours = use24h ? padZero(date.getHours()) : date.getHours() % 12 || 12;
  $: minutes = padZero(date.getMinutes());

  let interval: number;
  onMount(() => {
    interval = setInterval(() => {
      date = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="text-[2.625rem] font-bold" style:color={themeValue.textBrand}>
  {hours}:{minutes}
</div>
