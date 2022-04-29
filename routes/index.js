let express = require("express");
let router = express.Router();

let roomID = "Bitcoin";
router.get(`/${roomID}`, function (req, res, next) {
  res.render("index");
});

module.exports = router;
