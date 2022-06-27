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
        // condition
        if (e.target.value.length <= 0) {
          accordion.classList.remove("show");
        } else {
          accordion.classList.add("show");
          let searchvalue = e.target.value.toUpperCase();
          let filterNames = uniqueAssets.filter((v, i) => {
            return v.includes(searchvalue);
          });

          // delete all items before inserting again
          while (symbolList.firstChild) {
            symbolList.removeChild(symbolList.firstChild);
          }

          if (filterNames.length > 0) {
            for (let index = 0; index < filterNames.length; index++) {
              const template = `
              <a href=/room?id=${filterNames[index].toLowerCase()}>
                <p>${filterNames[index]}</p>
              </a>

             `;

              const symbolItem = document.createElement("li");
              symbolItem.className = `${filterNames[index]}`;
              symbolItem.innerHTML = template;
              symbolList.appendChild(symbolItem);
            }
          } else if (filterNames.length <= 0) {
            const noResults = `
            <p>No Results...</p>
            `;

            const noResultsMessage = document.createElement("li");
            noResultsMessage.className = "noResultsMessage";
            noResultsMessage.innerHTML = noResults;
            symbolList.appendChild(noResultsMessage);
          }
        }
      };
    })
    .catch((err) => console.log(err));
}

export { getSymbols };
