// This js file is only for functions unrelated to sockets or binance websockets
import { getSymbols } from "./partials/symbols.js";
// import { emojis } from "./partials/emojiPicker.js";
// insert all current symbols into token select-list
getSymbols();
// emojis();

const emojiPickerContainer = document.querySelector(".emoji-picker-container");
const emojiPicker = document.querySelector(".emoji-picker");
const inputField = document.getElementById("chat-input");
const emojiButton = document.querySelector(".emoji-button");
const emojiButtonImg = document.querySelector(".emoji-button img");

emojiButton.addEventListener("click", (e) => {
  // hide container
  emojiPickerContainer.classList.toggle("hidden");

  // change button state
  if (emojiButtonImg.src == "http://localhost:3000/assets/icons/smiley.svg") {
    emojiButtonImg.src = "http://localhost:3000/assets/icons/cross.svg";
  } else {
    emojiButtonImg.src = "http://localhost:3000/assets/icons/smiley.svg";
  }
});

// append emoji after text
emojiPicker.addEventListener("emoji-click", function selectEmoji() {
  const currentInputValue = inputField.value;
  inputField.value = currentInputValue + event.detail.unicode;
});
