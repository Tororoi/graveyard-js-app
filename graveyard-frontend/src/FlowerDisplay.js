class FlowerDisplay {
    static all = []

    constructor(context, name, flower){
        this.image = new Image()
        this.context = context
        this.name = name
        this.flower = flower
        switch (this.name){
            case "Tulip":
                this.image.src = tulipDay
            break
            case "Daffodil":
                this.image.src = daffodilDay
            break
            case "Peony":
                this.image.src = peonyDay
            break
        }
        FlowerDisplay.all.push(this)
        
    }

    draw(coords){
        const canvas = document.querySelector("#gameCanvas")
        const context = canvas.getContext("2d")
        const image = this.image
        const x = coords.x
        const y = coords.y
        this.image.onload = function() {
            context.drawImage(image, x-17, y-60)
            console.log(this.coords)
        }
        switch (this.name){
            case "Tulip":
                this.image.src = tulipDay
            break
            case "Daffodil":
                this.image.src = daffodilDay
            break
            case "Peony":
                this.image.src = peonyDay
            break
        }
    }
}

// const daffodilDay = "images/daffodil_day.png"
// const daffodilNight = "images/daffodil_night.png"
// const tulipDay = "images/tulip_day.png"
// const tulipNight = "images/tulip_night.png"
// const peonyDay = "images/peony_day.png"
// const peonyNight = "images/peony_night.png"