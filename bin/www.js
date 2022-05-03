let app = require("../server");
let debug = require("debug")("real-time-web-2122:server");
let http = require("http");
let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
let server = http.createServer(app);
const { Server } = require("socket.io");
const chatio = new Server(server);
let users = [];

chatio.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    // push user to a global users array with different rooms connected to it
    const user = {
      id: socket.id,
      room: room,
    };
    users.push(user);
    // make the socket join the room with the attached room name (from url)
    socket.join(user.room);

    // filter the user in the current room
    // send the users inside this room to the client
    let roomUsers = users.filter((user) => user.room === room);
    chatio.to(user.room).emit("userCount", roomUsers.length);

    // listening to username
    socket.on("username", (name) => {
      chatio.to(room).emit("username", name);
      console.log(name + " connected to room");
    });

    // handle the chat messages
    socket.on("chat message", (msg) => {
      chatio.to(room).emit("chat message", msg);
    });
  });

  socket.on("disconnect", (room) => {
    // socket.leave(room);

    // const user = userLeave(socket.id);

    // if (user) {
    //   chatio.to(user.room).emit("username", "left the room");
    // }

    // count--;
    // chatio.emit("userCount", count);
    console.log("a user disconnected :(");
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
