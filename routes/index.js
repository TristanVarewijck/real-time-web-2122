let express = require("express");
let router = express.Router();
const fs = require("fs");
const axios = require("axios").default;
const { cryptoSymbol } = require("crypto-symbol");
const { nameLookup } = cryptoSymbol({});
require("dotenv").config();

// DATABASE
// connection string
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@binancechatcluster.szvgg.mongodb.net/?retryWrites=true&w=majority`;

// settings
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("test");
    const col = db.collection("coins");

    let personDocument = {
      name: { first: "Alan", last: "Turing" },
      birth: new Date(1912, 5, 23), // May 23, 1912
      death: new Date(1954, 5, 7), // May 7, 1954
      contribs: ["Turing machine", "Turing test", "Turingery"],
      views: 1250000,
    };

    await col.insertOne(personDocument);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

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
