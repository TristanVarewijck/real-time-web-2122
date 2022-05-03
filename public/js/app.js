let socket = io();

// chatform
let chatForm = document.getElementById("chat-form");
let chatInput = document.getElementById("chat-input");
let chatMessages = document.getElementById("chat-messages");
let users = document.getElementById("userCount");

// username form
let chatOverlay = document.getElementById("chat-overlay");
let usernameForm = document.getElementById("user-form");
let userInput = document.getElementById("user-input");
let characterCounter = document.getElementById("chaCount");

// user input
usernameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  socket.emit("username", userInput.value);
  chatOverlay.remove();
  userInput.value = "";
});

userInput.addEventListener("keyup", () => {
  let maxCha = 16;
  let currentLength = userInput.value.length;
  if (currentLength >= maxCha) {
    userInput.value = userInput.value.substring(0, maxCha);
  } else {
    characterCounter.innerHTML = maxCha - currentLength - 1;
  }
});

// create rooms depending on the url
const { room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", room);

// catch the username
socket.on("username", function (name) {
  let joinedUser = document.createElement("li");
  joinedUser.className = "joined-user";
  joinedUser.textContent = name + ": Joined";
  chatMessages.appendChild(joinedUser);
});

// chatform
chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (chatInput.value) {
    socket.emit("chat message", chatInput.value);
    chatInput.value = "";
  }
});

// catch the messages
socket.on("chat message", function (msg) {
  console.log(socket.username);
  let messageBox = document.createElement("li");
  messageBox.textContent = msg;
  chatMessages.appendChild(messageBox);
});

// catch the user count
socket.on("userCount", function (count) {
  console.log(count);
  users.innerHTML = count;
});
