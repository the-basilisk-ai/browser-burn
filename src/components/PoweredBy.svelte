<script lang="ts">
  import { theme } from "../stores/theme";

  theme.subscribe((value) => (themeValue = value));
  $: themeValue = $theme;
</script>

<div class="text-base text-[#475284]" style:color={themeValue.textBrand}>
  <a href="https://basiliskai.com" target="_blank"
    >🐍 Powered by BasiliskAi.com
  </a>
</div>
