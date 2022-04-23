const ethPrice = document.getElementById("price");
let wsPrices = new WebSocket("wss://stream.binance.com:9443/ws/etheur@ticker");
let wsTrades = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
// if(m === true){
// sell
// }else{
// buy
// }

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
  console.log(trades);
};
