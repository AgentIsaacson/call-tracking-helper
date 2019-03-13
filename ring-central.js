const statuses = document.querySelectorAll(".grid-canvas")[1]
statuses.addEventListener("change", () => {
    console.log("changed")
})

console.log("working...")
statuses.forEach(person => {
    console.log("sup")
})

