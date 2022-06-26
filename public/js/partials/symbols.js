const symbolList = document.querySelector(".autocomplete");
const accordion = document.querySelector("#flush-collapseThree");
const searchInput = document.querySelector(".searchInput");

async function getSymbols() {
  await fetch("https://api.binance.com/api/v3/exchangeInfo")
    .then((response) => response.json())
    .then((data) => {
      const symbols = data.symbols;
      let assets = [];

      // push all symbols in to a array
      symbols.forEach((symbol) => {
        assets.push(symbol.baseAsset);
      });

      // remove duplicate items and sort alpabatical order
      let uniqueAssets = [...new Set(assets)].sort();

      searchInput.onkeyup = (e) => {
        if (e.target.value.length <= 0) {
          accordion.classList.remove("show");
        } else {
          accordion.classList.add("show");

          let searchvalue = e.target.value.toUpperCase();
          let filterNames = uniqueAssets.filter((v, i) => {
            return v.includes(searchvalue);
          });

          while (symbolList.firstChild) {
            symbolList.removeChild(symbolList.firstChild);
          }

          for (let index = 0; index < filterNames.length; index++) {
            const template = `
           <p>${filterNames[index]}</p>
           `;

            const symbolItem = document.createElement("li");
            symbolItem.className = `${filterNames[index]}`;
            symbolItem.innerHTML = template;
            symbolList.appendChild(symbolItem);
          }
        }
      };
    })
    .catch((err) => console.log(err));
}

export { getSymbols };
