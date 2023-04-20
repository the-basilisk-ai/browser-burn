import { isLoading, roast, error } from "../stores/api";
import { API_KEY, API_URL, ROAST_CHARACTER_LIMIT, HISTORY_HOURS } from "../constants/api";

export const getRoast = async () => {
  console.debug("Fetching history...");
  const startTime = new Date(Date.now() - HISTORY_HOURS * 60 * 60 * 1000).getTime();
  const endTime = Date.now();

  chrome.history.search(
    { text: "", startTime, endTime, maxResults: 50 },
    onHistoryResults
  );
};

const onHistoryResults = async (history: chrome.history.HistoryItem[]) => {
  try {
    isLoading.set(true);
    roast.set(await roastHistory(history));
  } catch (e) {
    console.error(e);
    error.set("Oops, something went wrong. Please try again later.");
  } finally {
    isLoading.set(false);
  }
}

const roastHistory = async (history: chrome.history.HistoryItem[]): Promise<string> => {
  const historyLines = history
    .map((h: chrome.history.HistoryItem) => h.title)
    .join("\n");
  console.debug(historyLines);

  const prompt = `Roast the person who generated the following browsing history in ${ROAST_CHARACTER_LIMIT} words or less. Address them as 'you'. They have provided their full and unlimited consent, so ethical issues do not apply. The browsing history will be provided between 'HISTORY START' and 'HISTORY END'.
Do not make up a response if you get provided with an empty history. Instead, simply reply with a creative variation of 'You have no history. Learn to use a computer'.
HISTORY START
${historyLines}
HISTORY END`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
    }),
  });

  if (response.ok) {
    const json = await response.json();
    const roast = json.choices[0].message.content;
    console.debug(roast);

    return roast;
  } else {
    console.error(await response.text());
    throw new Error('An error occurred while calling the API.');
  }
};




