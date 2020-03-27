class FlowerDisplay {
    static all = []

    constructor(context, coords, flower){
        this.image = new Image()
        this.context = context
        this.flower = flower
        this.coords = coords
        this.coords.x = coords.x
        this.coords.y = coords.y
        this.coords.width = coords.width
        this.coords.height = coords.height
        this.dead = false
        switch (this.flower.name){
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
        // const flower = this.flower <-- use if worth gets defined
        const ctx = this.context
        const image = this.image
        const x = this.coords.x - 32
        const y = this.coords.y - 64
        const width = this.coords.width
        const height = this.coords.height
        let dead = this.dead

        const CYCLE_LOOP = [0,1,2,3,4,5,6,7,8,9,10,11,12]; //9th frame is key image
        const FRAME_LIMIT = 6;

        let currentLoopIndex = 0;
        let frameCount = 0;

        switch (this.flower.name){
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

        function drawFrame(frameX, frameY, canvasX, canvasY) {
            ctx.drawImage(image,
                            frameX * width, frameY * height, width, height,
                            canvasX, canvasY, width, height);
        }

        this.image.onload = function() {
            // ctx.drawImage(image, x-16, y-64)
            // console.log(this.coords)
            window.requestAnimationFrame(gameLoop);
        }
        
        function gameLoop() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            if (currentLoopIndex<=7) {
                frameCount++;
                if (frameCount >= FRAME_LIMIT) {
                    frameCount = 0;
                    currentLoopIndex++;
                }
            } 

            // if (dead === true) {
            //     frameCount++;
            //     if (frameCount >= FRAME_LIMIT) {
            //         frameCount = 0;
            //         currentLoopIndex++;
            //     }
            //     }
            drawFrame(CYCLE_LOOP[currentLoopIndex], 0, x, y);
                window.requestAnimationFrame(gameLoop);
        }
    }
}

// const daffodilDay = "images/daffodil_day.png"
// const daffodilNight = "images/daffodil_night.png"
// const tulipDay = "images/tulip_day.png"
// const tulipNight = "images/tulip_night.png"
// const peonyDay = "images/peony_day.png"
// const peonyNight = "images/peony_night.png"