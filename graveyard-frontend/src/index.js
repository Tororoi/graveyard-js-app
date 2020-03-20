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
toggle = document.querySelector(".switch")
ready = document.querySelector("aside").children[2]
flowerCount = document.querySelector("aside").children[4]
newGrave = document.querySelector("aside").children[6]
// an event listener on toggle will:
// 1. change page background color, whatever other css stuff, music even
// 2. trigger the rise
// 3. grey out + disable the toggle until all zombs in grave
