var express = require("express");
var router = express.Router();
// let wsPrices = new WebSocket("wss://stream.binance.com:9443/ws/etheur@ticker");
// c = current price
// end point for ethereum trades
// let wsTrades = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = router;
