let assets = [];
function getSymbols() {
  fetch("https://api.binance.com/api/v3/exchangeInfo")
    .then((response) => response.json())
    .then((data) => {
      const symbols = data.symbols;
      symbols.forEach((symbol) => {
        assets.push(symbol.baseAsset);
      });

      let uniqueAssets = [...new Set(assets)];
      console.log(uniqueAssets);
    })
    .catch((err) => console.log(err));
}

export { getSymbols };
