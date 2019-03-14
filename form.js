const submitButton1 = document.querySelector(".exportOverlay");
const submitButton2 = document.querySelector(
  ".quantumWizButtonPaperbuttonContent"
);
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];
function pushFormData() {
  let now = `${
    new Date().getHours() <= 12
      ? new Date().getHours()
      : new Date().getHours() - 12
  }:${
    new Date().getMinutes() >= 10
      ? new Date().getMinutes()
      : "0" + new Date().getMinutes()
  }${new Date().getHours() <= 12 ? "am" : "pm"}`;
  let temp = [];
  radios.forEach(radio => {
    let selectedRadio = radio.querySelector(".isChecked");
    if (selectedRadio != null) {
      let content = selectedRadio.dataset.value;
      temp.push(content);
    }
  });
  temp.push(now);
  chrome.storage.local.get(["responses"], function(result) {
    let data = result.responses ? result.responses : [];
    data.push(temp);
    chrome.storage.local.set({ responses: data }, function() {});
  });
  chrome.storage.local.get(["counter"], function(result) {
    let counter = result.counter ? result.counter : 0;
    counter++;
    chrome.storage.local.set({ counter: counter }, function() {});
  });
}

submitButton1.addEventListener("click", () => {
  pushFormData();
});
submitButton2.addEventListener("click", () => {
  pushFormData();
});
