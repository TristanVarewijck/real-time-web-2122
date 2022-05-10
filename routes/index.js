let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
  res.redirect("/room?id=btc");
});

router.get("/room", function (req, res, next) {
  res.render("index");
});

module.exports = router;
