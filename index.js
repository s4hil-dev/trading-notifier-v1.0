import mongoose from "mongoose";
import { stocks } from "./data/stocks.js";
import { bootstrap } from "./services/bootstrap.js";
import { startScheduler } from "./scheduler.js";

import 'dotenv/config'

await mongoose.connect(process.env.DB_URI);

console.log("DB connected");

for (const symbol of stocks) {

  await bootstrap(symbol);

}

startScheduler();