const symbolList = document.querySelector(".autocomplete");
const accordion = document.querySelector("#flush-collapseThree");
const searchInput = document.querySelector(".searchInput");

async function getSymbols() {
  await fetch("coins.json")
    .then((response) => response.json())
    .then((data) => {
      searchInput.onkeyup = (e) => {
        // condition
        if (e.target.value.length <= 0) {
          accordion.classList.remove("show");
        } else {
          accordion.classList.add("show");
          let searchvalue = e.target.value.toUpperCase();

          let filterNames = data.filter((v, i) => {
            return v.id.includes(searchvalue);
          });

          // delete all items before inserting again
          while (symbolList.firstChild) {
            symbolList.removeChild(symbolList.firstChild);
          }

          if (filterNames.length > 0) {
            for (let index = 0; index < filterNames.length; index++) {
              const template = `
              <a href=/room?id=${filterNames[index].id.toLowerCase()}>
                <p>${filterNames[index].id}</p>
                <p>${filterNames[index].fullName}</p>
              </a>

             `;

              const symbolItem = document.createElement("li");
              symbolItem.className = `${filterNames[index].id}`;
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
