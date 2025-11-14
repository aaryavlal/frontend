import GameEnv from './GameEnv.js';
import GameLevelWater from './GameLevelWater.js';

/**
 * The GameControl object manages the game.
 * 
 * This code uses the JavaScript "object literal pattern" which is nice for centralizing control logic.
 * 
 * The object literal pattern is a simple way to create singleton objects in JavaScript.
 * It allows for easy grouping of related functions and properties, making the code more organized and readable.
 * In the context of GameControl, this pattern helps centralize the game's control logic, 
 * making it easier to manage game states, handle events, and maintain the overall flow of the game.
 * 
 * @type {Object}
 * @property {Player} turtle - The player object.
 * @property {Player} fish 
 * @property {function} start - Initialize game assets and start the game loop.
 * @property {function} gameLoop - The game loop.
 * @property {function} resize - Resize the canvas and player object when the window is resized.
 */
const GameControl = {

    start: function(path) {
        // Create the game environment
        GameEnv.create();
        // Load the game level
        const gameLevel = new GameLevelWater(path);
        // Prepare game objects for the level
        for (let object of gameLevel.objects) {
            if (!object.data) object.data = {};
            new object.class(object.data) 
        }
        // Start the game loop
        this.gameLoop();
    },

    gameLoop: function() {
         // Clear the canvas
        GameEnv.clear();
        // Update the game objects
        for (let object of GameEnv.gameObjects) {
            object.update(); // Update the game objects
        }
        // Recursively call the game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    resize: function() {
        // Resize the game environment
        GameEnv.resize(); 
        // Resize the game objects
        for (let object of GameEnv.gameObjects) {
            object.resize(); // Resize the game objects
        }
    }
};

// Detect window resize events and call the resize function.
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;