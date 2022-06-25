const searchInput = document.querySelector(".searchInput");
const accordion = document.querySelector("#flush-collapseThree");

const names = [
  {
    name: "BTC",
  },
  {
    name: "ETH",
  },
  {
    name: "BNB",
  },
  {
    name: "BUSD",
  },
];

searchInput.onkeyup = (e) => {
  if (e.target.value.length <= 0) {
    accordion.classList.remove("show");
  } else {
    accordion.classList.add("show");
  }

  // filter search values
  let searchvalue = e.target.value;
  var filterNames = names.filter((v, i) => {
    return v.name.includes(searchvalue);
  });
  renderNames(filterNames);
};

export { searchInput };
