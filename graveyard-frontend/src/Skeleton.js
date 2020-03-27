class Skeleton {
    //coords assigned by gravedisplay instance
    static all = []

    constructor(context, coords, corpse) {
        this.image = new Image()
        this.context = context
        this.image.src = skeleton
        this.coords = coords
        this.corpse = corpse

        Skeleton.all.push(this)
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
        this.image.src = skeleton
      }
}