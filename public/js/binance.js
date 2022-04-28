import {
  wsPrices,
  wsTrades,
  pricesCleaning,
  tradesCleaning,
} from "./partials/websocketClients.js";

wsPrices.onopen = (event) => {
  console.log("connected to prices server");
};
// live-stream prices on "/"
wsPrices.onmessage = (event) => {
  let data = pricesCleaning(JSON.parse(event.data));
  console.log(data);
};

wsTrades.onopen = (event) => {
  console.log("connected to trades server");
};

// live-stream trades on "/"
wsTrades.onmessage = (event) => {
  let trade = tradesCleaning(JSON.parse(event.data));
  console.log(trade);
};
