class Grave {
    //coords assigned by plot instance
    constructor(context, coords) {
        this.image = new Image()
        this.image.src = "images/closed_grave_day.png"
        
    }

    draw() {
        this.context.drawImage(this.image, this.coords.x, this.coords.y, this.coords.width, this.coords.height)
      }