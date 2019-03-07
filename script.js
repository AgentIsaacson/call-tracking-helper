let text = document.querySelector("p");
let data = [];
let table = document.querySelector("body");
chrome.runtime.onUpdated.addListener(() => {
  chrome.storage.local.get(["responses"], function(result) {
    result.responses.forEach((response) => {
      let p = document.createElement("P");
      p.innerHTML = response;
      table.appendChild(p);
      console.log(p);
      console.log(table);
    });
  });
});
