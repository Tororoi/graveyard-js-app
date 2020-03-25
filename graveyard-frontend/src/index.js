const adapter = new APIAdapter("http:localhost:3000")

// Elements
const app = document.querySelector("body")
const nightSwitch = document.querySelector("#toggle-dark-mode")
const h1 = document.querySelector("h1")
const aside = document.querySelector("aside")
const ready = aside.children[2]
const flowerCount = aside.children[4]
const newGrave = aside.children[6]

const canvas = document.querySelector("#gameCanvas")
const context = canvas.getContext("2d")

let nightmode = "day"

//-------- Event Listeners ----------//
nightSwitch.addEventListener("click", handleNightSwitchClick)

//---------Event Handlers ----------//
function handleNightSwitchClick(e) {
  document.body.classList.toggle("dark-mode")
  console.log(e.target)
  if (nightmode === "night") {
    nightmode = "day";
    app.setAttribute("data-light-mode", "day");
    aside.setAttribute("data-light-mode", "day");
    h1.setAttribute("data-light-mode", "day");
    canvas.setAttribute("data-light-mode", "day");
} else {
    nightmode = "night";
    app.setAttribute("data-light-mode", "night");
    aside.setAttribute("data-light-mode", "night");
    h1.setAttribute("data-light-mode", "night");
    canvas.setAttribute("data-light-mode", "night");
}
}

///////////////////////////



////////////////////////

//Create Plots

const a1 = new Plot(context, {x: 0, y: 0})
const a2 = new Plot(context, {x: 1, y: 0})
const a3 = new Plot(context, {x: 2, y: 0})
const a4 = new Plot(context, {x: 3, y: 0,})
const a5 = new Plot(context, {x: 4, y: 0,})
const b1 = new Plot(context, {x: 0, y: 1,})
const b2 = new Plot(context, {x: 1, y: 1,})
const b3 = new Plot(context, {x: 2, y: 1,})
const b4 = new Plot(context, {x: 3, y: 1,})
const b5 = new Plot(context, {x: 4, y: 1,})
const c1 = new Plot(context, {x: 0, y: 2,})
const c2 = new Plot(context, {x: 1, y: 2,})
const c3 = new Plot(context, {x: 2, y: 2,})
const c4 = new Plot(context, {x: 3, y: 2,})
const c5 = new Plot(context, {x: 4, y: 2,})

  Plot.all.forEach(plot => plot.draw())

// Assets

const openGraveDay = "images/open_grave_day.png"
const openGraveNight = "images/open_grave_night.png"
const closedGraveDay = "images/closed_grave_day.png"
const closedGraveNight = "images/closed_grave_night.png"

const daffodilDay = "images/daffodil_day.png"
const daffodilNight = "images/daffodil_night.png"
const tulipDay = "images/tulip_day.png"
const tulipNight = "images/tulip_night.png"
const peonyDay = "images/peony_day.png"
const peonyNight = "images/peony_night.png"

const skeleton = "images/corpse_tester.png"


////

const testUl = document.createElement('ul')
const body = document.querySelector('body')
body.append(testUl)

//tester objects
const newGraveObj = {
    name: "John Doe",
    epitaph: "Died as he lived, unknown",
    lifespan: "1805-1892",
    open: false //always false for new grave. new graves are made by clicking on an empty plot while cursor is shovel.
}
const newCorpseObj = {
    name: "John Doe",
    speed: 1,
    flowers_needed: 2,
    grave_id: 1
}
const newFlowerObj = {
    name: "Tulip",
    worth: 2, //name and worth connected, selected from form 
    grave_id: 1 //grave is chosen by clicking on the grave while cursor is flower
}

//-------Grave Fetches-------//
//Post Grave
// adapter.postGrave(newGraveObj)
//Delete Grave

//Get all graves

//Get one grave

//--------Corpse Fetches--------//
//Post Corpse

//Delete Corpse

//Get all corpses

//Get one corpse

//-------Flower Fetches--------//
//Post Flower

//Delete Flower

//Get all Flowers

//Get one Flower

// obsolete grid stuff

// const graveyard = document.querySelector(".grid-container")
// const plots = graveyard.children
// plot one is plots[0], etc.

// an event listener on toggle will:
// 1. change page background color, whatever other css stuff, music even
// 2. trigger the rise
// 3. grey out + disable the toggle until all zombs in grave

// Testing
// document.addEventListener('DOMContentLoaded', (event) => {
//     displayStartingGraves()
// })

// function displayStartingGraves(){
//     const randomPlots = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).slice(0, 3) // 3 random numbers btw 0 and 14
//     randomPlots.forEach(index => {
//         plots[index].innerHTML = `
//         <img src=${openGraveDay} class="grave_img">
//         `
//     })
// }

// function shuffleArray(array) { // This is what it takes to generate several random unique numbers in a particular range in javascript, I guess 
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array
// }
