<script lang="ts">
  import type { Theme } from "../constants/theme";
  import { theme } from "../stores/theme";

  let themeValue: Theme;
  theme.subscribe((value) => (themeValue = value));
</script>

<div class="text-base text-[#475284]" style:color={themeValue.textBrand}>
  <a href="https://basiliskai.com" target="_blank"
    >🐍 Powered by BasiliskAi.com
  </a>
</div>
