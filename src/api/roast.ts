import { API_URL, STREAM_API_URL, HISTORY_HOURS } from "../constants/api";
import { error, isLoading, isStreaming, roast } from "../stores/api";

export const getRoast = async () => {
  console.debug("Fetching history...");
  const startTime = new Date(
    Date.now() - HISTORY_HOURS * 60 * 60 * 1000
  ).getTime();
  const endTime = Date.now();

  chrome.history.search(
    { text: "", startTime, endTime, maxResults: 50 },
    onHistoryResults
  );
};

const onHistoryResults = async (history: chrome.history.HistoryItem[]) => {
  try {
    isLoading.set(true);
    roast.set(
      await roastHistory(
        history.filter((h) => h.title !== "New Tab - BrowserBurn")
      )
    );
  } catch (e) {
    console.error(e);
    error.set("Oops, something went wrong. Please try again later.");
  } finally {
    isLoading.set(false);
    isStreaming.set(false);
  }
};

const roastHistory = async (
  history: chrome.history.HistoryItem[]
): Promise<string> => {
  const historyLines = history
    .map((h: chrome.history.HistoryItem) => h.title)
    .join("\n");
  console.debug(historyLines);

  try {
    return await streamRoast(historyLines);
  } catch (e) {
    console.warn("Stream failed, falling back to buffered endpoint", e);
    isStreaming.set(false);
    return await bufferedRoast(historyLines);
  }
};

const streamRoast = async (historyLines: string): Promise<string> => {
  const response = await fetch(STREAM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      historyLines,
    }),
  });

  if (!response.ok || !response.body) {
    console.error(await response.text());
    throw new Error(`Stream API error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    if (text.length > 0) {
      isLoading.set(false);
      isStreaming.set(true);
      roast.set(text);
    }
  }
  text += decoder.decode();

  if (!text) {
    throw new Error("Stream returned no content");
  }
  console.debug(text);

  return text;
};

const bufferedRoast = async (historyLines: string): Promise<string> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      historyLines,
    }),
  });

  if (response.ok) {
    const json = await response.json();
    const roast = json.data;
    console.debug(roast);

    return roast;
  } else {
    console.error(await response.text());
    throw new Error("An error occurred while calling the API.");
  }
};
