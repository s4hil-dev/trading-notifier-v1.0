import mongoose from "mongoose";

const indicatorSchema = new mongoose.Schema({

  symbol: { type: String, unique: true },

  ema12: Number,
  ema26: Number,

  macdQueue: {
    type: [Number],
    default: []
  },

  lastCandleTime: Date

});

export default mongoose.model("Indicator", indicatorSchema);