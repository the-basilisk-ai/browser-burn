<script lang="ts">
  import { theme } from "../stores/theme";

  export let message: string;

  $: bgLoading = $theme.bgLoading;
</script>

<div role="status" class="space-y-3 animate-pulse">
  <div class="flex items-center w-full space-x-2">
    <div
      class="h-4 rounded-full w-32"
      style:background-color={bgLoading.light}
    />
    <div
      class="h-4 rounded-full w-24"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
  </div>
  <div class="flex items-center w-full space-x-2">
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.light}
    />
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-24"
      style:background-color={bgLoading.dark}
    />
  </div>
  <div class="flex items-center w-full space-x-2">
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-80"
      style:background-color={bgLoading.light}
    />
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
  </div>
  <!-- <div class="flex items-center w-full space-x-2">
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.light}
    />
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-24"
      style:background-color={bgLoading.dark}
    />
  </div> -->
  <!-- <div class="flex items-center w-full space-x-2">
    <div
      class="h-4 rounded-full w-32"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-24"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.light}
    />
  </div>
  <div class="flex items-center w-full space-x-2">
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
    <div
      class="h-4 rounded-full w-80"
      style:background-color={bgLoading.light}
    />
    <div
      class="h-4 rounded-full w-full"
      style:background-color={bgLoading.dark}
    />
  </div> -->
  <span class="sr-only">Loading...</span>
</div>

<h3 class="font-bold mt-3.5">
  {message}
</h3>
