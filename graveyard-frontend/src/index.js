const adapter = new APIAdapter("http:localhost:3000")


//--------------DOM Elements---------------//
const app = document.querySelector("body")
const layers = document.querySelector("#canvas-layers")
const activeLayers = document.querySelector("#active-canvas")
const nightSwitch = document.querySelector("#toggle-dark-mode")
const h1 = document.querySelector("h1")
const aside = document.querySelector("aside")
const ready = aside.children[2]//not right
const flowerCount = aside.children[4]//not right
const digGrave = document.querySelector("#post-grave")
const graveForm = document.querySelector("#grave-form")
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

controlledGraveForm.onInput = () => {
    console.log(controlledGraveForm.data)
}

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
        grave.image.src = closedGraveDay
    })
    Skeleton.all.forEach(skelly => {
        skelly.context.canvas.remove()
    })
} else {
    nightmode = "night";
    app.setAttribute("data-light-mode", "night");
    GraveDisplay.all.forEach(grave => {
        grave.image.src = closedGraveNight
        //Render skeletons
        const skellies = grave.grave.corpses
        skellies.forEach(skelly => {
            grave.renderCorpse(skelly,grave.coords,1)
        })
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
//-----Initialize Graves-----//
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
//-get random numbers for plots-//
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
    let mouseX = e.offsetX
    let mouseY = e.offsetY
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
            form.style.display = "block";
        }
    })
    GraveDisplay.all.forEach(grave => {
        if (mouseY > grave.coords.y && mouseY < grave.coords.y + grave.coords.height 
            && mouseX > grave.coords.x && mouseX < grave.coords.x + grave.coords.width) {
            console.log(grave.grave)
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