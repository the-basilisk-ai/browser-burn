# BrowserBurn Chrome Extension

Replaces your new tab page with spicy roasts based on your recent browsing history - a unique and fun way to browse every day!

Ever thought your browsing history could have a sense of humor? Let's put that to the test!

How it works:
With just a couple of clicks, install the extension and you're all set to get roasted in a new tab! BrowserBurn uses advanced AI to analyze your recent browsing history and roasts you based on the websites you've visited. Our AI isn't just any ordinary algorithm; it's been trained on a variety of humorous datasets to ensure each roast is unique and chuckle-worthy. It's like having a virtual friend who knows all your internet secrets and isn't afraid to make fun of you.

You can download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/blfljajdpgoiehkmnphfikofampdiijm).

## Getting started with local development

- Install dependencies `npm install`
- Start the dev server `npm run dev`
- Visit the Extensions page in your browser, click Load Unpacked, and choose the `dist` directory

## Build and deploy a local version

Note that any code changes you make will not be automatically applied when installing the extension this way. But, it does mean you don't have to run the dev server.

- Install dependencies `npm install`
- Build the application `npm run build`
- Visit the Extensions page in your browser, remove any existing version, click Load Unpacked, and choose the `dist` directory

## Recommended IDE Setup

This extension is built using [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin) and [Svelte](https://svelte.dev/).

We recommend [VS Code](https://code.visualstudio.com/) + [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
