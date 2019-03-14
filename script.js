let text = document.querySelector("p");
let data = [];
let body = document.querySelector("body");
let table = document.querySelector(".table");
let submissionCount = document.querySelector(".submissionCount");
let callCount = document.querySelector(".callCount");

const populateData = () => {
  chrome.storage.local.get(["responses"], function(result) {
    let newTable = document.createElement("DIV");
    // All responses together
    if (result.responses != undefined) {
      let responseData = result.responses;
      while (responseData.length > 3) {
        responseData.shift();
        console.log(responseData);
      }
      responseData.forEach(response => {
        // Individual responses
        let listItem = document.createElement("P");
        listItem.classList.add("listItem");
        String(response)
          .split(",")
          .forEach(item => {
            // individual items
            let tableItem = document.createElement("DIV");
            tableItem.innerHTML = item;
            listItem.appendChild(tableItem);
            tableItem.classList.add("tableItem");
          });
        newTable.appendChild(listItem);
      });
      body.removeChild(table);
      newTable.classList.add("table");
      body.appendChild(newTable);
    } else {
      document.querySelector(".table").remove();
      chrome.storage.local.clear();
    }
  });
  chrome.storage.local.get(["counter"], function(result) {
    submissionCount.innerHTML = result.counter ? result.counter : 0;
  });
  chrome.storage.local.get(["callsTracked"], function(result) {
    callCount.innerHTML = result.callsTracked ? result.callsTracked : 0;
  });
};

body.onload = populateData();

document.querySelector("#clearResponses").addEventListener("click", () => {
  chrome.storage.local.clear();
  chrome.storage.local.set({ callsTracked: -1 }, function() {
    console.log("complete");
  });
  if (document.querySelector(".table")) {
    document.querySelector(".table").remove();
  }
  populateData();
});
