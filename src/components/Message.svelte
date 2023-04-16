<script lang="ts">
  import clsx from "clsx";
  export let text: string;
  export let isError: boolean = false;

  const colorClass = isError ? "text-red-500" : "text-blue-200";
</script>

<h2
  class={clsx(
    "font-bold text-4xl md:text-xl text-justify lg:text-lg px-3 max-w-4xl",
    colorClass
  )}
>
  {text}
</h2>
