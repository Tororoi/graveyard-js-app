class GraveDisplay {
    //coords assigned by plot instance
    constructor(context, coords, grave) {
        this.image = new Image()
        this.context = context
        this.image.src = "../graveyard-frontend/images/closed_grave_day.png"
        this.coords = coords
        this.grave = grave
    }

    draw() {
        const canvas = document.querySelector("#gameCanvas")
        const context = canvas.getContext("2d")
        const image = this.image
        const x = this.coords.x
        const y = this.coords.y
        this.image.onload = function() {
            context.drawImage(image, x - 16, y - 50)
            console.log(this.coords)
        }
        this.image.src = "../graveyard-frontend/images/closed_grave_day.png"
      }

    }
