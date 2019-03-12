const submitButton = document.querySelector(".exportOverlay");
// const submitButton2 = document.querySelector(
//   ".quantumWizButtonPaperbuttonLabel"
// );
const submitButton3 = document.querySelector(
  ".quantumWizButtonPaperbuttonContent"
);
const options = [...document.querySelectorAll(".exportOption")];
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];
function getFormData() {
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
  data.push(new Date());
  chrome.storage.local.get(["responses"], function(result) {
    chrome.storage.local.set({ responses: data }, function() {
      console.log("posted value to storage");
    });
  });
  console.log(data);
}

submitButton.addEventListener("click", () => {
  getFormData();
});
// submitButton2.addEventListener("click", () => {
//   getFormData();
// });
submitButton3.addEventListener("click", () => {
  getFormData();
});
