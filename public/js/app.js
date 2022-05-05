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
const { room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// set user inside the room according to url
socket.emit("joinRoom", room);

userInput.addEventListener("keyup", () => {
  let maxCha = 16;
  let currentLength = userInput.value.length;
  if (currentLength >= maxCha) {
    userInput.value = userInput.value.substring(0, maxCha);
  } else {
    characterCounter.innerHTML = maxCha - currentLength - 1;
  }
});

// set a user in a room when you submit the username
usernameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  socket.emit("username", userInput.value);
  chatOverlay.remove();
  userInput.value = "";
});

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
socket.on("chat message", function (msg, user) {
  addNewMessage(msg, user);
});

// format the chatmessages
const addNewMessage = (msg, user) => {
  const time = new Date();
  const timeStamp = time.getTime();
  const formattedTime = moment(timeStamp).format("hh:mm:ss");
  const username = user.username;

  const receivedMsg = `
  <div class="received">
  <span>${username}</span><span>${": " + formattedTime}</span>
  <p>${msg}</p>
  </div>`;

  const myMsg = `
  <div class="send_message>
  <span>${formattedTime}</span>
  <p>${msg}</p>
  </div>`;

  let message = document.createElement("li");
  message.innerHTML = receivedMsg;
  chatMessages.appendChild(message);
};

// catch the user count
socket.on("userCount", function (count) {
  console.log(count);
  users.innerHTML = count;
});

// catch when a user leaves the room
socket.on("user-left", function (user) {
  let leftUser = document.createElement("li");
  leftUser.className = "joined-user";
  leftUser.textContent = user.username + ": Left";
  chatMessages.appendChild(leftUser);
});
