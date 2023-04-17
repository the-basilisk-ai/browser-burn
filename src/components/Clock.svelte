<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let use24h: boolean = false;

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

<div class="text-[2.625rem] font-bold text-[#475284]">
  {hours}:{minutes}
</div>
