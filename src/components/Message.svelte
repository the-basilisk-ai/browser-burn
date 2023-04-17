<script lang="ts">
  import type { Theme } from "../constants/theme";
  import { theme } from "../stores/theme";

  export let text: string;
</script>

<h2 class="font-serif font-medium text-2xl">
  {text}
</h2>

<style>
  .font-serif {
    font-family: "Cormorant Garamond", serif;
  }
</style>
