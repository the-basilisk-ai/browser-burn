<script lang="ts">
  import clsx from "clsx";
  import twitter from "../assets/twitter.svg";
  export let disabled: boolean = true;
</script>

<div class={clsx(disabled && "opacity-50 cursor-not-allowed")}>
  <a
    href="https://twitter.com/intent/tweet?text=I%20just%20got%20roasted%20by%20my%20browsing%20history%20on%20BrowserBurn!%20Check%20it%20out%20at%20https%3A%2F%2Fbasiliskai.com%2Fbrowserburn"
    target="_blank"
    class="flex items-center gap-2 px-9 py-3 rounded-xl bg-[#1D9BF0] text-white select-none"
    style:pointer-events={disabled ? "none" : "auto"}
  >
    <img alt="Twitter logo" class="w-5" src={twitter} />
    <span class="text-sm">Share on Twitter</span>
  </a>
</div>
