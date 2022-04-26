import { wsPrices, wsTrades, dataCleaning } from "./sockets.js";

const ethPrice = document.getElementById("price");
let tradeTableBody = document.getElementById("insert-trades");
let socket = io();
let tradesArr = [];
let maxTrades = 5;

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
  console.log(prices);
  ethPrice.innerHTML = prices.c;
};

wsTrades.onmessage = (event) => {
  console.log(event);
  let data = JSON.parse(event.data);
  let trade = dataCleaning(data);

  if (tradesArr.length >= maxTrades) {
    tradesArr.shift();
  }
  tradesArr.push(trade);

  tradesArr.forEach((trade) => {
    const template = `
    <td>${trade.price}</td>
    <td>${trade.quantity}</td>
    <td>${trade.type}</td>
    `;

    const tradeBullet = document.createElement("tr");
    tradeBullet.innerHTML = template;
    tradeTableBody.appendChild(tradeBullet);
  });
};

// socket.io chat function
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

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
