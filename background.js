const submitButton = document.querySelector(".exportOverlay");
const submitButton3 = document.querySelector(
  ".quantumWizButtonPaperbuttonContent"
);
const options = [...document.querySelectorAll(".exportOption")].splice(-1, 1);
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];
function pushFormData() {
  let now = `${new Date().getHours()}:${new Date().getMinutes()>=10 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`
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
  chrome.storage.local.get(["responses"], function(result) {
    chrome.storage.local.set({ responses: data }, function() {
      console.log("posted value to storage");
    });
  });
  console.log(now);
}

submitButton.addEventListener("click", () => {
  pushFormData();
});
submitButton3.addEventListener("click", () => {
  pushFormData();
});
