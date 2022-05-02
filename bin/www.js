let app = require("../server");
let debug = require("debug")("real-time-web-2122:server");
let http = require("http");
let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
let server = http.createServer(app);
const { Server } = require("socket.io");
const chatio = new Server(server);
let count = 0;

// chat app connection (my server user connection)
chatio.on("connection", (socket) => {
  // rooms
  console.log(chatio.sockets.adapter.rooms);
  count++;
  chatio.emit("userCount", count);
  socket.on("username", (name) => {
    chatio.emit("username", name);
    console.log(name + " connected to room");
  });

  socket.on("disconnect", () => {
    count--;
    chatio.emit("userCount", count);
    console.log("a user disconnected :(");
  });

  socket.on("chat message", (msg) => {
    chatio.emit("chat message", msg);
  });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
