let text = document.querySelector("p");
let data = [];
let body = document.querySelector("body");
let table = document.querySelector(".table");
let submissionCount = document.querySelector(".submissionCount");
let callCount = document.querySelector(".callCount");

const populateData = () => {
  chrome.storage.local.get(["counter"], function(result) {
    submissionCount.innerHTML = result.counter ? result.counter : 0;
  });
  chrome.storage.local.get(["callsTracked"], function(result) {
    callCount.innerHTML = result.callsTracked ? result.callsTracked : 0;
    if(result.callsTracked === -1){
      callCount.innerHTML = 0;
    }
  });
  chrome.storage.local.get(["responses"], function(result) {
    let newTable = document.createElement("DIV");
    if (result.responses != undefined) {
      let responseData = result.responses;
      while (responseData.length > 5) {
        responseData.shift();
      }
      responseData.forEach(response => {
        let listItem = document.createElement("P");
        listItem.classList.add("listItem");
        String(response)
          .split(",")
          .forEach(item => {
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
      if (document.querySelector(".table")) {
        document.querySelector(".table").remove();
      }
    }
  });
};

document.querySelector("#clearResponses").addEventListener("click", () => {
  chrome.storage.local.clear();
  chrome.storage.local.set({ callsTracked: -1 }, function() {});
  if (document.querySelector(".table")) {
    document.querySelector(".table").remove();
  }
  populateData();
});

document.querySelector("#addCall").addEventListener("click", () => {
  let adjustedCalls = parseInt(callCount.innerHTML) + 1;
  chrome.storage.local.set({ callsTracked: adjustedCalls }, function() {
    callCount.innerHTML = adjustedCalls;
  });
});

document.querySelector("#subtractCall").addEventListener("click", () => {
  let adjustedCalls =
    parseInt(callCount.innerHTML) >= 1 ? parseInt(callCount.innerHTML) - 1 : 0;
  chrome.storage.local.set({ callsTracked: adjustedCalls }, function() {
    callCount.innerHTML = adjustedCalls;
  });
});

body.onload = populateData();
