let text = document.querySelector("p");
let data = [];
let body = document.querySelector("body");
let table = document.querySelector(".table");

const populateData = () => {
  chrome.storage.local.get(["responses"], function(result) {
    console.log(result.responses);
    if (result.responses != undefined) {
      result.responses.forEach((response) => {
        let listItem = document.createElement("P");
        listItem.classList.add("listItem");
        String(response)
          .split(",")
          .forEach((item) => {
            let tableItem = document.createElement("DIV");
            tableItem.innerHTML = item;
            listItem.appendChild(tableItem);
            tableItem.classList.add("tableItem");
          });
        table.appendChild(listItem);
      });
    } else {
      table.remove(document.querySelectorAll(".tableItem"));
    }
  });
};

body.onload = populateData();

document.querySelector("#clearResponses").addEventListener("click", () => {
  chrome.storage.local.clear();
  populateData();
});
