const submitButton = document.querySelector(".exportOverlay");
const submitButton2 = document.querySelector(
  ".quantumWizButtonPaperbuttonLabel"
);
const options = [...document.querySelectorAll(".exportOption")];
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];

function getFormData() {
  chrome.storage.local.get(["responses"], function(result) {
    data = result.responses;
  });
  let temp = [];
  options.forEach((option) => {
    if (option.classList.contains("isSelected")) {
      let content = option.querySelector("content").innerHTML;
      temp.push(content);
    }
  });
  radios.forEach((radio) => {
    let selectedRadio = radio.querySelector(".isChecked");
    if (selectedRadio != null) {
      let content = selectedRadio.dataset.value;
      temp.push(content);
    }
  });
  data.push(temp);
  chrome.storage.local.set({ responses: data }, function() {
    console.log("posted value to storage");
  });
}

submitButton.addEventListener("click", () => getFormData());
submitButton2.addEventListener("click", () => getFormData());
