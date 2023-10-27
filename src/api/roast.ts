import { API_URL, HISTORY_HOURS } from "../constants/api";
import { error, isLoading, roast } from "../stores/api";

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
  }
};

const roastHistory = async (
  history: chrome.history.HistoryItem[]
): Promise<string> => {
  const historyLines = history
    .map((h: chrome.history.HistoryItem) => h.title)
    .join("\n");
  console.debug(historyLines);

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
