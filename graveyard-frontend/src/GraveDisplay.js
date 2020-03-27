class GraveDisplay {
    //coords assigned by plot instance
    static all = []

    constructor(gContext, coords, grave) {
        this.image = new Image()
        this.context = gContext
        this.image.src = closedGraveDay
        this.coords = coords
        this.grave = grave

        GraveDisplay.all.push(this)
    }

    draw() {
        const image = this.image
        const x = this.coords.x
        const y = this.coords.y
        this.image.onload = function() {
            context.drawImage(image, x - 16, y - 50)
        }
        this.image.src = closedGraveDay
      }

      renderFlower(coords, flowerObj) {
        const newCanvas = document.createElement("canvas")
        newCanvas.width=1024
        newCanvas.height=736
        newCanvas.style.position = "absolute"
        // newCanvas.style.zIndex = z
        activeLayers.appendChild(newCanvas)
        const ctx = newCanvas.getContext("2d")
        ctx.imageSmoothingEnabled = false;
          var flower = new FlowerDisplay(ctx, coords, flowerObj)
          flower.draw()
      }
    renderCorpse(corpseObj,coordinates,z) {
        const newCanvas = document.createElement("canvas")
        newCanvas.width=1024
        newCanvas.height=736
        newCanvas.style.position = "absolute"
        newCanvas.style.zIndex = z
        activeLayers.appendChild(newCanvas)
        const ctx = newCanvas.getContext("2d")
        ctx.imageSmoothingEnabled = false;
        const corpse = new Skeleton(ctx, coordinates, corpseObj)
        corpse.draw()
    }
    // clear() {
    //     context.clearRect(0, 0, graveCanvas.width, graveCanvas.height)
    // }

    }
