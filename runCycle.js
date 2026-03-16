import Indicator from "./models/indicatorModel.js";
import { fetchLastCandle } from "./services/fetchLastCandle.js";
import { updateMACD } from "./services/macdCalculator.js";
import { checkMACD } from "./services/strategy.js";
import { stocks } from "./data/stocks.js";
import 'dotenv/config';
import { TIMEFRAME } from "./config.js";
import { sendMessage } from "./tests/whatsapp-test/sendMessage.js";
import { queueAlert } from "./queues/alertQueue.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processSymbol(symbol) {

  try {

    const indicator = await Indicator.findOne({ symbol });

    const candle = await fetchLastCandle(symbol);

    const candleTime = new Date(candle[0] * 1000);

    console.log(candleTime);

    const close = candle[4];

    console.log(symbol, close);

    console.log("DB candle:", indicator.lastCandleTime.toLocaleString());
    console.log("API candle:", candleTime.toLocaleString());

    // skip if candle already processed
    if (indicator.lastCandleTime.getTime() === candleTime.getTime()) return;

    const { ema12, ema26, macd } = updateMACD(
      close,
      indicator.ema12,
      indicator.ema26
    );

    console.log({ ema12, ema26, macd });

    const queue = indicator.macdQueue;

    queue.push(macd);

    if (queue.length > 3) queue.shift();

    console.log("Queue:", queue);

    indicator.ema12 = ema12;
    indicator.ema26 = ema26;
    indicator.macdQueue = queue;
    indicator.lastCandleTime = candleTime;

    await indicator.save();

    // STRATEGY CHECK
    const signal = checkMACD(queue);

    if (signal) {

      console.log(`${signal} Signal:`, symbol);

      const indianTime = candleTime.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
      });

      const message =
      `📈 MACD Signal Alert

      Stock: ${symbol}
      Signal: ${signal}
      Timeframe: ${TIMEFRAME}
      Time: ${indianTime}`;

      try {
        await queueAlert(message);
      } catch (err) {
        console.log("WhatsApp error:", err.message);
      }
    }

  } catch (err) {

    console.log("Error processing:", symbol);
    console.log(err.response?.data || err.message || err);

  }
}

export async function runCycle() {

  for (const symbol of stocks) {

    try {
      await processSymbol(symbol);
    } catch (err) {
      console.log("Cycle error:", symbol);
    }

    // Rate limit protection
    await sleep(200);

  }

}