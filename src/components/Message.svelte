<script lang="ts">
  import clsx from "clsx";
  export let text: string;
  export let isError: boolean = false;

  const colorClass = isError ? "text-red-500" : "text-blue-200";
</script>

<h2 class={clsx("font-serif font-medium text-zinc-900 text-2xl", colorClass)}>
  {text}
</h2>

<style>
  .font-serif {
    font-family: "Cormorant Garamond", serif;
  }
</style>
