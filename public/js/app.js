// This js file is only for functions unrelated to sockets or binance websockets
import { getSymbols } from "./partials/symbols.js";
// import { emojis } from "./partials/emojiPicker.js";
// insert all current symbols into token select-list
getSymbols();
// emojis();

const emojiPickerContainer = document.querySelector(".emoji-picker-container");
const emojiPicker = document.querySelector(".emoji-picker");

emojiPicker.addEventListener("emoji-click", (event) =>
  console.log(event.detail)
);

const emojiButton = document.querySelector(".emoji-button");
emojiButton.addEventListener("click", (e) => {
  emojiPickerContainer.classList.toggle("hidden");
  console.log(emojiPickerContainer);
});

emojiPicker.addEventListener("emoji-click", (event) =>
  console.log(event.detail)
);
