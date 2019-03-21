setTimeout(() => {
  const name = document.querySelector(".titleText").innerText;
  let shouldTrackCall = false;
  const callEndStatus = "Wrap Up";
  let tempStatus1 = "";
  let tempStatus2 = "";
  let callsTracked;
  setInterval(() => {
    chrome.storage.local.get(["callsTracked"], function(result) {
      callsTracked = result.callsTracked === -1 ? 0 : result.callsTracked;
      let people = document.querySelectorAll(".slick-row");
      let personData = "";
      people.forEach(person => {
        personData = person.innerText.split(/\n/);
        if (personData.length > 1 && !personData[1].includes("(0")) {
          tempStatus1 = personData[1];
          if (personData[0].includes(name)) {
            if (
              tempStatus1 !== tempStatus2 &&
              (personData[1].includes(callEndStatus) ||
                ((tempStatus2.includes("Inbound") ||
                  tempStatus2.includes("Outbound")) &&
                  tempStatus1.includes("Available"))) &&
              shouldTrackCall
            ) {
              callsTracked++;
              shouldTrackCall = false;
            } else if (!personData[1].includes(callEndStatus)) {
              shouldTrackCall = true;
            }
            tempStatus2 = tempStatus1;
          }
        }
      });
      chrome.storage.local.set({ callsTracked: callsTracked }, function() {});
    });
  }, 1000);
}, 4000);
