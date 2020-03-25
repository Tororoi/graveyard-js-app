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

// Create Plots
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

// Get graves



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


document.addEventListener('DOMContentLoaded', (event) => {
    adapter.fetchGraves()
        .then(graves => {
            console.log(graves)
            var remainingGraveSeeds = shuffleArray(graves)
            return remainingGraveSeeds
        })
        .then(remainingGraveSeeds => {
            var threeInitialGraves = remainingGraveSeeds.splice(0,3)
            displayStartingGraves(3, threeInitialGraves)
            return remainingGraveSeeds
        })
})

function displayStartingGraves(num, gravearray){
    var randomPlotIndices = randomInts(num, Plot.all.length)
    randomPlotIndices.forEach(i => {
            var plot = Plot.all[i-1]
            plot.renderGrave(gravearray[0])
            gravearray.shift()
            })
        }

function randomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1)
    }
    return Array.from(set)
  }

function shuffleArray(array) {
    const clone = array.slice(0)
    for (let i = clone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone
}

/////// Proving that we can render the grave attached to a fetched grave object:

// document.addEventListener('DOMContentLoaded', (event) => {
//         adapter.fetchGrave(1)
//             .then(grave => {
//                 const x = new GraveDisplay(context, {x: 100, y:100, width:100, height:100}, grave)
//                 console.log(x)
//                 console.log(grave)
//                 return x
//             })
//             .then(x => {
//                 x.draw()
//             })})


////// Proving that we can indeed render the grave:

// function Test1() {

//         var img1 = new Image();

//         //drawing of the test image - img1
//         img1.onload = function () {
//             //draw background image
//             context.drawImage(img1, 0, 0);


//         };

//         img1.src = "../graveyard-frontend/images/closed_grave_day.png";
//     }

// Test1()