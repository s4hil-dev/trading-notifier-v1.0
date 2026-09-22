import { fno } from "./data/fno.js";
import { nifty500 } from "./data/nifty500.js";
import { screen } from "./data/screen.js";

export const TIMEFRAME = 15;   // change to 15 later

// Change this value to choose the symbols the notifier monitors.
export const ACTIVE_LIST = "screen"; // Options: "fno", "nifty500", "screen"

const symbolLists = {
  fno,
  nifty500,
  screen
};

export const stocks = symbolLists[ACTIVE_LIST];

if (!stocks) {
  throw new Error(`Unknown ACTIVE_LIST: ${ACTIVE_LIST}`);
}
