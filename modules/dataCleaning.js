var moment = require("moment");
console.log(moment().format());

const pricesCleaning = (data) => {
  let price = {
    name: addSlash(data.s),
    close: decimalsHandler(data.c),
    open: decimalsHandler(data.o),
    high: decimalsHandler(data.h),
    low: decimalsHandler(data.l),
  };
  return price;
};

const tradesCleaning = (data) => {
  let trade = {
    current: decimalsHandler(data.p),
    quantity: Number(data.q).toFixed(5),
    state: Number(data.m),
    date: timeParse(data.T),
  };
  return trade;
};

function addSlash(name) {
  const parsedName = name.slice(0, 3) + "/" + name.slice(3);
  return parsedName;
}

function decimalsHandler(number) {
  const decimalsAdded = Number(number).toFixed(2);
  return decimalsAdded;
}

function timeParse(time) {
  // parsing date into clock-time
  let date = moment(time).format("hh:mm:ss a");
  return date;
}

module.exports = { pricesCleaning, tradesCleaning };
