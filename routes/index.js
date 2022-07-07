let express = require("express");
let router = express.Router();
const fs = require("fs");
const axios = require("axios").default;
const { cryptoSymbol } = require("crypto-symbol");
const { nameLookup } = cryptoSymbol({});
require("dotenv").config();
// DATABASE
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@binancechatcluster.szvgg.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected correctly to server");
//     const db = client.db("binance");
//     const col = db.collection("coins");

//     // inserting a data set or singular items
//     // await col.insertMany(dataSet);

//     // find all items of singular items
//     let response = await col.find().toArray();

//     console.log(response);

//     // console.log(response);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);

router.get("/", function (req, res, next) {
  res.redirect("/room?id=btc");
});

router.get("/room", function (req, res, next) {
  res.render("index");
});

module.exports = router;
