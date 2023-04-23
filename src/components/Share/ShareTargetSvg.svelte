<script lang="ts">
  export let className: string = "w-4";
  export let viewBox: string = "0 0 24 24";
</script>

<svg class={className} xmlns="http://www.w3.org/2000/svg" {viewBox}>
  <slot />
</svg>
