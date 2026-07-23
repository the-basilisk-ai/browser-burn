<script lang="ts">
  export let text: string;
  export let streaming = false;
</script>

<h2 class="font-serif font-medium text-2xl">
  {text}{#if streaming}<span class="cursor" aria-hidden="true" />{/if}
</h2>

<style>
  .font-serif {
    font-family: "Cormorant Garamond", serif;
  }

  .cursor {
    display: inline-block;
    width: 0.45em;
    height: 1em;
    margin-left: 0.1em;
    vertical-align: text-bottom;
    background-color: currentColor;
    animation: blink 1s steps(2, start) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cursor {
      animation: none;
    }
  }
</style>
