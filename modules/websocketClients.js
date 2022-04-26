const WebSocket = require("ws");

// live streams
let wsPrices = new WebSocket(
  "wss://stream.binance.com:9443/ws/etheur@miniTicker"
);
let wsTrades = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");

module.exports = { wsTrades, wsPrices };
