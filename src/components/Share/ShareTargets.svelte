<script lang="ts">
  import * as htmlToImage from "html-to-image";
  import type { Options } from "html-to-image/lib/types";
  import ShareTargetSvg from "./ShareTargetSvg.svelte";
  import ShareTarget from "./ShareTarget.svelte";

  export let shareCardElement: HTMLElement;

  let copyButtonText = "Copy";

  const exportImage = async <TNode extends HTMLElement, TResult>(
    exportToType: (node: TNode, options?: Options) => Promise<TResult>
  ): Promise<TResult | null> => {
    try {
      // Clone the element
      const elementCopy = shareCardElement.cloneNode(true) as TNode;
      // Restyle it ✨
      elementCopy.style.width = "600px";
      elementCopy.style.height = "335px";
      elementCopy.style.borderWidth = "0";
      elementCopy.style.borderRadius = "0";
      // Render it under the page for the screenshot - it must be in the DOM for this to work
      elementCopy.style.position = "absolute";
      elementCopy.style.top = "0px";
      elementCopy.style.left = "0px";
      elementCopy.style.zIndex = "-1";

      document.body.appendChild(elementCopy);
      const exported = await exportToType(elementCopy);
      elementCopy.remove();
      return exported;
    } catch (e) {
      console.error("Something went wrong during image export", e);
      return null;
    }
  };

  const onDownloadClick = async () => {
    const dataUrl = await exportImage(htmlToImage.toPng);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "browserburn.png";
    link.click();
    link.remove();
  };

  const onCopyClick = async () => {
    const blob = await exportImage(htmlToImage.toBlob);

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    copyButtonText = "Copied!";
    setTimeout(() => {
      copyButtonText = "Copy";
    }, 2000);
  };
</script>

<div class="flex flex-wrap gap-6 justify-center">
  <ShareTarget name={copyButtonText} onClick={onCopyClick}>
    <ShareTargetSvg className="w-3.5" viewBox="0 0 512 512">
      <path
        d="M512 384H192V0H416l96 96V384zM48 128H160v48H48V464H272V416h48v48 48H272 48 0V464 176 128H48z"
      />
    </ShareTargetSvg>
  </ShareTarget>

  <ShareTarget name="Download" onClick={onDownloadClick}>
    <ShareTargetSvg className="w-3" viewBox="0 0 448 512">
      <path
        d="M246.6 342.6L224 365.3l-22.6-22.6-128-128L50.7 192 96 146.7l22.6 22.6L192 242.7V32 0h64V32 242.7l73.4-73.4L352 146.7 397.3 192l-22.6 22.6-128 128zM64 352v96H384V352 320h64v32V480v32H416 32 0V480 352 320H64v32z"
      />
    </ShareTargetSvg>
  </ShareTarget>
</div>
