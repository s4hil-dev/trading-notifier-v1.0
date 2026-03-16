import PQueue from "p-queue";
import { sendMessage } from "../tests/whatsapp-test/sendMessage.js";

const alertQueue = new PQueue({
  concurrency: 1,        // send one message at a time
  intervalCap: 20,       // max messages
  interval: 1000         // per second
});

export function queueAlert(message) {
  alertQueue.add(() => sendMessage(message));
}