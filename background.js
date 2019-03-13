const submitButton1 = document.querySelector(".exportOverlay");
const submitButton2 = document.querySelector(
  ".quantumWizButtonPaperbuttonContent"
);
const options = [...document.querySelectorAll(".exportOption")].splice(-1, 1);
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
  let data = [];
  options.forEach((option) => {
    if (option.classList.contains("isSelected")) {
      let content = option.querySelector("content").innerHTML;
      data.push(content);
    }
  });
  radios.forEach((radio) => {
    let selectedRadio = radio.querySelector(".isChecked");
    if (selectedRadio != null) {
      let content = selectedRadio.dataset.value;
      data.push(content);
    }
  });
  data.push(now);
  chrome.storage.local.set({ responses: data }, function() {
    console.log("posted value to storage");
  });
  chrome.storage.local.get(["counter"], function(result) {
    let counter = result.counter ? result.counter : 0;
    counter++;
    chrome.storage.local.set({ counter: counter }, function() {
      console.log("Ticked Counter" + counter);
    });
  });
}

submitButton1.addEventListener("click", () => {
  pushFormData();
});
submitButton2.addEventListener("click", () => {
  pushFormData();
});
