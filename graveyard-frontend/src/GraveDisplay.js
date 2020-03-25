class GraveDisplay {
    //coords assigned by plot instance
    static all = []

    constructor(context, coords, grave) {
        this.image = new Image()
        this.context = context
        this.image.src = closedGraveDay
        this.coords = coords
        this.grave = grave

        GraveDisplay.all.push(this)
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
        this.image.src = closedGraveDay
      }

    }
