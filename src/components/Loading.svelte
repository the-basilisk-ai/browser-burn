<script lang="ts">
  export let message: string;
</script>

<h3 class="text-blue-200 mb-3 -mt-6">
  {message}
</h3>
<div class="px-3 max-w-4xl w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-blue-200" />
      <div class="grid grid-cols-3 gap-4">
        <div class="h-2 bg-blue-200 col-span-2" />
        <div class="h-2 bg-blue-200 col-span-1" />
      </div>
      <div class="h-2 bg-blue-200" />
      <div class="h-2 bg-blue-200" />
      <div class="grid grid-cols-5 gap-4">
        <div class="h-2 bg-blue-200 col-span-2" />
        <div class="h-2 bg-blue-200 col-span-3" />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="h-2 bg-blue-200 col-span-1" />
      </div>
    </div>
  </div>
</div>
