import {
  wsPrices,
  wsTrades,
  pricesCleaning,
  tradesCleaning,
} from "./partials/websocketClients.js";

let priceHolder = document.querySelectorAll(".indicators li p");

wsPrices.onopen = (event) => {
  console.log("connected to prices server");
};
// live-stream prices on "/"
wsPrices.onmessage = (event) => {
  let price = pricesCleaning(JSON.parse(event.data));
  console.log(price);

  // priceholders
  priceHolder[0].innerHTML = price.name;
  priceHolder[1].innerHTML = price.close;
  priceHolder[2].innerHTML = price.open;
  priceHolder[3].innerHTML = price.high;
  priceHolder[4].innerHTML = price.low;
};

wsTrades.onopen = (event) => {
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
  row.innerHTML = template;
  trade.state >= 1
    ? tableBody[0].insertBefore(row, tableBody[0].firstChild)
    : tableBody[1].insertBefore(row, tableBody[1].firstChild);

  let sellsRows = document.querySelectorAll(".sells table tbody tr");
  sellsRows.length > 10
    ? tableBody[1].removeChild(tableBody[1].lastElementChild)
    : console.log("do nothing");

  let buysRows = document.querySelectorAll(".buys table tbody tr");
  buysRows.length > 10
    ? tableBody[0].removeChild(tableBody[0].lastElementChild)
    : console.log("do nothing");
};
