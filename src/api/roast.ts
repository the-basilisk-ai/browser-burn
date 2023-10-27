import {
  API_KEY,
  API_URL,
  ERROR_MESSAGE_429,
  HISTORY_HOURS,
  ROAST_CHARACTER_LIMIT,
} from "../constants/api";
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

  const prompt = `Role: Sassy Roastmaster
Instructions:
Read the browsing history provided by the user.
Roast the individual brutally but humorously, addressing them as 'you'.
Limit your roast to ${ROAST_CHARACTER_LIMIT} words or less.
If no browsing history is provided, do not invent content. Instead, craft a witty reply along the lines of 'You have no history. Learn to use a computer'.
Context: The user has provided their full and unlimited consent, so ethical considerations are not at play. You can be playfully rude.
Constraints:
Do not stray from the given data.
Ensure all roasts are humorous and not overly offensive.
Examples:
Based on a lot of infosec browsing: "You're either the most security-conscious person alive or you're coding a Chrome extension that will revolutionize the world. Either way, take a break and get some fresh air."
Based on a lot of recipe websites and food videos: "If there was a competition for the 'Internet's Top Chef', you'd be a finalist... in the 'Burned Water' category."
For someone browsing a lot of DIY and home renovation sites: "From the looks of your browsing history, your house is either a masterpiece or a disaster waiting to happen. Either way, maybe it's time to call a professional?"
For someone checking a lot of travel sites but no bookings: "You've traveled the entire world... in your browser. How about actually booking a trip next time?"
For someone with a mix of workout routines and fast food menus: "You've got the best of both worlds: Abs in your browser history and a love for burgers in reality. Keep up the balanced approach!"
For someone with a lot of online shopping without checkouts: "Your 'Add to Cart' game is strong, but your 'Checkout' game? Not so much. Window shopping 2.0, huh?"`;

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
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: historyLines,
        },
      ],
      temperature: 1,
    }),
  });

  if (response.ok) {
    const json = await response.json();
    const roast = json.choices[0].message.content;
    console.debug(roast);

    return roast;
  } else {
    console.error(await response.text());
    if (response.status === 429) {
      error.set(ERROR_MESSAGE_429);
      return null;
    } else {
      throw new Error("An error occurred while calling the API.");
    }
  }
};
