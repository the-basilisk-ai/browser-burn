# BrowserBurn

> Built and maintained by the team at **[Squad](https://meetsquad.ai)**, the product management harness for AI — decision intelligence for teams building software. BrowserBurn is one of the products we *dogfood* on: we plan, build, and ship it with Squad, so every roast is also a real-world test of how we make product decisions. The insults are free. The lessons aren't.

**Your browsing history has opinions about you. Now it shares them.**

BrowserBurn replaces your new tab with a personalised roast of your recent browsing. Install it, open a new tab, get roasted. Each burn is written live from your recent page titles and types itself out while you watch. No account, no setup, no mercy.

> "You refreshed your own pull request like it was a dating app, hoping someone finally approves of you. At least the AI thinks you're worth talking to."

**[Install from the Chrome Web Store →](https://chromewebstore.google.com/detail/blfljajdpgoiehkmnphfikofampdiijm)**

## Features

- **Live roasts** — written on the spot, right on your new tab page, typed out one keystroke at a time.
- **Share cards** — for when the burn is too good to keep to yourself.
- **Make it yours** — light, dark, or system theme; pick a background colour or bring your own.
- **Private by design** — only your recent page titles are used to write the roast. Nothing stored, nothing sold.
- **No sign-up. Ever.**

## Why this repo exists

BrowserBurn is a real, shipping product — and it's also our sandbox. We build it the same way we build everything at Squad, so it doubles as a proving ground for our own tools and process. If you're curious how Squad approaches product development, this is one place you can watch it happen in the open.

## Tech stack

Built with [Svelte](https://svelte.dev/) and bundled as a Manifest V3 extension using [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin) on top of [Vite](https://vitejs.dev/), styled with [Tailwind CSS](https://tailwindcss.com/) and written in TypeScript.

## Local development

```bash
npm install     # install dependencies
npm run dev     # start the Vite dev server
```

Then open your browser's Extensions page, enable Developer mode, click **Load unpacked**, and select the `dist` directory. Changes reload automatically while the dev server is running.

## Building a standalone version

Prefer to run the extension without the dev server? Build it once and load the output. Note that code changes won't hot-reload — you'll need to rebuild and reload the extension to see them.

```bash
npm install     # install dependencies
npm run build   # produce a production build in dist/
```

Open the Extensions page, remove any existing BrowserBurn install, click **Load unpacked**, and select the `dist` directory.

## Type checking

```bash
npm run check   # run svelte-check against the project
```

## Recommended editor setup

We recommend [VS Code](https://code.visualstudio.com/) with the [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Support us

BrowserBurn is free, no sign-up, no ads. But every roast is written live by an AI, and the AI does not work for free. One coffee covers roughly a thousand roasts.

**[Buy us a coffee →](https://buymeacoffee.com/browserburn)**

Questions or problems? [hello@meetsquad.ai](mailto:hello@meetsquad.ai) (mention BrowserBurn).

## License

[MIT](./LICENSE)

---

*Sincerely, your browsing history.*
