const searchInput = document.querySelector(".searchInput");
const accordion = document.querySelector("#flush-collapseThree");

searchInput.onkeyup = (e) => {
  if (e.target.value.length <= 0) {
    accordion.classList.remove("show");
  } else {
    accordion.classList.add("show");
  }
};

export { searchInput };
