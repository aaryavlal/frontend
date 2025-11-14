import GameEnv from './GameEnv.js';

class GameObject {
    // container for all game objects in game
    constructor(data) {
        // Create canvas element
        this.canvas = document.createElement("canvas");
        this.canvas.id = data.name || "default";
        this.canvas.width = data.pixels.width || 0;
        this.canvas.height = data.pixels.height || 0;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("gameContainer").appendChild(this.canvas); 
        // Set initial object properties 
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.collisionWidth = 0;
        this.collisionHeight = 0;
        this.collisionData = {};
        this.hitbox = data?.hitbox || {};
        // Add this object to the game
        GameEnv.gameObjects.push(this);
    }

    setX(x) {
        if (x < 0) {
            x = 0;
        }
        this.x = x;
    }

    setY(y) {
        if (y < GameEnv.top) {
            y = GameEnv.top;
        }
        if (y > GameEnv.bottom) {
            y = GameEnv.bottom;
        }
        this.y = y;
    }

    /* Destroy Game Object
    * remove canvas element of object
    * remove object from GameObject array
    */
    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            // Remove the canvas from the DOM
            this.canvas.parentNode.removeChild(this.canvas);
            GameEnv.gameObjects.splice(index, 1);
        }
    }
    
    /* Default collision action is no action
     * override when you extend for custom action
    */
    collisionAction(){
        // no action
    }

    /* Collision checks
     * uses GameObject isCollision to detect hit
     * calls collisionAction on hit
    */
    collisionChecks() {
        for (var gameObj of GameEnv.gameObjects){
            if (this != gameObj ) {
                this.isCollision(gameObj);
                if (this.collisionData.hit){
                    this.collisionAction();
                }
            }
        }
    }

    /* Collision detection method
     * usage: if (player.isCollision(platform)) { // action }
    */
    isCollision(other) {
        // Bounding rectangles from Canvas
        const thisRect = this.canvas.getBoundingClientRect();
        const otherRect = other.canvas.getBoundingClientRect();
    
        // Calculate center points of rectangles
        const thisCenterX = (thisRect.left + thisRect.right) / 2;
        const otherCenterX = (otherRect.left + otherRect.right) / 2;

        // Calculate new center points of rectangles
        const thisRectWidth = thisRect.right - thisRect.left;
        const thisRectLeftNew = otherCenterX - thisRectWidth / 2;
    
        // Calculate hitbox constants
        var widthPercentage = this.hitbox?.widthPercentage || 0.0;
        var heightPercentage = this.hitbox?.heightPercentage || 0.0;
    
        // Calculate hitbox reductions from the width and height
        const widthReduction = thisRect.width * widthPercentage;
        const heightReduction = thisRect.height * heightPercentage;
    
        // Build hitbox by subtracting reductions from the left, right, top, and bottom
        const thisLeft = thisRect.left + widthReduction;
        const thisTop = thisRect.top + heightReduction;
        const thisRight = thisRect.right - widthReduction;
        const thisBottom = thisRect.bottom;
        const tolerance = 10; // Adjust as needed

        // Determine hit and touch points of hit
        this.collisionData = {
            hit: (
                thisLeft < otherRect.right &&
                thisRight > otherRect.left &&
                thisTop < otherRect.bottom &&
                thisBottom > otherRect.top
            ),
            touchPoints: {
                this: {
                    id: this.canvas.id,
                    top: thisRect.bottom > otherRect.top,
                    bottom: (thisRect.bottom <= otherRect.top) && !(Math.abs(thisRect.bottom - otherRect.bottom) <= GameEnv.gravity),
                    left: thisCenterX > otherCenterX,
                    right: thisCenterX < otherCenterX,
                    onTopofOther: onTopofOther
                },
                other: {
                    id: other.canvas.id,
                    top: thisRect.bottom < otherRect.top,
                    bottom: (thisRect.bottom >= otherRect.top) && !(Math.abs(thisRect.bottom - otherRect.bottom) <= GameEnv.gravity),
                    left: thisCenterX < otherCenterX, 
                    right: thisCenterX > otherCenterX,
                },
            },
        };

    }
    
}

export default GameObject;