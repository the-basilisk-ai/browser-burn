<script lang="ts">
  import { display24HClock } from "../stores/clock";
  import { theme } from "../stores/theme";
  import { onMount } from "svelte";

  theme.subscribe((value) => (themeValue = value));
  $: themeValue = $theme;
  display24HClock.subscribe((value) => (display24HClockValue = value));
  $: display24HClockValue = $display24HClock;

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);

  let date = new Date();
  $: hours = display24HClockValue
    ? padZero(date.getHours())
    : date.getHours() % 12 || 12;
  $: minutes = padZero(date.getMinutes());

  let interval: number;
  onMount(() => {
    interval = setInterval(() => {
      date = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });

  let initClock = display24HClock.restore();
</script>

{#await initClock then}
  <div class="text-[2.625rem] font-bold" style:color={themeValue.textBrand}>
    {hours}:{minutes}
  </div>
{/await}
