let express = require("express");
let router = express.Router();
// const { cryptoSymbol } = require("crypto-symbol");
// const { nameLookup } = cryptoSymbol({});
// const axios = require("axios").default;

router.get("/", function (req, res, next) {
  res.redirect("/room?id=btc");
});

router.get("/room", function (req, res, next) {
  // Make a request for a user with a given ID
  // let dataSet = [];
  // axios
  //   .get("https://api.binance.com/api/v3/exchangeInfo")
  //   .then(function (response) {
  //     const symbols = response.data.symbols;

  //     let assets = [];
  //     symbols.forEach((symbol) => {
  //       assets.push(symbol.baseAsset);
  //     });

  //     let uniqueAssets = [...new Set(assets)].sort();

  //     uniqueAssets.forEach((asset) => {
  //       let fullName = nameLookup(`   ${asset}   `);
  //       if (fullName) {
  //         dataSet.push({ id: asset, fullName: fullName });
  //       }
  //     });

  //     console.log(dataSet);
  //     res.render("index", { coins: dataSet });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // res.render("index", { coins: dataSet });

  res.render("index");
});

module.exports = router;
