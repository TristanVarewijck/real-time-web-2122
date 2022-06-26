// This js file is only for handling the changes on the binance websockets
import {
  wsPrices,
  wsTrades,
  pricesCleaning,
  tradesCleaning,
} from "./partials/websocketClients.js";

const { id: room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

wsPrices.onopen = () => {
  console.log("connected to prices server");
};
// live-stream prices on "/"
wsPrices.onmessage = (event) => {
  let price = pricesCleaning(JSON.parse(event.data));
  let priceHolder = document.querySelectorAll(".indicators li p");
  // priceholders
  priceHolder[0].innerHTML = room.toUpperCase() + " / EUR";
  priceHolder[1].innerHTML = price.close;
  priceHolder[2].innerHTML = price.open;
  priceHolder[3].innerHTML = price.high;
  priceHolder[4].innerHTML = price.low;
};

wsTrades.onopen = () => {
  console.log("connected to trades server");
};

wsTrades.onmessage = (event) => {
  let trade = tradesCleaning(JSON.parse(event.data));
  // template
  const template = `
  <td>
  ${trade.current}
  </td>
  <td>
  ${trade.quantity}
  </td>
  <td>
  ${trade.date}
  </td>
  `;
  // appending with terms
  const tableBody = document.querySelectorAll("table tbody");
  const row = document.createElement("tr");
  const maxRows = 10;
  const status = 1;

  row.innerHTML = template;
  trade.state >= status
    ? tableBody[0].insertBefore(row, tableBody[0].firstChild)
    : tableBody[1].insertBefore(row, tableBody[1].firstChild);

  let sellsRows = document.querySelectorAll(".sells table tbody tr");
  if (sellsRows.length > maxRows) {
    tableBody[1].removeChild(tableBody[1].lastElementChild);
  }

  let buysRows = document.querySelectorAll(".buys table tbody tr");
  if (buysRows.length > maxRows) {
    tableBody[0].removeChild(tableBody[0].lastElementChild);
  }
};
