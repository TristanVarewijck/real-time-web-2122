const symbolList = document.querySelector(".autocomplete");

let assets = [];
async function getSymbols() {
  await fetch("https://api.binance.com/api/v3/exchangeInfo")
    .then((response) => response.json())
    .then((data) => {
      const symbols = data.symbols;

      // push all symbols in to a array
      symbols.forEach((symbol) => {
        assets.push(symbol.baseAsset);
      });

      // remove duplicate items and sort alpabatical order
      let uniqueAssets = [...new Set(assets)].sort();

      // for each item add to DOM
      for (let index = 0; index < uniqueAssets.length; index++) {
        const template = `
       <p>${uniqueAssets[index]}</p>
       `;

        const symbolItem = document.createElement("li");
        symbolItem.className = `${uniqueAssets[index]}`;
        symbolItem.innerHTML = template;
        symbolList.appendChild(symbolItem);
      }
    })
    .catch((err) => console.log(err));
}

export { getSymbols };
