const submitButton = document.querySelector(".exportOverlay");
const submitButton3 = document.querySelector(
  ".quantumWizButtonPaperbuttonContent"
);
const options = [...document.querySelectorAll(".exportOption")].splice(-1, 1);
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];

function pushFormData() {
  data = [];
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
  chrome.storage.local.set({ responses: data }, function() {
    console.log("done");
  });
}

submitButton.addEventListener("click", () => {
  pushFormData();
});
submitButton3.addEventListener("click", () => {
  pushFormData();
});
