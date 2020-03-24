class APIAdapter {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    //-------Grave Fetches-------//
    //Post Grave
    postGrave(data) {
        return fetch(this.baseUrl+`/graves`, {
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
    deleteGrave(graveId) {
        fetch(this.baseUrl+`/graves/${graveId}`, {
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
    fetchGraves() {
        return fetch(this.baseUrl+`/graves`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
    }
    //Get one grave
    fetchGrave(graveId) {
        return fetch(this.baseUrl+`/graves/${graveId}`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
    }
    //--------Corpse Fetches--------//
    //Post Corpse
    postCorpse(data) {
        return fetch(this.baseUrl+`/corpses`, {
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
    //Delete Corpse
    deleteCorpse(corpseId) {
        fetch(this.baseUrl+`/corpses/${corpseId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(corpseId)
        })
        .then(res => res.json())
        .then(console.log)
    }
    //Get all corpses
    fetchCorpses() {
        return fetch(this.baseUrl+`/corpses`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
    }
    //Get one corpse
    fetchCorpse(corpseId) {
        return fetch(this.baseUrl+`/corpses/${corpseId}`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
    }
    // //-------Flower Fetches--------//
    //Post Flower
    postFlower(data) {
        return fetch(baseUrl+`/flowers`, {
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
    //Delete Flower
    deleteFlower(flowerId) {
        fetch(baseUrl+`/flowers/${flowerId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(flowerId)
        })
        .then(res => res.json())
        .then(console.log)
    }
    //Get all Flowers
    fetchFlowers() {
        return fetch(baseUrl+`/flowers`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
    }
    //Get one Flower
    fetchFlower(flowerId) {
        return fetch(baseUrl+`/flowers/${flowerId}`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(console.log)
    }
}