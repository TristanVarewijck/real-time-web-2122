let { wsTrades, wsPrices } = require("../modules/websocketClients.js");
let { pricesCleaning, tradesCleaning } = require("../modules/dataCleaning.js");
var express = require("express");
var router = express.Router();

let roomID = "Bitcoin";
console.log("hoi");
router.get(`/${roomID}`, function (req, res, next) {
  wsPrices.onopen = (event) => {
    console.log("connected to prices server");
  };
  // live-stream prices on "/"
  wsPrices.onmessage = (event) => {
    let data = pricesCleaning(JSON.parse(event.data));
    console.log(data);
  };

  wsTrades.onopen = (event) => {
    console.log("connected to trades server");
  };

  // live-stream trades on "/"
  wsTrades.onmessage = (event) => {
    let data = tradesCleaning(JSON.parse(event.data));
    console.log(data);
    // console.log(event.data);
  };
  res.render("index");
});

module.exports = router;
