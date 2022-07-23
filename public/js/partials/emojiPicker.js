const emojiPickerContainer = document.querySelector(".emoji-picker-container");
const emojiPicker = document.querySelector(".emoji-picker");
const inputField = document.getElementById("chat-input");
const emojiButton = document.querySelector(".emoji-button");
const emojiButtonImg = document.querySelector(".emoji-button img");

function imgToggler(img1, img2) {
  if (emojiButtonImg.src == img1) {
    return img2;
  } else {
    return img1;
  }
}

function emojis() {
  emojiButton.addEventListener("click", (e) => {
    // hide container
    emojiPickerContainer.classList.toggle("hidden");
    emojiButtonImg.src = imgToggler(
      "http://localhost:3000/assets/icons/smiley.svg",
      "http://localhost:3000/assets/icons/cross.svg"
    );
  });

  // append emoji after text
  emojiPicker.addEventListener("emoji-click", function selectEmoji() {
    const currentInputValue = inputField.value;
    inputField.value = currentInputValue + event.detail.unicode;
  });
}

export { imgToggler, emojis };
