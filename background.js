const submitButton = document.querySelector(".exportOverlay");
const submitButton2 = document.querySelector(
  ".quantumWizButtonPaperbuttonLabel"
);
const options = [...document.querySelectorAll(".exportOption")];
const radios = [...document.querySelectorAll(".exportLabelWrapper")];
let data = [];

function getFormData() {
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
  // chrome.runtime.sendMessage({ data: [...data], greeting: "hello" });
  console.log(chrome.commands)
  var port = chrome.runtime.connect({ name: "dataTransfer" });
  port.postMessage({ data: data });
  port.onMessage.addListener(function(msg) {
    console.log(msg);
  });
}

submitButton.addEventListener("click", () => getFormData());
submitButton2.addEventListener("click", () => getFormData());
