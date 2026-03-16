export function checkMACD(queue) {

  if (queue.length < 3) return null;

  const [m3, m2, m1] = queue;

  // Bullish: MACD crosses above 0
  if (m1 > 0 && m2 < 0 && m3 < 0) {
    return "🟢 BULLISH";
  }

  // Bearish: MACD crosses below 0
  if (m1 < 0 && m2 > 0 && m3 > 0) {
    return "🔴 BEARISH";
  }

return null;
}
