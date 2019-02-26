// const submitButton = document.querySelector("iframe").contentDocument.body;
// const body = document.querySelector("body");

// console.log(submitButton);
// submitButton.addEventListener("click", function() {
//   alert("clicked");
// });
// body.addEventListener("click", function() {
//   alert("clicked");
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.webNavigation.addListener(
    function() {
      const form1 = document.querySelector("body");
      let window1 = 0;
      chrome.runtime.getBackgroundPage(function(Window) {
        window1 = Window.innerHeight;
        alert(window1);
      });
      return form1;
    },
    {
      url: [
        {
          urlMatches:
            "https://docs.google.com/forms/d/e/1FAIpQLScFVg5sYWwkVbCZHx1nCY6hKhkgMSpU2h9KjV_HdGHY-0OGVQ/viewform"
        }
      ]
    }
  );
});

// const submitButton = document.querySelector("body"); //.quantumWizButtonPaperbuttonLabel

// console.log(submitButton);
// if (submitButton !== null) {
//   submitButton.addEventListener("click", function() {
//     alert("clicked");
//   });
// }
