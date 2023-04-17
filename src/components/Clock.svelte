<script lang="ts">
  import type { Theme } from "../constants/theme";
  import { theme } from "../stores/theme";
  import { onMount, onDestroy } from "svelte";

  export let use24h: boolean = false;

  let themeValue: Theme;
  theme.subscribe((value) => (themeValue = value));

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);

  let date = new Date();
  $: hours = use24h ? padZero(date.getHours()) : date.getHours() % 12 || 12;
  $: minutes = padZero(date.getMinutes());

  let interval: number;
  onMount(() => {
    interval = setInterval(() => {
      date = new Date();
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="text-[2.625rem] font-bold" style:color={themeValue.textBrand}>
  {hours}:{minutes}
</div>
