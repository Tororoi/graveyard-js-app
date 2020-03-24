const adapter = new APIAdapter("http:localhost:3000")

// Elements

const toggle = document.querySelector(".switch")
const ready = document.querySelector("aside").children[2]
const flowerCount = document.querySelector("aside").children[4]
const newGrave = document.querySelector("aside").children[6]

const canvas = document.querySelector("#gameCanvas")
const context = canvas.getContext("2d")

// Create Plots

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
document.addEventListener('DOMContentLoaded', (event) => {
    displayStartingGraves(3)
})

function displayStartingGraves(num){
    const numOfGraves = fetchGraves().length
    const randomPlots = randomInts(num, Plot.all.length)
    const randomGraves = randomInts(num, numOfGraves)
    randomPlots.forEach(index => {
        
    })
}

function randomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1)
    }
    return set
  }

// function shuffleArray(array) { // This is what it takes to generate several random unique numbers in a particular range in javascript, I guess 
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array
// }
