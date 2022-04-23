const ethPrice = document.getElementById("price");
let wsPrices = new WebSocket("wss://stream.binance.com:9443/ws/etheur@ticker");
let wsTrades = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
let socket = io();
let tradeTableBody = document.getElementById("insert-trades");

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
};
let tradesArr = [];
let maxTrades = 5;
wsTrades.onmessage = (event) => {
  let data = JSON.parse(event.data);
  // compressing
  let trade = {
    price: Number(data.p).toFixed(2),
    quantity: Number(data.q).toFixed(4),
    type: data.e,
    status: data.m,
  };
  //  check if array is full and delete first added item
  if (tradesArr.length >= maxTrades) {
    tradesArr.shift();
  }
  tradesArr.push(trade);
  console.log(tradesArr);

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
