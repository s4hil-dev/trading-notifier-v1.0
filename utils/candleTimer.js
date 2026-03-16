// import { TIMEFRAME } from "../config.js";

// export function getNextRun() {

//   const now = new Date();

//   const next = new Date(now);

//   next.setSeconds(2);
//   next.setMilliseconds(0);

//   const startMinutes = 15;   // 9:15 grid
//   const interval = TIMEFRAME;       // 15 min candles

//   const minutes = now.getMinutes();

//   const blocks = Math.ceil((minutes - startMinutes) / interval);

//   const nextMinute = startMinutes + blocks * interval;

//   next.setMinutes(nextMinute);

//   if (next <= now) next.setMinutes(next.getMinutes() + interval);

//   const delay = next - now;

//   console.log("Current Time:", now.toLocaleTimeString());
//   console.log("Next Run Time:", next.toLocaleTimeString());
//   console.log("Delay:", delay);

//   return delay;
// }


// MARKET GUARDED

import { TIMEFRAME } from "../config.js";

export function getNextRun() {

  const now = new Date();
  const next = new Date(now);

  const marketOpen = new Date(now);
  marketOpen.setHours(9, 15, 0, 0);

  const marketClose = new Date(now);
  marketClose.setHours(15, 30, 0, 0);

  // Before market open
  if (now < marketOpen) {
    console.log("Waiting for market open");
    return marketOpen - now;
  }

  // After market close
  if (now >= marketClose) {
    const tomorrowOpen = new Date(marketOpen);
    tomorrowOpen.setDate(tomorrowOpen.getDate() + 1);

    console.log("Market closed, scheduling tomorrow");
    return tomorrowOpen - now;
  }

  next.setSeconds(2);
  next.setMilliseconds(0);

  const startMinutes = 15;
  const interval = TIMEFRAME;

  const minutes = now.getMinutes();

  const blocks = Math.ceil((minutes - startMinutes) / interval);
  const nextMinute = startMinutes + blocks * interval;

  next.setMinutes(nextMinute);

  if (next <= now) next.setMinutes(next.getMinutes() + interval);

  const delay = next - now;

  console.log("Current Time:", now.toLocaleTimeString());
  console.log("Next Run:", next.toLocaleTimeString());

  return delay;
}