class Skeleton {
    //coords assigned by gravedisplay instance
    static all = []

    constructor(context, coords, corpse) {
        this.image = new Image()
        this.context = context
        this.image.src = skelSheet
        this.coords = coords
        this.coords.x = coords.x
        this.coords.y = coords.y+16
        this.coords.width = 128
        this.coords.height = 128
        this.corpse = corpse

        Skeleton.all.push(this)
    }

    draw() {
        const corpse = this.corpse
        const ctx=this.context
        const image = this.image
        let x = this.coords.x
        let y = this.coords.y
        const width = this.coords.width
        const height = this.coords.height

        const CYCLE_LOOP = [0,1,2,3,4,5,6,7];
        const SOUTH = 1;
        const SOUTHEAST = 2;
        const EAST = 3;
        const NORTHEAST = 4;
        const NORTH = 5;
        const NORTHWEST = 6;
        const WEST = 7;
        const SOUTHWEST = 8;
        const DEATH = 9;
        const FRAME_LIMIT = 24/(corpse.speed+1); //controls frame rate - lower number is faster
        const MOVEMENT_SPEED = corpse.speed/1.5; //controls speed of walking

        let a = 0;
        let currentDirection = SOUTHWEST;
        let currentLoopIndex = 0;
        let frameCount = 0;
        let xD = 0;
        let yD = 0;
        let hypotenuse = 0;



        function loadImage() {
            image.src = skelSheet
            image.onload = function() {
                window.requestAnimationFrame(gameLoop);
            };
            }



        function drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(image,
                        frameX * width, frameY * height, width, height,
                        canvasX, canvasY, width, height);
        }

        loadImage();

        function gameLoop() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let hasMoved;
        xD = mouseX - (x+64)
        yD = mouseY - (y+16)
        a = Math.atan2(yD, xD)*180/Math.PI;
        hypotenuse = Math.hypot(xD,yD)

        switch (true) {
            case (a <= 22.5 && a > -22.5):
                currentDirection = EAST;
                break;
            case (a <= 67.5 && a > 22.5):
                currentDirection = SOUTHEAST;
                break;
            case (a <= 112.5 && a > 67.5): 
                currentDirection = SOUTH;
                break;
            case (a <= 157.5 && a > 112.5):
                currentDirection = SOUTHWEST;
                break;
            case (a <= -157.5 || a > 157.5):
                currentDirection = WEST;
                break;
            case (a <= -112.5 && a > -157.5):
                currentDirection = NORTHWEST;
                break;
            case (a <= -67.5 && a > -112.5):
                currentDirection = NORTH;
                break;
            case (a <= -22.5 && a > -67.5):
                currentDirection = NORTHEAST;
                break;
        }
        
        switch(true) {
            case (hypotenuse <= 32 || !mousePresent):
            hasMoved = false;
            break;
            case (hypotenuse > 32 && mousePresent):
            hasMoved = true;
            break;
        }
        
        if (hasMoved) {
            moveCharacter()
            frameCount++;
            if (frameCount >= FRAME_LIMIT) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= CYCLE_LOOP.length) {
                currentLoopIndex = 0;
            }
            }
        }
        
        if (!hasMoved) {
            currentLoopIndex = 0;
        }

        drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, x, y);
            window.requestAnimationFrame(gameLoop);

        }

        function moveCharacter() {
        let deltaX = xD/hypotenuse
        let deltaY = yD/hypotenuse
        //bounding box collision
        if (x + deltaX >= 0 && x + width + deltaX <= ctx.canvas.width) {
            x += deltaX*MOVEMENT_SPEED;
        }
        if (y + deltaY >= 0 && y + height + deltaY <= ctx.canvas.height) {
            y += deltaY*MOVEMENT_SPEED;
        }
        //grave collision
        // GraveDisplay.all.forEach(grave => {
        //     const yF = y-128
        //     const xL = x+ 32
        //     const xR = x + 96
        //     if (xL + deltaX <= grave.coords.x+96 && xR + width + deltaX >= grave.coords.x+32 && yF + deltaY >= grave.coords.y && yF + height + deltaY <= grave.coords.y+160) {
        //         x -= deltaX*MOVEMENT_SPEED;
        //         y -= deltaY*MOVEMENT_SPEED;
        //     }
            // if (yF + deltaY >= grave.coords.y && yF + height + deltaY <= grave.coords.y+160) {
            //     y -= deltaY*MOVEMENT_SPEED;
            // }
        // })
        
        xD = mouseX - (x+64)
        yD = mouseY - (y+64)
        a = Math.atan2(yD, xD)*180/Math.PI;
        hypotenuse = Math.hypot(xD,yD)
        }
    }
    // getBehind() {
    //     this.context.canvas.remove()
    //     // have grave rerender corpse with zIndex -1
    //     GraveDisplay.all[0].renderCorpse(this.corpse, this.coords, -1)
    //     // const arr = [...elem.parentNode.children]
    //     // const index = arr.indexOf(elem)
    //     // activeLayers.insertBefore(elem, elem.parentNode.children[0])
    //     // GraveDisplay.all.forEach(g => {
    //     //     g.context.transform(1,0,0,1,0,0)
    //     //     g.draw()
    //     // })
    // }
}