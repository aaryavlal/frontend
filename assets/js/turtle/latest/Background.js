import GameEnv from './GameEnv.js';

/* Background class for primary background
*/
export class Background {
    constructor(data = null) {
        if (data.src) {
            this.image = new Image();
            this.image.src = data.src;
        } else {
            this.image = null;
        }
        GameEnv.gameObjects.push(this);
    }

    /* This method draws to GameEnv context, primary background
    */
    draw() {
        const ctx = GameEnv.ctx;
        const width = GameEnv.innerWidth;
        const height = GameEnv.innerHeight;

        if (this.image) {
            // Draw the background image scaled to the canvas size
            ctx.drawImage(this.image, 0, 0, width, height);
        } else {
            // Fill the canvas with fillstyle color if no image is provided
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, width, height);
        }
    }

    /* For primary background, update is the same as draw
    */
    update() {
        this.draw();
    }

    /* For primary background, resize is the same as draw
    */
    resize() {
        this.draw();
    }
}

export default Background;