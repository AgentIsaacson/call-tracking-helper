const submitButton = document.querySelector(".exportOverlay");
const submitButton3 = document.querySelector(
  ".quantumWizButtonPaperbuttonContent"
);
const options = [...document.querySelectorAll(".exportOption")].splice(-1, 1);
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];
let counter;
function pushFormData() {
  let now = `${new Date().getHours()}:${
    new Date().getMinutes() >= 10
      ? new Date().getMinutes()
      : "0" + new Date().getMinutes()
  }`;
  let data = [];
  options.forEach(option => {
    if (option.classList.contains("isSelected")) {
      let content = option.querySelector("content").innerHTML;
      data.push(content);
    }
  });
  radios.forEach(radio => {
    let selectedRadio = radio.querySelector(".isChecked");
    if (selectedRadio != null) {
      let content = selectedRadio.dataset.value;
      data.push(content);
    }
  });
  data.push(now);
  console.log(data);
  chrome.storage.local.set({ responses: data }, function() {
    console.log("posted value to storage");
  });
  chrome.storage.local.get(["counter"], function(result) {
    let counter = result.counter ? result.counter : 0;
    return counter;
  });
  console.log("counter: " + counter);
  counter++;
  console.log("counter: " + counter);
}

submitButton.addEventListener("click", () => {
  pushFormData();
});
submitButton3.addEventListener("click", () => {
  pushFormData();
});
