const ethPrice = document.getElementById("price");
let wsPrices = new WebSocket("wss://stream.binance.com:9443/ws/etheur@ticker");
let wsTrades = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let socket = io();

// check connection
wsPrices.onopen = () => {
  console.log("connected to the token prices");
};

wsTrades.onopen = () => {
  console.log("connected to token trades");
};

// read changes / events
wsPrices.onmessage = (event) => {
  let prices = JSON.parse(event.data);
  ethPrice.innerHTML = prices.c;
  console.log(prices.c);
};

wsTrades.onmessage = (event) => {
  let trades = JSON.parse(event.data);

  trades.p = "kaas";

  console.log(trades);
};

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

console.log(chatForm, chatInput);

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (chatInput.value) {
    socket.emit("chat message", chatInput.value);
    chatInput.value = "";
  }
});

socket.on("chat message", (msg) => {
  let item = document.createElement("li");
  item.textContent = msg;
  chatMessages.appendChild(item);
});
