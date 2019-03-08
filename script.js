let text = document.querySelector("p");
let data = [];
let body = document.querySelector("body");
body.onload = () => {
  chrome.storage.local.get(["responses"], function(result) {
    if (result.responses != undefined) {
      result.responses.forEach(response => {
        let p = document.createElement("P");
        p.innerHTML = response;
        body.appendChild(p);
        console.log(p);
        console.log(body);
      });
    }
  });
};
