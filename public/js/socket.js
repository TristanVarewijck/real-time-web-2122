// This file is only for handling the websockets on the client-side
let socket = io();

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const usersCount = document.getElementById("userCount");

const chatOverlay = document.getElementById("chat-overlay");
const usernameForm = document.getElementById("user-form");
const userInput = document.getElementById("user-input");
const characterCounter = document.getElementById("chaCount");

const userList = document.querySelector(".userGrid");
let users = [];
let nameOfUser;
let userID;

const { id: room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// set user inside the room according to url
socket.emit("joinRoom", room);
socket.on("userID", (id) => (userID = id));
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
  nameOfUser = userInput.value;
  socket.emit("username", userInput.value);
  chatOverlay.remove();
  userInput.value = "";
});

socket.on("username", function (name) {
  let joinedUser = document.createElement("li");
  joinedUser.className = "joined-user";
  joinedUser.textContent = name + ": Joined";
  chatMessages.appendChild(joinedUser);
});

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (chatInput.value) {
    socket.emit("chat message", chatInput.value);
    chatInput.value = "";
  }
});

socket.on("chat message", function (msg, user) {
  addNewMessage(msg, user);
});

// format the chatmessages
const addNewMessage = (msg, user) => {
  const time = new Date();
  const timeStamp = time.getTime();
  const formattedTime = moment(timeStamp).format("hh:mm:ss");
  const id = user.id;

  const receivedMsg = `
  <div>
  <span>${user.username}</span><span>${": " + formattedTime}</span>
  <p>${msg}</p>
  </div>`;

  const myMsg = `
  <div>
  <span>${formattedTime}</span>
  <p>${msg}</p>
  </div>`;

  let message = document.createElement("li");
  message.innerHTML = id === userID ? myMsg : receivedMsg;
  message.className = id === userID ? "sent" : "received";
  chatMessages.appendChild(message);
};

socket.on("userCount", function (count, users) {
  console.log(typeof users);

  console.log(users, count);
  usersCount.innerHTML = count;

  if (users !== undefined) {
    while (userList.firstChild) {
      userList.removeChild(userList.lastChild);
    }

    users.forEach((user) => {
      const newUser = `
    <li>
    <div>
      <img src="assets/icons/dot.svg" alt="online-dot" />
      <p>${user.username}</p>
    </div>
  
    <button class="private-chatButton" name="user" value=${user.username}>
      <img src="assets/icons/privateMessage.svg" alt="message-icon" />
    </button>
    </li>`;

      let userItem = document.createElement("li");
      userItem.innerHTML = newUser;
      userList.appendChild(userItem);

      const backButton = document.querySelector(".back-to-room");
      const privateChat = document.querySelector(".private-chat");
      const publicChat = document.querySelector(".public-chat");
      const privateUsername = document.querySelector(".username-placeholder");
      let privateChatButtons = document.querySelectorAll(".private-chatButton");

      backButton.addEventListener("click", (e) => {
        publicChat.classList.remove("hidden");
        privateChat.classList.add("hidden");
      });

      for (var i = 0; i < privateChatButtons.length; i++) {
        privateChatButtons[i].addEventListener("click", function () {
          if (user.username !== this.value) {
            publicChat.classList.add("hidden");
            privateChat.classList.remove("hidden");
            privateUsername.innerHTML = this.value;
          }
        });
      }
    });
  }
});

// catch when a user leaves the room
socket.on("user-left", function (user) {
  let leftUser = document.createElement("li");
  leftUser.className = "joined-user";
  leftUser.textContent = user.username + ": Left";
  chatMessages.appendChild(leftUser);
});
