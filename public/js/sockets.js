// websocet server connection
let wsPrices = new WebSocket(
  "wss://stream.binance.com:9443/ws/etheur@miniTicker"
);
let wsTrades = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");

let dataCleaning = (data) => {
  console.log(data);
  let trade = {
    price: Number(data.p).toFixed(2),
    quantity: Number(data.q).toFixed(4),
    type: data.e,
    status: data.m,
  };
  return trade;
};

export { wsPrices, wsTrades, dataCleaning };
