const adapter = new APIAdapter("http:localhost:3000")


//--------------DOM Elements---------------//
const app = document.querySelector("body")
const layers = document.querySelector("#canvas-layers")
const activeLayers = document.querySelector("#active-canvas")
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
const graveCanvas = document.querySelector("#graveCanvas")
const context = canvas.getContext("2d")
const graveContext = graveCanvas.getContext("2d")
const form = document.querySelector("#grave-form")
let chosenPlot
let mouseX;
let mouseY;
let mousePresent;
//----------Canvas Listeners----------//
layers.addEventListener('mousemove', mouseMoveListener);
function mouseMoveListener(e) {
mouseX=e.offsetX;
mouseY=e.offsetY;
}

layers.addEventListener('mouseover', mouseOverListener)
    function mouseOverListener(e) {
    mousePresent=true;
}
layers.addEventListener('mouseout', mouseOutListener)
function mouseOutListener(e) {
    mousePresent=false;
}

const controlledGraveForm = new ControlledForm(graveForm)

//------Canvas variable Declarations------//
let flowerType = "Peony"
let planting = false
let chosenGrave

//---------Initialize Graveyard---------//
let allFlowers
adapter.fetchFlowers()
    .then(flowers =>{
    allFlowers = flowers
    })
controlledGraveForm.onSubmit = () => {
    const newGrave = controlledGraveForm.data
    console.log(newGrave)
    adapter.postGrave(newGrave)
        .then(actualNewGrave => {
            chosenPlot.renderGrave(actualNewGrave)
            return actualNewGrave
        })
        .then(attachCorpse) //currently doesn't render until refreshed. actualNewGrave needs to be told that it has a corpse
    function attachCorpse(graveData) {
        const randValue = Math.random()
        const newCorpse = {
            name: graveData.name,
            speed: randValue+1, //between 1 and 2
            flowers_needed: Math.ceil(randValue*3), //between 1 and 3
            grave_id: graveData.id
        }
        graveData.corpses.push(newCorpse)
        adapter.postCorpse(newCorpse)
    }
    
    form.reset()
    form.style.display = "none";
}

//Draw Game
function drawCanvas() {
    //Draw Graves
    //Draw Flowers
    //Draw Skeletons
}


//---------Initialize Graveyard---------//
document.addEventListener('DOMContentLoaded', (event) => {
    adapter.fetchFlowers()
        .then(flowers =>{
            allFlowers = flowers
        })
        .then(Plot.all.forEach(plot => plot.draw()))
        .then(initGraveyard())

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
        grave.image.src = closedGraveDay
    })
    Skeleton.all.forEach(skelly => {
        skelly.context.canvas.remove()
    })
    FlowerDisplay.all.forEach(flower => {
        adapter.deleteFlower(flower.flower.id)
    })
    graveCanvas.context.clearRect(0, 0, graveCanvas.width, graveCanvas.height)
} else {
    nightmode = "night";
    app.setAttribute("data-light-mode", "night");
    GraveDisplay.all.forEach(grave => {
        grave.image.src = closedGraveNight
        //Render skeletons
        const skellies = grave.grave.corpses
        skellies.forEach(skelly => {
            if (grave.grave.flowers.length >= skelly.flowers_needed) {
                console.log(`let ${skelly.name} rest`)
            } else {
                grave.renderCorpse(skelly,grave.coords,1)
            }
            
        })
    })
    FlowerDisplay.all.forEach(flower => {
        flower.image.src = `images/${flower.name.toLowerCase()}_night.png`
    })
    flowerFormContainer.style.display = "none"
    graveForm.style.display = "none"
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
            const allGraves = graves // We're not using this right now 
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
layers.addEventListener("click", handleCanvasClick)
//--Event Handlers--//
function handleCanvasClick(e) {
    mouseX = e.offsetX
    mouseY = e.offsetY
    console.log(`${mouseX},${mouseY}`)
    if (nightmode === "night") {
        console.log("It's night time!")
        // Skeleton.all.forEach(skelly => {
        //     skelly.getBehind() })
    } else {
    Plot.all.forEach(plot => {
        if (!plot.taken && mouseY > plot.coords.y && mouseY < plot.coords.y + plot.coords.height 
            && mouseX > plot.coords.x && mouseX < plot.coords.x + plot.coords.width) {
            console.log(`clicked empty plot ${Plot.all.indexOf(plot)}`)
            chosenPlot = plot
            graveForm.style.display = "block";
            planting = false
        }
    })
    GraveDisplay.all.forEach(grave => {
        if (mouseY > grave.coords.y && mouseY < grave.coords.y + grave.coords.height 
            && mouseX > grave.coords.x && mouseX < grave.coords.x + grave.coords.width) {
            console.log(grave.grave)
            chosenGrave = grave
            if(flowerCount > 0 && planting === true){
                handleNewFlower({x: mouseX, y: mouseY}, chosenGrave.grave.id, flowerType)
            }
        }
    })
    }
}
//--------Post New Grave-------//
//--Event Listeners--//
digGrave.addEventListener("click", handleNewGrave)
//--Event Handlers--//
function handleNewGrave(e) {
    //trigger variable that allows user to render form?
    alert("Choose an empty plot")
    planting = false
}
// const controlledGraveForm = new ControlledForm(graveForm)

// controlledGraveForm.onInput = () => {
//     console.log(controlledGraveForm.data)
// }

// controlledGraveForm.onSubmit = () => {
//     planting = false
//     const newGrave = controlledGraveForm.data
//     console.log(newGrave)
//     adapter.postGrave(newGrave)
//         .then(actualNewGrave => {
//             chosenPlot.renderGrave(actualNewGrave)
//     })
//     graveForm.reset()
//     graveForm.style.display = "none";
// }


//--------Post New Flower-------//
//--Event Listeners--//
placeFlower.addEventListener("click", e =>{
    if(flowerCount > 0){
        planting = true
        flowerFormContainer.style.display = "block";
    } else {alert("Out of flowers")}
})

//--Event Handlers--//
function handleNewFlower(coords, graveid, name) {
    console.log({"name": name, "grave_id": graveid})
    adapter.postFlower({"name": name, "grave_id": graveid})
    .then(data => {
        debugger
        chosenGrave.renderFlower(coords, name, data)})
    flowerCount --
    placeFlower.innerHTML = `
        Flowers x${flowerCount}
      <br>
      Place flower
    `
}

// const controlledFlowerForm = new ControlledForm(flowerForm)
const flowerSelector = document.querySelector("#flowerlist")

flowerSelector.addEventListener('change', (e) => {
    flowerType = e.target.value
})

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