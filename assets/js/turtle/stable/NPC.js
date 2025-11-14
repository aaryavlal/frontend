import Player from "./Player.js";
import GameEnv from "./GameEnv.js";

class NPC extends Player {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     * 
     * @override
     */
    update() {
        this.draw();
    }

    /**
     * Handles keydown events for proximity interaction.
     * This method is triggered when a key is pressed and checks for proximity interactions.
     * 
     * @param {Object} event - The event object containing the key that was pressed.
     * @param {string} event.key - The key that was pressed.
     * 
     * Keys handled:
     * - 'e': Proximity interaction for Player 1
     * - 'u': Proximity interaction for Player 2
     * 
     * This method calls checkProximityToNPC() if either 'e' or 'u' is pressed.
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e':  // Player 1 
            case 'u':  // Player 2 
                this.checkProximityToNPC();
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * It also clears the alert timeout if the 'e' or 'u' key is released.
     * 
     * @param {Object} event - The keyup event object.
     * @param {string} event.key - The key that was released.
     */
    handleKeyUp({ key }) {
        // Check if the released key is 'e' or 'u'
        if (key === 'e' || key === 'u') {
            // Clear the alert timeout to cancel the alert
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
                closeCustomAlert();
            }
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        // Clear any existing alert timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }

        // Set a new alert timeout
        this.alertTimeout = setTimeout(() => {
            showCustomAlert(message);
        }, 0);
    }

    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        var npc = this;
        var names = [];

        if (players.length > 0 && npc) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );
                // The distance is less than 100 pixels
                if (player != npc && distance <= 100) {
                    names.push(player.spriteData.name);
                }
            });
            // Join all player names inside the proximity
            if (names.length > 0) {
                this.handleResponse(`Hello, ${names.join(', ')}`);
            }
        }
    }
}

export default NPC;

/**
 * Show the custom alert with the given message.
 * 
 * @param {string} message - The message to be displayed in the alert.
 */
function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

/**
 * Close the custom alert.
 */
function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'none';
}