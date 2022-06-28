let express = require("express");
let router = express.Router();
const fs = require("fs");
const axios = require("axios").default;

const { cryptoSymbol } = require("crypto-symbol");
const { nameLookup } = cryptoSymbol({});

router.get("/", function (req, res, next) {
  res.redirect("/room?id=btc");
});

router.get("/room", function (req, res, next) {
  axios
    .get("https://api.binance.com/api/v3/exchangeInfo")
    .then(function (response) {
      const symbols = response.data.symbols;

      let assets = [];
      symbols.forEach((symbol) => {
        assets.push(symbol.baseAsset);
      });

      let uniqueAssets = [...new Set(assets)].sort();
      let dataSet = [];
      uniqueAssets.forEach((asset) => {
        let fullName = nameLookup(`   ${asset}   `);
        if (fullName) {
          dataSet.push({ id: asset, fullName: fullName });
        }
      });

      // insert new-data in database
      fs.writeFile("public/coins.json", JSON.stringify(dataSet), function (
        err
      ) {
        if (err) throw err;
        console.log("complete");
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  res.render("index");
});

module.exports = router;
