let app = require("../server");
let debug = require("debug")("real-time-web-2122:server");
let http = require("http");
let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
let server = http.createServer(app);
const { Server } = require("socket.io");
const chatio = new Server(server);
// array with all users
const users = [];

chatio.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    // push user to a global users array with different rooms connected to it
    const user = {
      id: socket.id,
      room: room,
    };

    socket.join(user.room);
    chatio.to(user.room).emit("userID", user.id);

    // send the users inside this room to the client
    let roomUsers = users.filter((user) => user.room === room);
    chatio.to(user.room).emit("userCount", roomUsers.length);

    socket.on("username", (name) => {
      user.username = name;
      users.push(user);

      chatio.to(user.room).emit("username", name);

      roomUsers = users.filter((user) => user.room === room);
      chatio.to(user.room).emit("userCount", roomUsers.length, roomUsers);
    });

    if (user?.username !== undefined) {
      console.log("myname", user.username);
    }

    // handle the chat messages
    socket.on("chat message", (msg) => {
      chatio.to(room).emit("chat message", msg, user);
    });
  });

  socket.on("disconnect", () => {
    // filter out the user that is leaving
    const user = userLeave(socket.id);
    function userLeave(id) {
      const index = users.findIndex((user) => user.id === id);
      // remove this user from the users array and replace it with nothing
      if (index !== -1) {
        return users.splice(index, 1)[0];
      }
    }

    if (user?.username !== undefined) {
      chatio.to(user.room).emit("user-left", user);
      let roomUsers = users.filter((item) => item.room === user.room);
      chatio.to(user.room).emit("userCount", roomUsers.length, roomUsers);
    } else if (user) {
      let roomUsers = users.filter((item) => item.room === user.room);
      chatio.to(user.room).emit("userCount", roomUsers.length, roomUsers);
    }
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
