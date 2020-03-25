class GraveDisplay {
    //coords assigned by plot instance
    constructor(context, coords, graveObj) {
        this.image = new Image()
        this.image.src = "images/closed_grave_day.png"
        this.coords.x = (coords.x * 192) + 80
        this.coords.y = ((coords.y - 1) * 224) + 272
        
    }

    draw() {
        this.context.drawImage(this.image, this.coords.x, this.coords.y, this.coords.width, this.coords.height)
      }
}