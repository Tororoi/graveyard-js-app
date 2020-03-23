// Elements

const toggle = document.querySelector(".switch")
const ready = document.querySelector("aside").children[2]
const flowerCount = document.querySelector("aside").children[4]
const newGrave = document.querySelector("aside").children[6]
const graveyard = document.querySelector(".grid-container")
const plots = graveyard.children
// plot one is plots[0], etc.

// an event listener on toggle will:
// 1. change page background color, whatever other css stuff, music even
// 2. trigger the rise
// 3. grey out + disable the toggle until all zombs in grave

// Assets

const openGraveDay = "open_grave.png"

// Testing
document.addEventListener('DOMContentLoaded', (event) => {
    displayStartingGraves()
})

function displayStartingGraves(){
    const randomPlots = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]).slice(0, 3) // 3 random numbers btw 0 and 14
    randomPlots.forEach(index => {
        plots[index].innerHTML = `
        <img src="open_grave.png" class="grave_img">
        `
    })
}

function shuffleArray(array) { // This is what it takes to generate several random unique numbers in a particular range in javascript, I guess 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


//Routes
const gravesURL = `http://localhost:3000/graves/`

const testUl = document.createElement('ul')
const body = document.querySelector('body')
body.append(testUl)

const newGraveObj = {
    name: "John Doe",
    epitaph: "Lived as he died, unknown",
    lifespan: "1805-1892"

}

//-------Grave Fetches-------//
//Post Grave
function postGrave(data) {
    return fetch(gravesURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(console.log)
}

//Delete Grave
function deleteGrave(graveId) {
    fetch(gravesURL+graveId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(graveId)
    })
    .then(res => res.json())
    .then(console.log)
  }

//Get all graves
function fetchGraves() {
    return fetch(gravesURL, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(console.log)
}

//Get one grave
function fetchGrave(graveId) {
    return fetch(gravesURL+graveId, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(console.log)
}
