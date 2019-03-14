const name = document.querySelector(".titleText").innerText;
let callsTracked = 0;
let shouldTrackCall = false;
const status = "Wrap Up";
let tempStatus1;
let tempStatus2;
setInterval(() => {
  let people = document.querySelectorAll(".slick-row");
  let personData = "";
  people.forEach((person) => {
      personData = person.innerText.split(/\n/);
      tempStatus1 = personData[1];
      console.log(tempStatus1 + "        " + tempStatus2);
    if (tempStatus1!==tempStatus2 && personData[0].includes(name) && personData[1].includes(status)) {
      callsTracked++;
      console.log("call tracked:  " + callsTracked);
      shouldTrackCall = false;
    } else if (!personData[1].includes(status)) {
      shouldTrackCall = true;
    }
    tempStatus2 = tempStatus1;
  });
}, 5000);
