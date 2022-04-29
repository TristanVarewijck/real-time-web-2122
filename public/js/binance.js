import {
  wsPrices,
  wsTrades,
  pricesCleaning,
  tradesCleaning,
} from "./partials/websocketClients.js";

// remove and add node table rows

let tableBody = document.querySelectorAll("table tbody");

wsPrices.onopen = (event) => {
  console.log("connected to prices server");
};
// live-stream prices on "/"
wsPrices.onmessage = (event) => {
  let data = pricesCleaning(JSON.parse(event.data));
  // console.log(data);
};

wsTrades.onopen = (event) => {
  console.log("connected to trades server");
};

// {current: '2768.23', quantity: '0.05240', state: 1, date: '09:54:57 am'}
// current: "2768.23"
// date: "09:54:57 am"
// quantity: "0.05240"
// state: 1
// live-stream trades on "/"
wsTrades.onmessage = (event) => {
  let buysRows = document.querySelectorAll(".buys table tbody tr");
  let sellsRows = document.querySelectorAll(".sells table tbody tr");
  let trade = tradesCleaning(JSON.parse(event.data));
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

  const row = document.createElement("tr");
  row.innerHTML = template;

  sellsRows.length >= 8
    ? tableBody[1].removeChild(tableBody[1].lastElementChild)
    : console.log("ok");

  buysRows.length >= 8
    ? tableBody[0].removeChild(tableBody[0].lastElementChild)
    : console.log("ok");

  trade.state >= 1
    ? tableBody[0].insertBefore(row, tableBody[0].firstChild)
    : tableBody[1].insertBefore(row, tableBody[1].firstChild);
};
