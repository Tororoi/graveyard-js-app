const adapter = new APIAdapter("http:localhost:3000")


//--------------DOM Elements---------------//
const app = document.querySelector("body")
const nightSwitch = document.querySelector("#toggle-dark-mode")
const h1 = document.querySelector("h1")
const aside = document.querySelector("aside")
const ready = aside.children[5]
const digGrave = document.querySelector("#post-grave")
const placeFlower = document.querySelector("#post-flower")
var flowerCount = parseInt(placeFlower.innerText.match(/(\d+)/))
const graveForm = document.querySelector("#grave-form")
const flowerForm = document.querySelector("#flower-form")
const flowerFormContainer = document.querySelector("#flower-form-container")
const canvas = document.querySelector("#gameCanvas")
const context = canvas.getContext("2d")

//------Canvas variable Declarations------//
let chosenPlot
let chosenGrave
let flowerType
let mouseX
let mouseY

const controlledGraveForm = new ControlledForm(graveForm)

controlledGraveForm.onInput = () => {
    console.log(controlledGraveForm.data)
}

controlledGraveForm.onSubmit = () => {
    const newGrave = controlledGraveForm.data
    debugger
    console.log(newGrave)
    adapter.postGrave(newGrave)
        .then(actualNewGrave => {
            chosenPlot.renderGrave(actualNewGrave)
    })
    graveForm.reset()
    graveForm.style.display = "none";
}




//---------Initialize Graveyard---------//
document.addEventListener('DOMContentLoaded', (event) => {
    Plot.all.forEach(plot => plot.draw())
    initGraveyard()

})

//**********ACTIONS***********//
//--------Toggle Night Mode---------//
let nightmode = "day"
//--Event Listeners--//
nightSwitch.addEventListener("click", handleNightSwitchClick)
//--Event Handlers --//
function handleNightSwitchClick(e) {
  document.body.classList.toggle("dark-mode")
  if (nightmode === "night") {
    nightmode = "day";
    app.setAttribute("data-light-mode", "day");
    GraveDisplay.all.forEach(grave => {
        grave.image.src = closedGraveDay //currently no equivalent of webkit transition
    })
} else {
    nightmode = "night";
    app.setAttribute("data-light-mode", "night");
    GraveDisplay.all.forEach(grave => {
        grave.image.src = closedGraveNight
    })
}
}

//----------Render Graves-----------//
//------Create Plots------//
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
//-----Initialize Graves-----// (it returns an array of the grave objects that WEREN'T rendered, in a random order; we can use that for future grave creation)
function initGraveyard() {
    adapter.fetchGraves()
        .then(graves => {
            var remainingGraveSeeds = shuffleArray(graves)
            return remainingGraveSeeds
        })
        .then(remainingGraveSeeds => {
            var threeInitialGraves = remainingGraveSeeds.splice(0,3)
            displayStartingGraves(3, threeInitialGraves)
            return remainingGraveSeeds
        })
}
//---render initial graves---//
function displayStartingGraves(num, gravearray){
    var randomPlotIndices = randomInts(num, Plot.all.length)
    randomPlotIndices.forEach(i => {
            var plot = Plot.all[i-1]
            plot.renderGrave(gravearray[0])
            gravearray.shift()
            })
        }
//-get random numbers for plots-// (we could actually use the shuffler for this as well)
function randomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1)
    }
    return Array.from(set)
  }
//-get array in random order-//
function shuffleArray(array) {
    const clone = array.slice(0)
    for (let i = clone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone
}
//--------Listen for elements on the Canvas-------//
//--Canvas Helpers--//

//--Event Listeners--//
canvas.addEventListener("click", handleCanvasClick)
//--Event Handlers--//
function handleCanvasClick(e) {
    var mouseX = e.offsetX
    var mouseY = e.offsetY
    console.log(`${mouseX},${mouseY}`)
    if (nightmode === "night") {
        console.log("It's night time!")
    } else {
    Plot.all.forEach(plot => {
        if (!plot.taken && mouseY > plot.coords.y && mouseY < plot.coords.y + plot.coords.height 
            && mouseX > plot.coords.x && mouseX < plot.coords.x + plot.coords.width) {
            console.log(`clicked empty plot ${Plot.all.indexOf(plot)}`)
            chosenPlot = plot
            graveForm.style.display = "block";
        }
    })
    GraveDisplay.all.forEach(grave => {
        if (mouseY > grave.coords.y && mouseY < grave.coords.y + grave.coords.height 
            && mouseX > grave.coords.x && mouseX < grave.coords.x + grave.coords.width) {
            console.log(grave.grave)
            chosenGrave = grave
            if(flowerCount > 0){
                handleNewFlower({x: mouseX, y: mouseY}, chosenGrave.grave.id, flowerType)
            } else {alert("Out of flowers")}
        }
    })
    }
}
//--------Post New Grave-------//
//--Event Listeners--//
digGrave.addEventListener("click", handleNewGrave)
//--Event Handlers--//
function handleNewGrave(e) {
    //create form and render to the screen
    alert("Choose an empty plot")
}

//--------Post New Flower-------//
//--Event Listeners--//
placeFlower.addEventListener("click", e =>{
    if(flowerCount > 0){
        flowerFormContainer.style.display = "block";
    } else {alert("Out of flowers")}
})

const controlledFlowerForm = new ControlledForm(flowerForm)

controlledFlowerForm.onInput = () => {
    console.log(controlledGraveForm.data)
}

controlledFlowerForm.onSubmit = () => {
    flowerType = controlledFlowerForm.data.name
    alert("Choose a grave")
    console.log(flowerType)
}

//--Event Handlers--//
function handleNewFlower(coords, graveid, name) {
    console.log({"name": name, "grave_id": graveid})
    adapter.postFlower({"name": name, "grave_id": graveid}) // All flowers are posted with value of 0 right now
    chosenGrave.renderFlower(coords, name)
    flowerCount --
    placeFlower.innerHTML = `
        Flowers x${flowerCount}
      <br>
      Place flower
    `
    // create the flower in the backend
    // display the flower
}

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