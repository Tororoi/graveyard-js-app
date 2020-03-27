class Plot {

    static all = []

    constructor(context, coords) {
      this.context = context
      this.coords = coords

      this.coords.x = (coords.x * 192) + 80
      this.coords.y = ((coords.y - 1) * 224) + 272
      this.coords.width = 96
      this.coords.height = 192
      
      this.taken = false;
      Plot.all.push(this)
    }
  
  
    draw() {
      this.context.rect(this.coords.x, this.coords.y, this.coords.width, this.coords.height)
      this.context.lineWidth = 3;
      this.context.stroke();
    }

    renderGrave(graveObj) { 
      const grave = new GraveDisplay(graveContext, this.coords, graveObj)
      this.taken = true;
      grave.draw()
    }
  }