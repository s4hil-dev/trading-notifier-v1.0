import cron from "node-cron";
import { sendMessage } from "./sendMessage.js";

console.log("Bot started...");

cron.schedule("* * * * *", async () => {

  const time = new Date().toLocaleTimeString();

  const msg = `🚀 RELIANCE: Bullish MACD Cross\nTime: ${time}`;

  await sendMessage(msg);

});