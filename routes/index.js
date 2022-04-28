let express = require("express");
let router = express.Router();
const socketio = require("socket.io");
// let io = socket.io();

let roomID = "Bitcoin";
router.get(`/${roomID}`, function (req, res, next) {
  res.render("index");
});

module.exports = router;
