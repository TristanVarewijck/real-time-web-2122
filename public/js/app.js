// This js file is only for functions unrelated to sockets or binance websockets
import { getSymbols } from "./partials/symbols.js";
import { emojis } from "./partials/emojiPicker.js";
// insert all current symbols into token select-list
getSymbols();
emojis();
