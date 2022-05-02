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

// userForm
usernameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  socket.emit("username", userInput.value);
  chatOverlay.remove();
  userInput.value = "";
});

// userName
socket.on("username", function (name) {
  console.log(name);
  let joinedUser = document.createElement("li");
  joinedUser.className = "joined-user";
  joinedUser.textContent = name + ":" + " joined the room";
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

// chatMessages
socket.on("chat message", function (msg) {
  let messageBox = document.createElement("li");
  messageBox.textContent = msg;
  chatMessages.appendChild(messageBox);
});

// userCount
socket.on("userCount", function (count) {
  users.innerHTML = count;
});
