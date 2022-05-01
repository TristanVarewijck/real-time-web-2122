let socket = io();

let form = document.getElementById("chat-form");
let input = document.getElementById("chat-input");
let messages = document.getElementById("chat-messages");
let users = document.getElementById("userCount");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  //   window.scrollTo(0, document.body.scrollHeight);
});

socket.on("userCount", function (count) {
  users.innerHTML = count;
  console.log(count);
});
