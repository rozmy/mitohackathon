'use strict';

function GameOver() {
}

GameOver.prototype = {
    init: function() {
        var style = { font: "54px Arial", fill: "#ff0044", align: "center" };
        this.oxygen = this.game.add.text(
            this.game.world.centerX, 
            this.game.world.centerY, 
            "Game Over", 
            style
        );
    },
    
    update: function() {
    },
    
    render: function() {
    }
};