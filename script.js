let text = document.querySelector("p");
let data = [];
let table = document.querySelector("body");

chrome.storage.local.get(["responses"], function(result) {
  text.innerHTML = result.responses;
});