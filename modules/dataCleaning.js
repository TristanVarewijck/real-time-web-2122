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
  let price = {
    current: decimalsHandler(data.p),
    quantity: Number(data.q).toFixed(5),
    state: Number(data.m),
    date: timeParse(data.T),
  };

  return price;
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
  let date = time;
  return date;
}

module.exports = { pricesCleaning, tradesCleaning };

// let tradesCleaning = (data) => {
//   let trade = {
//     name: data.s,
//     close: Number(data.c).toFixed(2),
//     open: Number(data.o).toFixed(2),
//     high: Number(data.h).toFixed(2),
//     low: Number(data.l).toFixed(2),
//   };

//   return trade;
// };
